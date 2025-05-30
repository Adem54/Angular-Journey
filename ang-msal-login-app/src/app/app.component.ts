import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult, InteractionStatus } from '@azure/msal-browser';
import { MsalBroadcastService } from '@azure/msal-angular';
import { filter } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone:false
})
// OnInit interface is not specific to MSAL — it's part of Angular's lifecycle hooks
//However, it's especially important in MSAL integration, because you often need to run logic after your component is initialized, such as checking login state or setting the active account.
//OnInit is an Angular lifecycle interface that defines the method:ngOnInit(): void - This method is called once, after Angular initializes the component's inputs and before it renders.
/*
In MSAL scenarios, ngOnInit() is used for:
1-🔄 Checking if a user is already logged in
const accounts = this.msalService.instance.getAllAccounts();
if (accounts.length > 0) {
  this.msalService.instance.setActiveAccount(accounts[0]);

  this.msalService.instance.setActiveAccount(response.account);

2-✅ Subscribing to MSAL status (ready or not)  
this.msalBroadcastService.inProgress$
  .pipe(filter(status => status === InteractionStatus.None))
  .subscribe(() => {
    this.msalReady = true;
  });

  3-🔐 Preparing your component to safely call login, logout, or acquire token

}

*/

export class AppComponent implements OnInit {

  
  title = 'Microsoft Login';
  msalReady = false;
  constructor(private msalService: MsalService,  private msalBroadcastService: MsalBroadcastService) {}

  ngOnInit(): void {
    //This checks if the user is already logged in (e.g. on page refresh).
    //If so, it sets the active account so your app knows which user is logged in.
     this.msalService.instance.handleRedirectPromise().then(
          res=>{
            if(res != null && res.account != null)
            {
              this.msalService.instance.setActiveAccount(res.account);
            }
          }
     )

    //Waits for MSAL to Finish Login or Token Requests-inProgress$ is an observable that tells you the status of any MSAL interaction (like login, logout, token request).
    //InteractionStatus.None means: "MSAL is not doing anything right now. It’s ready."
    /*This code ensures that your app only tries to do MSAL operations after initialization is complete (prevents errors like uninitialized_public_client_application or interaction_in_progress). */
    this.msalBroadcastService.inProgress$
  .pipe(filter((status: InteractionStatus) => status === InteractionStatus.None))
  .subscribe(() => {
    this.msalReady = true;
  });

  }

   login = async()=> {

      // if (!this.msalReady) {
      //   console.warn('MSAL is not ready yet.');
      //     return;
      //   }
     // 🔁 Starts full-page redirect to Microsoft login
    //  this.msalService.loginRedirect();
    //this.msalService.instance.setActiveAccount(response.account);

      // this.msalService.loginPopup().subscribe((response:AuthenticationResult)=>
      // {
      //     this.msalService.instance.setActiveAccount(response.account);
      //     console.log('Login successful:', response.account);
      // });
  }

  logout(): void {
    this.msalService.logoutPopup();
  }

  isLoggedIn(): boolean {
    return this.msalService.instance.getActiveAccount() != null;
  }
}

 
/*

loginRedirect olayi ile de sign in olunca ilk once microsoft hesabi kontrol ediyor token vs islemlerini yapiyor msalinterception ile sonra da tekrar redirect yapiyor orda girdigimz url adresine
  login() {
        
    this.msalService.loginPopup().subscribe((response:AuthenticationResult)=>
    {
      //login olunca accountunu aktiflestiriyoruz..
       this.msalService.instance.setActiveAccount(response.account);
         console.log('Login successful. Active account set:', response.account);
       //When the user logged in, we set the active account of the result of the subscribe
    })
  }
    You must call handleRedirectPromise() (internally done by MSAL Angular) to complete the auth flow and set tokens after redirect.
{
  auth: {
    clientId: 'your-client-id',
    redirectUri: 'http://localhost:4200'
  }
}
  yani kullanici sign-in e tikladiginda...
  loginRedirect() starts the sign-in, sends you to Microsoft, and after successful login, brings you back to the redirectUri, where MSAL finalizes token handling and sets your login state.

  loginRedirect() completely reloads the page, unlike loginPopup().
  loginPopup() Flow in Detail:User clicks “Sign In” in your app.MSAL opens a popup window (a new small browser window).The user logs in inside the popup.MSAL receives the token in the popup and passes it back to your main app.Your current page is never reloaded — app state, input, or view remains intact
  🟡 When to Use Each
  Use loginPopup() when You want to avoid full page reloads (e.g. SPAs).You care about preserving current app state (e.g., form inputs).You want smoother UX.
*/
// msalService.instance is this object:
   //msalService.instance gives you the raw MSAL PublicClientApplication instance.This is useful for more advanced or low-level control.
   //But usually, you’ll use MSAL Angular wrappers like getAllAccounts() or getActiveAccount() to access the logged-in user's info.
   //const account = this.msalService.instance.getActiveAccount()

   //Raw Access (msalService.instance)
   //Gives full control over MSAL API, You call low-level methods manually, Needs more boilerplate/setup
   //Wrapped Angular Service(malService)
   //Provides Angular-friendly wrappers, 	Angular handles some behavior for you, 	Easier to use in components and templates
   /*🔍 Key Methods
   msalService.instance.getActiveAccount()
   Returns the account object that is currently "active" (you can set it during login).
   msalService.instance.getAllAccounts()
   Returns all accounts MSAL knows about (useful in multi-account apps).
   If getActiveAccount() returns null, it might mean the user is logged in but the account wasn't set as active.

   // msalService.instance is this object:
    const msalApp: PublicClientApplication = msalService.instance;
    From this msalApp, you can use low-level MSAL methods like:
    msalApp.getAllAccounts()
    msalApp.loginRedirect()
    msalApp.logoutRedirect()
    msalApp.setActiveAccount(account)
    These come directly from the MSAL.js library — not Angular-specific helpers.
   */

    //msalReady ile msal servisini hazir olunca kullanilmasini sagliyhoruz yoksa hata alirouz.Microsoft un msal-angular  - msal-browser npm paketlerini installasjon yapmamiz gerekiyor login- ugyulamamiz icin-BrowserAuthError: uninitialized_public_client_application
   //"You must call and await the initialize function before attempting to call any other MSAL API."
   //🔍 Why This Happens :In MSAL v3+ (@azure/msal-browser), especially when used with Angular 15+, initialization must happen before you use any MSAL methods like loginPopup, acquireTokenPopup, etc.If MSAL isn't fully initialized, it throws this error when you try to interact with it.