import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { MoviesComponent } from './movies/movies.component';

@NgModule({
  declarations: [//Compponetnlerin tanimlandigi yer
    AppComponent,
    MoviesComponent
  ],
  imports: //Modulelerin tanimlandigi yer
  [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]//app.module icinde calistirilabilir ilk componenti de burda tanimliyoruz...Ilk calistirilabilecek component, AppComponent olarak tanimlandi..
})
export class AppModule { }
//Bundle -paket olsuturuyoruz...ve bu paketi disari acarak, main.ts icinde app.module i calistirilabilir hale getgiriyoruz
//Root module app.module diyebiliriz...root component te app.componenttir
//Burasi angular modulunun, birlesim noktasi...modulleri ve ilk calisacak compnenti de bootstrap key kismninda ekliyoruz