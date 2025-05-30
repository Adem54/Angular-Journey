import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import {
  MsalModule,
  MsalService,
  MsalGuard,
  MsalInterceptor,
  MsalBroadcastService
} from '@azure/msal-angular';
import {
  PublicClientApplication,
  InteractionType
} from '@azure/msal-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { PublicPageComponent } from './public-page/public-page.component';
import { ProtectedPageComponent } from './protected-page/protected-page.component';

@NgModule({
  declarations: [AppComponent, PublicPageComponent, ProtectedPageComponent],
  imports:  [
    BrowserModule,
    AppRoutingModule,
    MsalModule.forRoot(
      new PublicClientApplication({
        auth: {
          clientId: '55aa8518-84ec-476b-bbbe-0287a62bd75c',
          redirectUri: 'http://localhost:4200'
        }
      }),
      {
        interactionType: InteractionType.Popup
      },
      {
        interactionType: InteractionType.Popup,
        protectedResourceMap: new Map()
      }
    )
  ],
  providers: [
    MsalService,
    MsalGuard,
    MsalBroadcastService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

//  redirectUri:"http://localhost:4200"//When the user has logged in microsoft he will be redirected to this url and this is our web application