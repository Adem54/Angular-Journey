import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
export const maslGuard: CanActivateFn = (route, state) => {

  const msalService = inject(MsalService);
  if(msalService.instance.getActiveAccount() == null)//user is not logged inn
  {
    return false;// User is not logged in
  }
  return true;
};

/*
msal guard i yuklememiz gerekiyor...
$ ng generate guard masl
✔ Which type of guard would you like to create? CanActivate
CREATE src/app/masl.guard.spec.ts (478 bytes)
CREATE src/app/masl.guard.ts (133 bytes)
msal.guards.ts dosyamiz olusuyor...
*/