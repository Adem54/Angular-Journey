import { Component } from '@angular/core';
@Component({
  selector: 'app-root',//index.html(<app-root></app-root>)(AppComponent)
  /*Wherever Angular sees the tag <app-root> in your HTML, it will:
Instantiate the AppComponent
Replace that tag with the component’s HTML (templateUrl)
Attach its logic, data, and styling */
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'First Angular App';
  description  = "This is my first angular app";
  author="John Doe ";
  name="";
}
//app.component.ts icerisinde tanimladigimz key-value mantiginda ki iceriklerin app.component.html icerisinde {{}} ile kullanilabildigini gorebiliyoruz
//Projeye ekleyecegimz yeni componentlerin kendilerine ait .ts, html ve css dosyalari olacaktir
