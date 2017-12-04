import { Injectable, Output, EventEmitter } from '@angular/core'
import { CookieService } from 'ngx-cookie-service'
import { Http, Headers } from '@angular/http'
import { Router } from '@angular/router'

@Injectable()
export class LaravelService {
  @Output() logged: EventEmitter<boolean> = new EventEmitter();

  private _User
  private _API = 'http://localhost:8000/';
  private headers = new Headers({ 'Content-Type': 'application/json' })

  constructor(private http: Http, private cookie: CookieService, private router: Router) {
    this.sessionChecker()
  }

  sessionChecker() {
    if (!this.cookie.check('userSession')) {
      this.logged.next(false)
      this.router.navigate(['/login'])
    } else {
      this.logged.next(true)
      this.User = JSON.parse(this.cookie.get('userSession'))
      this.User.nome = this.User.nome.charAt(0).toUpperCase() + this.User.nome.slice(1)
    }
  }

  getFormData(then) {
    this.http.get('http://localhost:8000/form', { headers: this.headers })
      .subscribe(res => then(res.json()))
  }

  get User() {
    return this._User
  }
  set User(user) {
    this._User = user
  }

  validade(obj) {
    const errors = []

    for (let prop in obj)
      if (obj[prop] == '')
        errors.push(prop)

    return new Promise(res => {
      if (!errors.length)
        res(obj)
      else
        alert(`Os seguintes campos estão vazios: ${errors.join(', ')}.`)
    })
  }
  post(what, where, redirectTo) {
    this.validade(what)
      .then(() => {
        this.http
          .post(this._API + where, what, { headers: this.headers })
          .subscribe(
          () => this.router.navigate([redirectTo]),
          error => document.querySelector('html').innerHTML = error.text())
      })
  }

  login(user) {
    this.http
      .post('http://localhost:8000/login', user, { headers: this.headers })
      .subscribe(res => {
        this.User = res.json()
        this.cookie.set('userSession', JSON.stringify(res.json()))
        this.router.navigate(['/home'])
        this.logged.next(true)
      },
      error => {
        this.logged.next(false)
        document.querySelector('html').innerHTML = error.text()
      })
  }

  loggout() {
    this.cookie.delete('userSession')
    this.router.navigate(['/login'])
    this.logged.next(false)
  }

}
