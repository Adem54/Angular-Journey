import { Injectable } from '@angular/core';
import { Movies } from './movie.datasource';
import { Movie } from './movie';
import { Observable, of } from 'rxjs';
import { LoggingService } from './logging.service';
import { compileNgModule } from '@angular/compiler';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//@Injectable decorator hazirlyoruz ve providedIn ozelligi root diyoruz..Injettiable olmasi uygulamanin root modulu yani app module uzerinden movie service istedgimz bir noktatdan ulsabbilmemizi sagliyor 
//Eger uygulamada baska modullerde varse o modullerede ulsabilecegin burdan belirterek o modullerden de dataya erisim saglayabiliriz
//Uygumala icindeki app module icindeki herhangi bir yerden bu servise erisebliyoruz..app module cunku tum compnentleri kapsiyor...
//bu servisin @Injectable decoratora sahip olmasi MovieService nin injectable oldugunu veya bu servicisin inject edilerek birkopyasinin alinarak kullanilabilecegini belirtir
//Burda tum datalari getMovies ile aldigmz gibi farkli filtrelemler yaparak id  ye veya baska kritlerlere gore filtreleme yaparak datayi alabiliriz
@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiMoviesURL = 'api/movies';
  //Biz bu logginServiceyi sadece MovieSErvice componenti icerisinde kullandigmz icin, private loggingService:LoggingService yaptik yani private olarak isaretledik  ama eger ki bir componente bagli olan bir html sayfasinda da kullanacak olsa idik o zaman public yapmamiz gerekirdi!!!
  constructor(
    private loggingService:LoggingService,
    private http:HttpClient
   
  ) { }

  //Observable ile wraplayarak datayi almamiz gerekiyor, of ile de return edilen datayi Observable haline getirerek donduuruyoruz ve bu sekilde artik return edilen data asenkron bir sekilde dondurulmus oluyor
  getMovies():Observable<Movie[]> 
  {
    this.loggingService.add("MovieService: listing movies");
    return this.http.get<Movie[]>(this.apiMoviesURL);
  }

  getUsers():Observable<any>
  {
      return this.http.get<any>('https://jsonplaceholder.typicode.com/users');
  }


  getMovie(id:any):Observable<Movie | undefined>
  {
    this.loggingService.add(`MovieService: get movie detail by id=${id}` );
  //  return of(Movies.find(movie=>movie.id === Number(id)));
      return this.http.get<Movie>(this.apiMoviesURL+ '/'+ id);
  }

  //Peki movie datasi nasil, en son inputa girilen datalar geliyor ki, cunku ngModel-two ways binding kullandigmz icin kullanici girdigi anda zaten movie icindeki name, description vs ne girildi ise arkadaki movie-.ts den gelen movie de de o olacak ondan dolayi ekstra birsey yapmamiza gerek yok parametreye gelen movie guncellenmis bir movie dir
  update(movie:Movie):Observable<any>
  {
    //http options la gondereceimz data nin type vs gibi bilgileri girebiliriz
    const httpOptions={
      headers:new HttpHeaders({'Content-Type':'application/json'})
    }
    //movi objesini gonderiyourz
     return this.http.put<Movie>(this.apiMoviesURL, movie, httpOptions);
  }

  insert(movie:Movie):Observable<Movie>
  {
      const httpOptions={
          headers:new HttpHeaders({'Content-Type':'application/json'})
      }
      //Burda onemli..gonderilen data nin type ini girmemiz gerekiyor
      return this.http.post<Movie>(this.apiMoviesURL, movie, httpOptions)
  }

  delete(movie:Movie):Observable<Movie>
  {
    return this.http.delete<Movie>(this.apiMoviesURL + "/"+ movie.id);
  }

  // delete(movie:Movie):Observable<Movie> 
  // {
  //    const httpOptions={
  //         headers:new HttpHeaders({'Content-Type':'application/json'})
  //     }
  //    return this.http.delete<Movie>(this.apiMoviesURL, movie);
  // }

  /*
  Aldigim typescript hatasi ve solution:
  Type 'Observable<Movie | undefined>' is not assignable to type 'Observable<Movie>'.
Type 'undefined' is not assignable to type 'Movie'.
  getMovie(id:any):Observable<Movie | undefined>

  */
  //this.loggingService sadece parametreye loggingService geliyor ve biz this.loggingService = loggingService kendmiz manuel olarak yapmiyoruz ama this.loggingService diye kullanabliyoruz bu nasil oluyor?
  //Sen constructor(private loggingService: LoggingService) yazdığında,TypeScript ve Angular şunu otomatik olarak yapar: Field'ı tanımlar (this.loggingService) Constructor'da gelen parametreyle eşitler (this.loggingService = loggingService)  
  //Parameter Property Declaration (C#’ta yoktur) Angular (ve modern TypeScript) bunu destekler. Böylece: Hem field tanımlamak Hem de constructor’da atamak zorunda kalmazsın.
  //✅ Bu özellik Angular’a özel değil, TypeScript’in kendisinde olan bir dil özelliğidir.
  //Bu, TypeScript diline özgü bir sözdizim kolaylığı (syntactic sugar)’dır.
  //constructor(private service: MyService) {} şu uzun yazımın kısaltmasıdır: 
  /*
  private service: MyService;

    constructor(service: MyService) {
      this.service = service;
    }

    */

  /*
    Eğer sadece constructor(loggingService: LoggingService) yazarsan (başında private / public / protected yoksa) → bu bir class property’si olarak tutulmaz. this.loggingService diye bir şey de oluşmaz. O yüzden private ya da public yazman şarttır.
  */
}
//Burda biz datayi asenkron olarak alacagiz dolayisi ile datamizin tamamen geldiginden emin olmamiz gerekiyor
//Iste burda asennkron  olarak datayi alabilmek icin observable kullanmamiz gerekiyor
//Observable kullanarak datayi alabilmek icin rxjs kütüphanesini kullanmamız gerekiyor