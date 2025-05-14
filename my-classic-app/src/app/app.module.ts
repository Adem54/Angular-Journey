import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule} from '@angular/forms';//ngModel kullanabilmek icin gerekli
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations://componentlerin tanimlandigi yer 
  [
    AppComponent
  ],
  imports://modullerin tanimlandigi yer 
  [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]//iLK OLARAK CALISTIRILACAK OLAN COMPONENTI VERIYOR
})
export class AppModule { }
//AppMdoule uygulamanin root moduludur aslinda..root compnent te app.component dir