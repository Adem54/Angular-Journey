import { Injectable } from '@angular/core';
import { Movies } from './movie.datasource';
import { Movie } from './movie';
import { Observable, of } from 'rxjs';
import { LoggingService } from './logging.service';
import { compileNgModule } from '@angular/compiler';
//@Injectable decorator hazirlyoruz ve providedIn ozelligi root diyoruz..Injettiable olmasi uygulamanin root modulu yani app module uzerinden movie service istedgimz bir noktatdan ulsabbilmemizi sagliyor 
//Eger uygulamada baska modullerde varse o modullerede ulsabilecegin burdan belirterek o modullerden de dataya erisim saglayabiliriz
//Uygumala icindeki app module icindeki herhangi bir yerden bu servise erisebliyoruz..app module cunku tum compnentleri kapsiyor...
//bu servisin @Injectable decoratora sahip olmasi MovieService nin injectable oldugunu veya bu servicisin inject edilerek birkopyasinin alinarak kullanilabilecegini belirtir
//Burda tum datalari getMovies ile aldigmz gibi farkli filtrelemler yaparak id  ye veya baska kritlerlere gore filtreleme yaparak datayi alabiliriz
@Injectable({
  providedIn: 'root'
})
export class MovieService {

  //Biz bu logginServiceyi sadece MovieSErvice componenti icerisinde kullandigmz icin, private loggingService:LoggingService yaptik yani private olarak isaretledik  ama eger ki bir componente bagli olan bir html sayfasinda da kullanacak olsa idik o zaman public yapmamiz gerekirdi!!!
  constructor(private loggingService:LoggingService ) { }

  //Observable ile wraplayarak datayi almamiz gerekiyor, of ile de return edilen datayi Observable haline getirerek donduuruyoruz ve bu sekilde artik return edilen data asenkron bir sekilde dondurulmus oluyor
  getMovies():Observable<Movie[]> 
  {
    console.log("movie-servie!!!!!!")
    this.loggingService.add("MovieService: listing movies");
    return of(Movies);
  }

  /*
  Aldigim typescript hatasi ve solution:
  Type 'Observable<Movie | undefined>' is not assignable to type 'Observable<Movie>'.
Type 'undefined' is not assignable to type 'Movie'.
  getMovie(id:any):Observable<Movie | undefined>

  */
  getMovie(id:any):Observable<Movie | undefined>
  {
    this.loggingService.add(`MovieService: get movie detail by id=${id}` );
    return of(Movies.find(movie=>movie.id === Number(id)));
  }



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