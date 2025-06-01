import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MSAL_GUARD_CONFIG, MsalBroadcastService, MsalGuardConfiguration, MsalService } from '@azure/msal-angular';
import { InteractionStatus, RedirectRequest } from '@azure/msal-browser';
import { filter, Subject, takeUntil } from 'rxjs';
import { AzureAdDemoService } from './azure-ad-demo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
 
  isUserLoggedIn:boolean= false;
  private readonly _destroy = new Subject<void>();

   constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig:MsalGuardConfiguration,
    private msalBroadCastService:MsalBroadcastService,
    private authService:MsalService,
    private azureAdDemoService:AzureAdDemoService
  )
   {

   }

   //As we use observables, we have to detstroy the subscription and this compnent is destroyed to avoid memory leaks so that we will declare private readonly _destroy = new Subject
  //and we have to pass it into takeUntil operator and pass this._destroy
  //takeUntil() is an RxJs operator that : “Automatically unsubscribe from the observable when another observable emits a value.”So we combine it with a Subject() that emits a value when the component is destroyed.
   ngOnInit():void 
  {
    //MSAL broadcasts login progress via inProgress$ observable
    //we have to subscribe to azure events and decide if the user logged on or not
    this.msalBroadCastService.inProgress$ //this give use logged status whether it is in progress or completed, on this
    .pipe(filter((interactionStatus:InteractionStatus)=>interactionStatus == InteractionStatus.None),// Status set when interaction is complete..interactionStatus-None
     takeUntil(this._destroy))
    .subscribe(x=>{
      //if the user is logged in will get at least one acoount over here and length>0 we can say user is logged in...
      this.isUserLoggedIn = this.authService.instance.getAllAccounts().length > 0
      //"we say here: I want to do something only after MSAL finishes logging in or completing its redirect."
      //Don't check getAllAccounts() too early — wait until login or redirect is done
      this.azureAdDemoService.isUserLoggedIn.next(this.isUserLoggedIn)
    })
  }
  //✅ “Wait until MSAL is done with login/redirect”
  //✅ Then, check if getAllAccounts() returns at least one account
  /*
  Imagine the login process is like downloading a file.
If you check the file before it's finished downloading, you get nothing.
But if you wait until it's finished, you get the real file.
Same here:

getAllAccounts() might return nothing if login is still happening

But after InteractionStatus.None, it's safe to check
  */

// In ngOnDestroy(), you emit a value to destroy the subscription:
//This part will take care of destroying subscriptions
  ngOnDestroy(): void {
    this._destroy.next(undefined);
    this._destroy.complete();
  }

  login()
  {
    //this.msalGuardConfig.authRequest -This is a config object you probably defined in your MSAL module setup (usually in app.module.ts)
    //It may contain Custom scopes (e.g., User.Read, email),Redirect URI-{
      //  in app.module.ts_=>  interactionType:InteractionType.Redirect,
      //   authRequest: {
      //     scopes: ['user.read']
      //   }
      // },
    //“If I have a custom login config, use it. Otherwise, use the default MSAL redirect login.”
    if(this.msalGuardConfig.authRequest)
    {
      // this.authService.loginRedirect(...)- This is how MSAL in Angular starts the login process-It redirects the browser to Azure AD login page-After successful login, it redirects back to your app (usually redirectUri)
       this.authService.loginRedirect({...this.msalGuardConfig.authRequest} as RedirectRequest)
    }else 
    {
      this.authService.loginRedirect();
    }
  }

  logout()
  {
    //When use clicked to the logout-btn-user redirected to the azure-logout page and once logout is succesfull again the azure will redirect back to the post logout redirect uri that is localhost:4200
    this.authService.logoutRedirect({postLogoutRedirectUri:"http://localhost:4200"});
  }
}
