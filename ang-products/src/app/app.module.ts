import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ProductComponent } from './product/product.component';

@NgModule({
  //componentler buraya eklenmelidir mutlaka
  declarations: 
  [
      ProductComponent
  ],
  //modeller de buraya eklenmeldir mutlaka
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  //ilk olarak AppComponent i calistir diyoruz
  bootstrap: [ProductComponent]
})
export class AppModule { }
