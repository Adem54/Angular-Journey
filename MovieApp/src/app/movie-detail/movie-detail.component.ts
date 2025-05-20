import { Component, Input } from '@angular/core';
import { Movie } from '../movie';
import { MovieService } from '../movie.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'movie-detail',
  standalone: false,
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.css'
})
export class MovieDetailComponent {
  
  movieDetail!:Movie;
  //localhost:3001/detail/2 olarak url girildiginde bizim 2 yi bulup buun uzerinden islemimizi yapacagiz..
  //Biz servis uzerinden bu islemi yapacagiz..movie.service.ts i burdaki constructorimza injecte ederek alacagiz
//Biz movieService datayi sadece movie-detail.component.ts de kullanacagiz movie-detail.component.hmtl kullanmayacagiz...eger .html de de kullanacak olsa idik o zaman private yerine public olarak vermemiz gerekirdi constructor da... 
  constructor(
    private movieService:MovieService,
    private route:ActivatedRoute//detail id bilgisine ulasabilmek icin bunu aliyoruz..id bilgisin burdan alacagiz
  )
  {}

    @Input() movie!:Movie;
  // @Input() selectedMovie: Movie; // @Input decoratoru ile parent componentten movie bilgisini aliyoruz
  //selectedMovie disardan gelecek bir deger ondan dolayi da @input decoretoru eklemiz gerekiyor selectedMovie yi parent compnnetten alabilmek icin

  ngOnInit(): void 
  {
    //console.log("***********",this)
    //Burda calisitiyoruz cunku burasi constructor calistiktan sonra ilk calisan yer..ve bizim de constructor in calismasini bitmesini beklememiz gerekiyor...
    this.getMovie();
  }

  getMovie()
  {
    //detail-id bilgisinin disardan route uzerinden alacagiz
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const id2 = +this.route.snapshot.paramMap.get('id')!;// ❗ Object is possibly 'null'
   // Both lines try to convert the string 'id' from the route into a number.
   //Number(...) is an explicit function call. Number() works Because Number(null) is valid JavaScript..t's not that null is safe — just that Number(null) is syntactically okay.
   //    //+... is a shorthand for converting a string to number
   //this.route.snapshot.paramMap.get('id') is: string | null...So TypeScript warns you: "get('id') might return null, and you’re trying to use it in a numeric expression directly." Because the + operator expects a non-null value.
   //If you're sure 'id' will always be in the route, use a non-null assertion:
   //const id = +this.route.snapshot.paramMap.get('id')!; such as this thing:movieDetail!:Movie;
/*
  this.movieService.getMovie(id)
                      .subscribe(movie=>
                      {
                      //If you're absolutely sure the movie will always exist:This tells TypeScript: “I know it's not undefined.” Bu tehlikeli bir cozumdur..
                        this.movieDetail = movie!
                      }
                       ); */

    this.movieService.getMovie(id)
                      .subscribe(movie=>
                      {
                        if(movie)
                        {
                          this.movie =  movie
                        }else{
                            // handle not found (redirect, show error, etc.)
                            console.error("Movie not found");
                        }
                       // This fixes the error because this.movie = movie will only run if movie is not undefined.
                      }
                      );
                      //Type 'Movie | undefined' is not assignable to type 'Movie'.Type 'undefined' is not assignable to type 'Movie'.ts(2..boyle bir hata aldim...Type 'Movie | undefined' is not assignable to type 'Movie'

                      //But getMovie(id) returns:Observable<Movie | undefined>
  }
  
  ngOnChanges() {
    console.log("movie input received:", this.movie);
    //movie input received: {id: 3, name: 'Movie 3'}
  }
    
}
