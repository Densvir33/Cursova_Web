import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../services/account.service';
@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    private accountService: AccountService,
    private router: Router
    ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkAdmin(state.url);
  } 
  
  checkAdmin(url:string):boolean{
    if (this.accountService.isAdmin()) {
      return true;
    }
    this.router.navigate(['404']);
    return false;
  }

  


}