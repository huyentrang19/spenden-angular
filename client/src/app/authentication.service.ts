import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Router } from '@angular/router'

export interface UserSpenden{
  donateid: number
  email: string
  amount: string
  donatesgoal: string
  exp: number
  iat: number
}

export interface UserDetails {  
  id: number
  first_name: string
  last_name: string
  email: string
  password: string
  exp: number
  iat: number
}

interface TokenResponse {
  token: string
}

export interface TokenPayload {
  id: number 
  first_name: string
  last_name: string
  email: string
  password: string
 }
export interface TokenPayloadSpenden {
  email: string
  donateid: number
  amount: string
  donatesgoal: string
}

@Injectable()
export class AuthenticationService {
  private token: string

  constructor(private http: HttpClient, private router: Router) {}

  private saveToken(token: string): void {
    localStorage.setItem('usertoken', token)
    this.token = token
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('usertoken')
    }
    return this.token
  }
  public getUserspenden(): UserSpenden {
    const token = this.getToken()
    let payload
    if (token) {
      payload = token.split('.')[1]
      payload = window.atob(payload)
      return JSON.parse(payload)
    } else {
      return null
    }
  }
  public getUserDetails(): UserDetails {
    const token = this.getToken()
    let payload
    if (token) {
      payload = token.split('.')[1]
      payload = window.atob(payload)
      return JSON.parse(payload)
    } else {
      return null
    }
  }
 
  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    const spender = this.getUserspenden()
    if (user) {
      return user.exp > Date.now() / 1000
    } else if (spender){
      return user.exp > Date.now() / 1000
    }
    else {
      return false
    }
  }

  public register(user: TokenPayload): Observable<any> {
    return this.http.post(`/users/register`, user)
  }
  public spenden(spenden: TokenPayloadSpenden): Observable<any> {
    return this.http.post(`/users/spenden`, spenden)
  }
  public login(user: TokenPayload): Observable<any> {
    const base = this.http.post(`/users/login`, user)

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token)
        }
        return data
      })
    )
    return request
  }

  public profile(): Observable<any> {
    return this.http.get(`/users/profile`, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }

  public logout(): void {
    this.token = ''
    window.localStorage.removeItem('usertoken')
    this.router.navigateByUrl('/')
  }
}
