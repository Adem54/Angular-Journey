import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
//ng g s azure-ad-demo servisini olsutruduk
//We have to add this service inside app.module.ts..AzureAdDemoService
export class AzureAdDemoService {
  isUserLoggedIn:Subject<boolean> = new Subject<boolean>();
  constructor() { }
}
