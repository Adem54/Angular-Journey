import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MsalGuard, MsalInterceptor, MsalModule, MsalRedirectComponent } from '@azure/msal-angular';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MsalModule.forRoot(new PublicClientApplication(
      {
        auth:{
            clientId:"55aa8518-84ec-476b-bbbe-0287a62bd75c",//clientId from micorosft.portal
            redirectUri:"http://localhost:4200",
            authority:"https://login.microsoftonline.com/aef1284a-a170-4530-9fc6-3bec0b92a2f7"
        //https://login.microsoftonline.com/tenantId from micorosft.portal
             //This configuration is required when the user access the application using the browser and the user is not logged on then the application will be redirected to authority-s-url part https://login.microsoftonline.com/aef1284a-a170-4530-9fc6-3bec0b92a2f7
        //Based on these details azure decide which subscription this aplication belongs to.And it will validate these details and written access token and it returns access token to localhost:4200 and the same we have configured inside our app registiration and after that here we have to write cache and here cache location will be localstorage and after that here store authstatteincookie this should be false, if you want to set authstateincookie then you can set this flag to true, but this is mostly needed for browsers like internet explorer and as internet explorer dead i set this to false
        },
        cache : 
        {
          cacheLocation:'localStorage',
          storeAuthStateInCookie:false
        }
      }
    ),
    //user can log two ways 1-popup  2-redirection we are gooint to use redirect...and we are goint to implement this configuratino 
  {
    interactionType:InteractionType.Redirect,
    authRequest: {
      scopes: ['user.read']
    }
  },
  // api permissions..we are going to access, we are accessing graph api.
  //If you access any organization related apis or any other apis which needs azure access token you have to configure over here
  {
    interactionType:InteractionType.Redirect, 
    protectedResourceMap:new Map(
      //we have to pass our graph api url
      //permissions that we call scopes....
      [
          ['https://graph.microsoft.com/v1.0/me', ['user.Read']]
      ]
    )
  }
  ),
    
  ],
  //add provider related to azureid
  //we add interceptors that will intercept all httprequests and it will add access token so that they can access protected resources like graph api or any enterprise api which needs azure access token so here we have to write use class and it should be MsalInterceptor and after that we can mention multi to true and after that we have to add MslGuard..In this MsalGuard we are going to use on top of our protected routes like if user try to access any url inside of our application if this msal guard is configured this will protect that route and it will check if the user is logged on or not if the user is logged on then only it will allow the user to view that web page after that here we have to add MsalRedirectComponent
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:MsalInterceptor,
      multi:true
    }, MsalGuard
  ],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }

/*

✅ MsalModule.forRoot(...)
This configures MSAL for your Angular app. You're passing two things to forRoot():
A PublicClientApplication – the main MSAL client 
Some Angular-specific MSAL options
1. 📦 PublicClientApplication – MSAL Core Setup
This is from @azure/msal-browser, and it configures your authentication settings:

new PublicClientApplication({
  auth: {
    clientId: '...',         // From Azure Portal – identifies your app
    redirectUri: '...',      // Where Azure AD will redirect the user after login
    authority: '...'         // Specifies the Azure tenant to use for login
  },
  cache: {
    cacheLocation: 'localStorage', // Store tokens in local storage
    storeAuthStateInCookie: false  // Optional fallback for older browsers
}

🔐 clientId
Unique ID of your registered app in Azure AD (frontend app)

🌐 authority
Tells MSAL which Azure tenant to use for authentication

Format: https://login.microsoftonline.com/<TENANT_ID>

🔄 redirectUri
Where the browser will return after login

Must match what you've configured in Azure Portal

📥 cache
Controls where tokens are stored:

localStorage = persists across tabs and reloads

storeAuthStateInCookie = false is fine unless using IE

2. ⚙️ Angular MSAL Options

{
  interactionType: InteractionType.Redirect,
  authRequest: {
    scopes: ['user.read']
  }
}

This tells the Angular wrapper:

🧭 How to interact with Azure login:

InteractionType.Redirect means redirect to Microsoft login page

Alternative: InteractionType.Popup (stays in-page, more SPA-like)

🔓 Which scopes to request:

['user.read'] = permission to read the logged-in user's basic profile from Microsoft Graph


🧠 What MSAL Does Internally:

1-Loads this config at app start

2-Monitors auth state via a service (MsalService, MsalBroadcastService)

3-Handles redirects back to the app after login

4-Stores and retrieves tokens

5-Lets you check if the user is logged in via methods like:

msalService.instance.getActiveAccount()

✅ How This Enables Login
When a user triggers loginRedirect():

MSAL:

1-Redirects the user to Microsoft login

2-Azure validates credentials and tenant

3-Azure sends tokens back to your app (redirectUri)

4-MSAL handles the token silently, sets the account as logged in


🧪 Tip for Testing
Make sure:
The redirectUri is registered in Azure Portal (under app registration → authentication)
The browser isn't blocking third-party cookies (important for MSAL)
You listen for the MSAL redirect callback if needed in your app (but MSAL Angular usually handles this automatically)
*/