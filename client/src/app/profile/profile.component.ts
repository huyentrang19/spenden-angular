import { Component } from '@angular/core'
import { AuthenticationService, UserSpenden, UserDetails } from '../authentication.service'


@Component({
  templateUrl: './profile.component.html'
})
export class ProfileComponent {
  details: UserDetails
  detail: UserSpenden
  constructor(private auth: AuthenticationService, auth1: AuthenticationService) { }
  ngOnInit() {
    this.auth.profile().subscribe(
      spenden => {
        this.detail = spenden
      },
      err => {
        console.error(err)
      }
    )
  }
}


