import { Directive, OnInit, OnDestroy, Input, ViewContainerRef, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { UserAuth } from 'src/app/models';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit, OnDestroy {

  @Input('appHasRole') appHasRole: any;
  
  stop$ = new Subject();
  
  isVisible:boolean = false;
  currentUser: UserAuth;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(){
    //  We subscribe to the roles$ to know the roles the user has
    this.authenticationService.currentUser.subscribe(x => {
      this.currentUser = x;
      if(this.currentUser){
        const role = this.currentUser.role;
        // If he doesn't have any roles, we clear the viewContainerRef
        if (!role) {
          this.viewContainerRef.clear();
        }
        // If the user has the role needed to 
        // render this component we can add it
        if(Array.isArray(this.appHasRole)){       
          for(let r in this.appHasRole){
            if(role.includes(this.appHasRole[r])){
              if(! this.isVisible){
                this.isVisible = true;
                this.viewContainerRef.createEmbeddedView(this.templateRef);
                return;
              }
            }else{
              this.isVisible = false;
              this.viewContainerRef.clear();
            }
          }
        }else{
          if (role.includes(this.appHasRole)) {
            // If it is already visible (which can happen if
            // his roles changed) we do not need to add it a second time
            if (!this.isVisible) {
              // We update the `isVisible` property and add the 
              // templateRef to the view using the 
              // 'createEmbeddedView' method of the viewContainerRef
              this.isVisible = true;
              this.viewContainerRef.createEmbeddedView(this.templateRef);
            }
          } else {
            // If the user does not have the role, 
            // we update the `isVisible` property and clear
            // the contents of the viewContainerRef
            this.isVisible = false;
            this.viewContainerRef.clear();
          }
        }
      }
    });
  }

  ngOnDestroy(){
    this.stop$.next();
  }
}
