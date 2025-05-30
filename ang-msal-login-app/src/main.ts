// src/main.ts
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

import { PublicClientApplication } from '@azure/msal-browser';



// 👇 Create MSAL instance manually
const msalInstance = new PublicClientApplication({
  auth: {
    clientId: '55aa8518-84ec-476b-bbbe-0287a62bd75c',
    redirectUri: 'http://localhost:4200'
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false
  }
});

msalInstance.initialize().then(() => {
  // Optionally expose MSAL globally for debugging
  (window as any).msalInstance = msalInstance;

  // Now bootstrap Angular after MSAL is ready
  platformBrowserDynamic([{ provide: 'MSAL_INSTANCE', useValue: msalInstance }])
    .bootstrapModule(AppModule)
    .catch(err => console.error(err));
});
