import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import {
  MsalModule,
  MsalService,
  MsalGuard,
  MsalInterceptor,
  MsalBroadcastService,
  MsalRedirectComponent
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
          redirectUri: 'http://localhost:4200',
          authority:"https://login.microsoftonline.com/aef1284a-a170-4530-9fc6-3bec0b92a2f7"
        },
        cache : 
        {
          cacheLocation:'localStorage',
          storeAuthStateInCookie:false
        }
        //This configuration is required when the user access the application using the browser and the user is not logged on then the application will be redirected to authority-s-url part https://login.microsoftonline.com/aef1284a-a170-4530-9fc6-3bec0b92a2f7
        //Based on these details azure decide which subscription this aplication belongs to.And it will validate these details and written access token and it returns access token to localhost:4200 and the same we have configured inside our app registiration and after that here we have to write cache and here cache location will be localstorage and after that here store authstatteincookie this should be false, if you want to set authstateincookie then you can set this flag to true, but this is mostly needed for browsers like internet explorer and as internet explorer dead i set this to false
      }),
      {
        interactionType: InteractionType.Popup,
        authRequest:{
          scopes:['user-read']
        }
      },
      {
        interactionType: InteractionType.Popup,
        protectedResourceMap: new Map(
             [
          ['https://graph.microsoft.com/v1.0/me', ['user.Read']]
      ]
        )
      }
    ),
  ],
  providers: [
      {
      provide:HTTP_INTERCEPTORS,
      useClass:MsalInterceptor,
      multi:true
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule {}

//  redirectUri:"http://localhost:4200"//When the user has logged in microsoft he will be redirected to this url and this is our web application