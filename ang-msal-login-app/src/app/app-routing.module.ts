import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// app-routing.module.ts
import { MsalGuard, MsalRedirectComponent } from '@azure/msal-angular';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  // {
  //   path: 'profile',
  //   component: ProfileComponent,
  //   canActivate: [MsalGuard], // 🔒 Protects this route — only accessible if user is logged in
  // },
  // {
  //   path: 'redirect',
  //   component: MsalRedirectComponent, // ✅ Handles redirect after login
  // },
  // {
  //   path: '',
  //   redirectTo: 'profile',
  //   pathMatch: 'full',
  // },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
