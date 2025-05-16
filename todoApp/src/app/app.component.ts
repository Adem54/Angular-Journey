import { Component } from '@angular/core';
import { Model, TodoItem } from './model';
@Component({
  selector: 'app-root',//app-root selector in amaci AppCompnentinin nerde kullanmak istiyorsun..AppComponentini cagirmak icin bir etiket gibi dusunebiliriz!!!!..index.html icerisinde de baktimgzda(<app-root></app-root>) bu selector kullanilarak, AppComponenti nin bir butun olarak, app.component.js,app.component.html,app.component.css dosysinin tamamini cagirilmasini saglamisiz aslnda
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
 model = new Model();
 isDisplay = false;

 getUserName()
 {
    return this.model.user;
 };

 getItems()
 {
    if(this.isDisplay)
    {
      return this.model.items;
    }else 
    {
      return this.model.items.filter(item=>!item.completed);
    }
 }

 getItemNotCompleted()
 {
    if(this.isDisplay)
    {
      return this.model.items;
    }else 
    {
      return this.model.items.filter(item=>!item.completed);
    }
 }
 //Simdi sunu tam olarak anlayalim...Biz im icin burasi, tum her turlu jscript logiclerini operasyonlarini dogru, okunabilir bir adlandirma ile yapabilecedgimiz bir yerdir....!!!

 addItem(value:string){
     
    console.log(`value:  ${value}`);
    if(value)
    {
      let newItem = new TodoItem(this.model.items.length +1, value, false);
      this.model.items.push(newItem);
      console.log(`newItem:  ${JSON.stringify(newItem)}`);
    }
 }

}
