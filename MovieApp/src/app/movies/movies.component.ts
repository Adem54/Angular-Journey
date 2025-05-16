import { Component } from "@angular/core";


@Component({
  selector: 'movies',//<movies></movies> tagi ile kullanilacak
    //selector: 'app-movies',//<app-movies></app-movies> tagi ile kullanilacak
    //selector:'.movies',//<div class="movies"></div> tagi ile kullanilacak
    //selector: '[movies]',//<div movies></div> tagi ile kullanilacak
    //selector:'#movies',//<div id="movies"></div> tagi ile kullanilacak
    //selector: '[app-movies]',//<div app-movies></div> tagi ile kullanilacak
    //Dikkat etti isek bu kullanim ayni css-selectori kullanma mantigi gibi...

    templateUrl: './movies.component.html',
    //template: '<h2>Movies!!!</h2>',//templateUrl yerine, template kullanarak, html kodunu buraya yazabiliyoruz
    standalone: false,
    //styleUrls: ['./movies.component.css']
      styleUrl: './movies.component.css'

})
export class MoviesComponent 
{

}
//Bu componenti olusturduk, peki bu componentten modulun haberi olmasi gerekiyor...app.module.ts dosyasina gidip bu componenti declaration kisminda eklememiz gerekiyor ki componentimizin taninmasi icin....
//Ayrica bu componenti kullanabilmek icin, app.component.html dosyasinda bu componenti kullanmamiz gerekiyor
//app.component.html dosyasinda <movies></movies> tagini ekleyerek bu componenti kullanabiliriz