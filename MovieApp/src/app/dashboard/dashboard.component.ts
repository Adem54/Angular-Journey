import { Component } from '@angular/core';
import { Movie } from '../movie';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  movies:Movie[] = [];
  movieLength:number=0;
  //dependencyinjection ile movieService mizi alalim, sadece consturctord akullanacaksak private yok htmldosyasi icinde de kullanacakask public  yapariz
  constructor(private movieService:MovieService){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getMovies();
    //Burda cagirarak constructor islemi bittikten sonra cagirmis oluyoruz..ki data geldiginde datayi alabilelim...
  }

  getMovies():void 
  {
    //subscribe sayesinde de ayni  than gibi data tam olarak yuklnmesin bekleterek bizim dataimiza aktarmis oluyor...data asenkron geldigi icin
    //this.movieService.getMovies().subscribe(movies=>this.movies = movies.slice(0,4)); //Eger kodu 1 satirdna fazla yazarsak suslu parantez icine yazmamiz gerekir
    this.movieService.getMovies().subscribe(movies=>
    {
      this.movies = movies.slice(0,6);
      this.movieLength = movies.length;
    }
    );
  } 

 
  //Biz burda yaparsk, eger this.movies biraz gec datayi alacagi icin, ilk basta, default deger olan 0 gelecktir movies i lengthine...ve movies icin dolduktan sonra gercek degerini alir...onun iciin en dogrusu bu islem subscribe icinde getMovies method u icinde yapilmalidir
  isMovieMoreThan3():boolean
  {
    return this.movies.length > 5;
  }
}
