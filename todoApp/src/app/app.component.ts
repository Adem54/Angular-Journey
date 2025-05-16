import { Component } from '@angular/core';
import { Model } from './model';
@Component({
  selector: 'app-root',//app-root selector in amaci AppCompnentinin nerde kullanmak istiyorsun..AppComponentini cagirmak icin bir etiket gibi dusunebiliriz!!!!..index.html icerisinde de baktimgzda(<app-root></app-root>) bu selector kullanilarak, AppComponenti nin bir butun olarak, app.component.js,app.component.html,app.component.css dosysinin tamamini cagirilmasini saglamisiz aslnda
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
 model = new Model();
 getUserName()
 {
    return this.model.user;
 };

 getItems()
 {
    return this.model.items;
 }

 getItemNotCompleted()
 {
    return this.model.items.filter(item=>!item.completed);
 }
 //Simdi sunu tam olarak anlayalim...Biz im icin burasi, tum her turlu jscript logiclerini operasyonlarini dogru, okunabilir bir adlandirma ile yapabilecedgimiz bir yerdir....!!!
 
}
