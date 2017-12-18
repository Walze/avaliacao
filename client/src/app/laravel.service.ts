import { Injectable, Output, EventEmitter } from '@angular/core'
import { CookieService } from 'ngx-cookie-service'
import { Http, Headers } from '@angular/http'
import { Router } from '@angular/router'
import { Gestor } from './gestor/gestor'
@Injectable()
export class LaravelService {
  @Output() logged: EventEmitter<boolean> = new EventEmitter();

  private _User: Gestor
  private _API = 'http://localhost:8000/';
  private headers = { headers: new Headers({ 'Content-Type': 'application/json' }) }

  constructor(
    private http: Http,
    private cookie: CookieService,
    private router: Router
  ) {
    this.sessionChecker()


    this.http.get('https://www.googleapis.com/youtube/v3/videos?part=contentDetails&maxResults=50&playlistId=UUdGpd0gNn38UKwoncZd9rmA&key=AIzaSyAFpfwkObY-luKXEUtQaNPQNX1PcaDafcI').subscribe(res => {
      console.log(res.json())
    })
  }

  getFormData(then) {
    this.http.get('http://localhost:8000/form', this.headers)
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
    if (!this.cookie.check('userSession')) {
      this.logged.next(false)
      this.router.navigate(['/login'])
    } else {
      this.logged.next(true)
      try {
        this.User = JSON.parse(this.cookie.get('userSession'))
      } catch (err) {
        console.error("Deleted All Cookies", err)
        this.cookie.deleteAll()
      }
    }
  }

  get User() {
    return this._User
  }
  set User(user) {
    this._User = user
  }

  estagiarios() {
    return this.http.get(this._API, this.headers)
  }

  validate(obj) {
    const errors = []

    for (let prop in obj)
      if (obj[prop] === '' || obj[prop] === 0 || obj[prop] === '0')
        errors.push(prop)

    return new Promise(res => {
      if (!errors.length)
        res(obj)
      else
        alert(`Os seguintes campos estão vazios: ${errors.join(', ')}.`)
    })
  }

  post(what, where, redirectTo = '', func = null) {
    this.validate(what)
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
          })
      })
  }

  delete(what, where, redirectTo = '') {
    this.http
      .delete(`${this._API}${where}${what}`, this.headers)
      .subscribe(
      res => {
        if (redirectTo) this.router.navigate([redirectTo])
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
      .post('http://localhost:8000/login', user, this.headers)
      .subscribe(res => {
        const resp = res.json()

        //this.User = resp.gestor
        let rest
        this.User = resp.gestor
        this.User.avaliacoes = resp.avaliacoes
        this.User.nome = this.User.nome.charAt(0).toUpperCase() + this.User.nome.slice(1)

        console.log(this.User)

        this.cookie.set('userSession', JSON.stringify(this.User))
        this.router.navigate(['/home'])
        this.logged.next(true)
      },
      error => {
        this.logged.next(false)
        // document.querySelector('html').innerHTML = error.text()
        alert(JSON.stringify(error.text()))

      })
  }

  loggout() {
    //this.logged.next(false)
    this.cookie.delete('userSession')
    this.router.navigate(['/login'])
  }

}
