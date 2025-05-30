import { Component } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-protected-page',
  standalone: false,
  templateUrl: './protected-page.component.html',
  styleUrl: './protected-page.component.css'
})
export class ProtectedPageComponent {

  constructor(private msalService:MsalService)
  {

  }

  ngOnInit():void 
  {

  }

  //ok bu instance uzerinden biz bircok data miza erisebliyoruz...
  getName():string {
    return this.msalService.instance.getActiveAccount()?.username || "";
  }
}
