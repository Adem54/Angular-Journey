import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { MsalGuard } from '@azure/msal-angular';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  //We have to use msal guard on top of this because this component can only be visible if the user logged on
  //so this will do the check for us..and we add the default routes below
  {
    path:'profile',
    component:ProfileComponent,
    canActivate: [MsalGuard]//this protect our ProfileComponent
  }, 
  {
    path:'',
    component:HomeComponent//this com doesn't requre any msGuard configuration..this component can be visiable for all
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, 
  {
     initialNavigation: 'enabledNonBlocking'
     //"Start navigating to the initial route (like / or /profile) as soon as possible, but don’t block the app’s bootstrap process while doing it."You're not saying it to any component — you're configuring the router module itself.
    //The initialNavigation option in Angular controls how and when the router performs the first navigation when your application starts.
    //When your Angular app loads, the router needs to know which route to display first (like /, /home, /profile, etc.). The initialNavigation setting defines when that navigation starts.
  }
  //Angular updated the typing for initialNavigation in the RouterModule.forRoot() config. In Angular 16+, the allowed values are now stricter.
  //or (if using server-side rendering): initialNavigation: 'enabledBlocking'


  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
