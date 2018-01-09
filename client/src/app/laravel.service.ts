import { Injectable, Output, EventEmitter } from '@angular/core'
import { CookieService } from 'ngx-cookie-service'
import { Http, Headers } from '@angular/http'
import { Router } from '@angular/router'
import { Gestor } from './gestor/gestor'
@Injectable()
export class LaravelService {
  @Output() logged: EventEmitter<boolean> = new EventEmitter();

  private _User: Gestor
  private _API = 'http://talentos.conexaomercado.com.br/avaliacaoDesempenhoServer/';
  private headers = { headers: new Headers({ 'Content-Type': 'application/json' }) }

  constructor(
    private http: Http,
    private cookie: CookieService,
    private router: Router
  ) {
    this.sessionChecker()
  }

  getFormData(then) {
    this.http.get(this._API + 'form', this.headers)
      .subscribe(res => then(res.json()))
  }

  getComps() {
    return new Promise((res, rej) => {
      this.http.get(this._API + 'comp')
        .subscribe(
        comps => res((comps)),
        error => rej(error)
        )
    })
  }

  all(where) {
    return new Promise((res, rej) => {
      this.http.get(this._API + where)
        .subscribe(
        all => res(all),
        error => rej(error)
        )
    })
  }

  getIndsComp(id) {
    return new Promise((res, rej) => {
      this.http.get(this._API + 'indicadores/' + id)
        .subscribe(
        data => res((data)),
        error => rej(error)
        )
    })
  }

  sessionChecker() {
    try {
      if (!this.cookie.check('userSession')) this.loggout()
      else {
        if (JSON.stringify(this.User) != this.cookie.get('userSession')) {
          if (!this.logged) this.logged.next(true)
          this.User = JSON.parse(this.cookie.get('userSession'))
        }
      }
    } catch (err) {
      this.logged.next(false)
      console.error("Deleted All Cookies", err)
      this.cookie.deleteAll()
    }
  }

  adminOnly() {
    if (this.User.setor_id != 1) this.router.navigate(['/home'])
  }

  get User() {
    return this._User
  }
  set User(user) {
    this._User = user
  }

  estagiarios() {
    if (this.User.setor_id != 1)
      return this.http.get(this._API + 'home/' + this.User.setor_id, this.headers)
    else
      return this.http.get(this._API + 'home', this.headers)

  }

  validate(obj, dont) {
    const errors = []

    if (!dont)
      for (let prop in obj)
        if (obj[prop] === '' || obj[prop] == '0')
          errors.push(prop[0].toUpperCase() + prop.slice(1).replace('_id', ''))

    return new Promise(res => {
      if (!errors.length)
        res(obj)
      else
        alert(`Os seguintes campos estão vazios: ${errors.join(', ')}.`)
    })
  }

  post(what, where, redirectTo = '', func = null, dont = false) {
    this.validate(what, dont)
      .then(() => {
        this.http
          .post(this._API + where, what, this.headers)
          .subscribe(
          res => {
            if (func) func(res)
            if (redirectTo) this.router.navigate([redirectTo])
          },
          error => {
            document.querySelector('html').innerHTML = error.text()
            alert(JSON.stringify(error.text()))
          }
          )
      })
  }

  delete(what, where, redirectTo = '', then = () => { }) {
    this.http
      .delete(`${this._API}${where}${what}`, this.headers)
      .subscribe(
      res => {
        if (redirectTo) this.router.navigate([redirectTo])
        then()
      },
      error => {
        document.querySelector('html').innerHTML = error.text()
        alert(JSON.stringify(error.text()))
      })
  }

  show(where, id) {
    return this.http.get(`${this._API}${where}/${id}`, this.headers);
  }

  login(user) {
    this.http
      .post(this._API + 'login', user, this.headers)
      .subscribe(res => {
        const resp = res.json()

        this.User = resp.gestor
        this.User.avaliacoes = resp.avaliacoes
        this.User.nome = this.User.nome.charAt(0).toUpperCase() + this.User.nome.slice(1)

        this.cookie.set('userSession', JSON.stringify(this.User))
        this.logged.next(true)
        this.router.navigate(['/home'])
      },
      error => {
        this.logged.next(false)
        this.cookie.deleteAll()
        // document.querySelector('html').innerHTML = error.text()
        alert(JSON.stringify(error.text()))

      })
  }

  loggout() {
    try {
      this.cookie.delete('userSession')
      this.router.navigate(['/login'])
      this.logged.next(false)
    } catch (e) {
      this.cookie.deleteAll()
      window.location.reload()
    }
  }

}
