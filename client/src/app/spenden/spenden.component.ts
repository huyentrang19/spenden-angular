
import { Component } from "@angular/core";
import { AuthenticationService, TokenPayloadSpenden } from "../authentication.service";
import { Router } from "@angular/router";
@Component({
  templateUrl: "./spenden.component.html"
})
export class SpendenComponent {
  credentials: TokenPayloadSpenden = {
    donateid: 0,
    amount: '',
    email: '',
    donatesgoal: ''  
  };
  constructor(private auth: AuthenticationService, private router: Router) { }
    spenden() {
    this.auth.spenden(this.credentials).subscribe(
      () => {
        this.router.navigateByUrl("/profile");
      },
      err => {
        console.error(err);
      }
    );
  }
}



