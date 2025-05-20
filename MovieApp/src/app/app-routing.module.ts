import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';
import { AppHomeComponent } from './app.home/app.home.component';
import { DashboardComponent } from './dashboard/dashboard.component';

//route linklerimizi olusturalim...
const routes: Routes = [
  {path:'movies', component:MoviesComponent},//localhost:3001/movies dediginda hangi comopnent gelsin
 // {path:'movie/', component:MoviesComponent},
 // {path:'', component:AppHomeComponent},

 //Istersek herhangi bir path verilmezse yani home-ana root url gelirse http://localhost:3001, redirectTo ile http://localhost:3001/dashboard e redirect ederek ornegin de istedigmiz bir compnente de yonlenmesini saglayabilriz
  {path:'', redirectTo:'/dashboard', pathMatch:'full'},
  //pathMatch: 'full' → match the entire URL path
  //pathMatch: 'prefix' (default) → match just the start of the URL path
  
  //{path:'', component:AppHomeComponent},
  {path:'dashboard', component:DashboardComponent},

];
//http://localhost:3001/movies MoviesComponent icerigini getirir
//http://localhost:3001 AppHomeComponent iceriign getirir
//Simdi ana route compnentimiz app.component.ts-html-css oldugu icin biz localhost:3001/movies...veya http://localhost:3001 ile basladiktan sonra geriis ne olursa olsun bu ilk olarak app.component.html e gidecktir ve orda route-outlet i gorup app-routing.module.ts sayfasina gelerek url- i ayristirarak hangi componente yonlenmesi gerektigin bulacaktir

@NgModule({
  declarations:[],//componentlerin tanimlandigi kisimdir..routing icin bir component tanimlamasi yapmayacagiz
  imports: [RouterModule.forRoot(routes)],//routes u da burda RouterModule.forRoot parametresine atariz
  exports: [RouterModule]//Router modulunu app.module.ts kullanacagi icin export icinde RouterMOdule u tanimlamamiz gerekkiyor...
})
export class AppRoutingModule { }
