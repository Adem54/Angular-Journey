import { Component } from "@angular/core";
import { Movie } from "../movie";
import { MovieService } from "../movie.service";

@Component({
    selector: 'movies',//<movies></movies> tagi ile kullanilacak
    templateUrl: './movies.component.html',
    standalone: false,
    //styleUrls: ['./movies.component.css']
    styleUrl: './movies.component.css'
    //styles: [`h2{color:blue}`], //styleUrls yerine, style kullanarak, css kodunu buraya yazabiliyoruz..dIREK BU SEKILDE DE YAZABILIYOURUZ

})
export class MoviesComponent {
    title = "Movie List-title";
    selectedMovie!: Movie;
    //Bu sekilde direk Movies datasini movie.datasource.ts dosyasinda aliyoruz ve  Movies datasini html dosyamiz icerisinde kullanacagiz
    movieList!: Movie[];
    //inject islemine taabi tutmamiz gerekiyor bir Movieservice den bir instance olusturrmak icin constructor dan inject etmemiz gerekiyor
    //private moivieService nin dependency injection ile geldgin soylemek icin private keywordunu kullaniyoruz
    constructor(private movieService: MovieService) { }

    //Burda servisten gelen datayi almak icin service class i movieService nin calismasinin bitmesi gerekior yani constructor dan sonra calismasi gerekiyor ngOnInit lifecycle methodu da consturctordan hemen sonra calisan bir methoddur dolayisi ile getMovies in invoke edilemsi islmeini de o zaman ngOnInit methodu icerisinde yapabilriz...Yani bu methodlari yazdgmiz da biryerde cagirmaimz gerekir ama ozellikle bur service den data alacaksak o zaman bu methodun servicin kendi icinde datayi getirme islemi bittikten sonra , bittiginden emin olduktan sonra alinmasi gerekiyor
    ngOnInit(): void {
        console.log("ngOnInit...");
        this.getMovies();
    }
    getMovies(): void {
        console.log("getMovies...");
        this.movieService.getMovies()
            .subscribe((movies:Movie[])=>{
                this.movieList = movies;
            });
    }

    OnUpdate(movieName: string): void {
        console.log("Movie Name: ", movieName);
        //Burda movieName parametresini aliyoruz ve bu parametreyi kullanarak, selectedMovie nesnesinin name propertysine atiyoruz
        this.selectedMovie.name = movieName;
        console.log("Selected Movie: ", this.selectedMovie);
        this.movieList = this.movieList.map((movie: Movie) => movie.id === this.selectedMovie.id ? { id: movie.id, name: movieName } : movie);
    }

    //Burdan aldgimz datayi movie.service.ts ye gondereedgiz...
    OnClickInsert(name:string, img:string, desc:string):void 
    {
        console.log(`name: ${name} - img: ${img} - desc: ${desc}`);
        let movie:Movie = { id:this.movieList.length+1, name, imageUrl:img, description:desc }
        this.movieService.insert(movie)
            .subscribe((movie)=>{//movie return ediyordu hatirlayalim...Gelen movie objesini component uzerindeki liste uzerine direk olarak ekleyelim...
                console.log("new movie added")
                this.movieList.push(movie);
            })
    }

    OnClickDelete(movie:Movie):void 
    {
        console.log("movie!!!!: ", movie);
        //remove the movie
        //Bu islem arayuzden silmek lokalde tuttugumz data uerinden silmektir ama service uzerinden de uzak apiden de silmemiz gerekir..movie.service.ts de
        this.movieList = this.movieList.filter(m=>m.id !== movie.id);
        this.movieService.delete(movie)
                .subscribe(movie=>{
                    console.log("Movie is deleted id: ",movie.id )
                })
    }
    

    //Burda biz, click-eventi parametresinie html iceisinde li attributunde #movie_li diye tanimladigmz keywordu onSelectMovie click eventine parametre olarak gonderdik ki, bu movie_li keywordu #movile_li diye hangi html-tag in in atributunden tanimlanirsa o tagin referansini temsil eder..AYNI THIS GIBI DUSUNELIM...HARIKA BESTPRACTISE!!
    onSelectMovie(liItem: HTMLElement): void 
    {
        console.log("liItem: ", liItem);
        console.log("Full <li> text content:", liItem.textContent);
        console.log("#########################");
        const divs = liItem.querySelectorAll('div');
        divs.forEach((div, i) => {
            console.log(`Div #${i}:`, div.textContent);
        });
    }

     getMovieList() {
        console.log("getMovieList...");

        return this.movieService.getMovies();
    }

       getTitle() {
        return this.title;
    }
    //Dikkat edelim biz parametredeki movie bilgisni html icerisinde movie listesini listeledgimiz li icerisinde gonderdigmz icin burda goruyoruz ve hangi li ye tiklandigini gorebiliyoruz
    //vE TIKLANAN DATA YI .ts kisminda tanimladigmz bir selectedMovie degiskenine atayarak, kullanicinin tiklamis oldugu movie bilgisini ts icinde bir degiskene aktarmis oluyoruz...istedgimz gibi kullanabillelim diye!!!
    onSelect(movie: Movie): void {
        console.log(movie);
        this.selectedMovie = movie;
    }
}
//Bu componenti olusturduk, peki bu componentten modulun haberi olmasi gerekiyor...app.module.ts dosyasina gidip bu componenti declaration kisminda eklememiz gerekiyor ki componentimizin taninmasi icin....
//Ayrica bu componenti kullanabilmek icin, app.component.html dosyasinda bu componenti kullanmamiz gerekiyor
//app.component.html dosyasinda <movies></movies> tagini ekleyerek bu componenti kullanabiliriz

//Routing- movie listesini gormek istedigmizde url dee  localhost:3001/movies  , ve movie detayi gelirken de url de localhost:3001/detail/2 veya localhost:3001/movie/2 seklinde gelsin ..Routin bilgilerini componentlerle iliskilendiriyor olmamiz gerekiyor