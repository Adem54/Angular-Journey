import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MSAL_GUARD_CONFIG, MsalBroadcastService, MsalGuardConfiguration, MsalService } from '@azure/msal-angular';
import { InteractionStatus, RedirectRequest } from '@azure/msal-browser';
import { filter, Subject, takeUntil } from 'rxjs';

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
    private authService:MsalService)
   {

   }
  ngOnInit():void 
  {
    //we have to subscribe to azure events and decide if the user logged on or not
    this.msalBroadCastService.inProgress$
    .pipe(filter((interactionStatus:InteractionStatus)=>interactionStatus == InteractionStatus.None),
     takeUntil(this._destroy))
    .subscribe(x=>{
      this.isUserLoggedIn = this.authService.instance.getAllAccounts().length > 0
    })
  }
  ngOnDestroy(): void {
    this._destroy.next(undefined);
    this._destroy.complete();
  }

  login()
  {
    if(this.msalGuardConfig.authRequest)
    {
       this.authService.loginRedirect({...this.msalGuardConfig.authRequest} as RedirectRequest)
    }else 
    {
      this.authService.loginRedirect();
    }
  }

  logout()
  {
    this.authService.logoutRedirect({postLogoutRedirectUri:"http://localhost:4200"});
  }
}
