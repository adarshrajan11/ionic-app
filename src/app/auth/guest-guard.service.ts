import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GuestGuardService implements CanActivate {
  constructor(private router:Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
  {
    if(localStorage.getItem('appToken')){
      this.router.navigateByUrl('/tabs/list');
      return false;
    }
    else{
      return true;
    }
 }
}
