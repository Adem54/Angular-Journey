import { CanActivateFn } from '@angular/router';

export const maslGuard: CanActivateFn = (route, state) => {
  return true;
};
