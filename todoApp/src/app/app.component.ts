import { Component } from '@angular/core';

@Component({
  selector: 'app-root',//app-root selector in amaci AppCompnentinin nerde kullanmak istiyorsun..AppComponentini cagirmak icin bir etiket gibi dusunebiliriz!!!!..index.html icerisinde de baktimgzda(<app-root></app-root>) bu selector kullanilarak, AppComponenti nin bir butun olarak, app.component.js,app.component.html,app.component.css dosysinin tamamini cagirilmasini saglamisiz aslnda
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'todoApp';
  //Burda app.component.html icerisinde tanimlamak istedigmz degiskenler, veya burdan biz database den gelen bir datayi alip app.compnent.html icinde datayi kullanmak isteyebiliriz...YANI .ts dosyasi bir nevi html dosyasmiz icindeki dinamikligi, ve variablelari {{}} icerisinde kullanabilmemizi sagliyor..
}
