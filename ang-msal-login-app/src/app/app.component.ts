import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone:false
})
export class AppComponent implements OnInit {
  title = 'Microsoft Login';

  constructor(private msalService: MsalService) {}

  ngOnInit(): void {
    const accounts = this.msalService.instance.getAllAccounts();
    if (accounts.length > 0) {
      this.msalService.instance.setActiveAccount(accounts[0]);
    }
  }

   login = async()=> {
      this.msalService.loginPopup().subscribe((response: AuthenticationResult) => {
      this.msalService.instance.setActiveAccount(response.account);
      console.log('Logged in:', response.account);
    });
  }

  logout(): void {
    this.msalService.logoutPopup();
  }

  isLoggedIn(): boolean {
    return this.msalService.instance.getActiveAccount() != null;
  }
}


  




 
/*

  login() {
        
    this.msalService.loginPopup().subscribe((response:AuthenticationResult)=>
    {
      //login olunca accountunu aktiflestiriyoruz..
       this.msalService.instance.setActiveAccount(response.account);
         console.log('Login successful. Active account set:', response.account);
       //When the user logged in, we set the active account of the result of the subscribe
    })
  }
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