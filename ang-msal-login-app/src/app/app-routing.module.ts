import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// app-routing.module.ts
import { MsalGuard, MsalRedirectComponent } from '@azure/msal-angular';
import { ProfileComponent } from './profile/profile.component';
import { PublicPageComponent } from './public-page/public-page.component';
import { ProtectedPageComponent } from './protected-page/protected-page.component';

const routes: Routes = [
   {
    path: 'public-page',
    component: PublicPageComponent,//can access from all
  },
  {
    path: 'protected-page',
    component: ProtectedPageComponent,
    canActivate: [MsalGuard], // 🔒 Protects this route — only accessible if user is logged in..masl.guard.ts artik implemente edildigi icin burda onu korumaya aliyruz
  },
  {
    //Default routing
    path: '**',
    component: PublicPageComponent,//directed to public page component
  },
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
/*
msal guard i yuklememiz gerekiyor...
$ ng generate guard masl
✔ Which type of guard would you like to create? CanActivate
CREATE src/app/masl.guard.spec.ts (478 bytes)
CREATE src/app/masl.guard.ts (133 bytes)
msal.guards.ts dosyamiz olusuyor...bu dosya da konfigurasyon yaptiktan sonra..protected routumuzu kullanabilirz
*/