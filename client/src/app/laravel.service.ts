import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Http, Headers } from '@angular/http';

@Injectable()
export class LaravelService {

  private headers = new Headers({ 'Content-Type': 'application/json' })

  constructor(private http: Http, private cookie: CookieService) {
  }

  getFormData(then) {
    this.http.get('http://localhost:8000/form', { headers: this.headers })
      .subscribe(res => then(res.json()))
  }

  postUser(user) {
    this.http
      .post('http://localhost:8000/cadastrar', user, { headers: this.headers })
      .subscribe(res => {
        console.warn(res.json() || res)
      },
      error => {
        document.querySelector('html').innerHTML = error.text()
      }
      )
  }

  login(user) {
    this.http
      .post('http://localhost:8000/login', user, { headers: this.headers })
      .subscribe(res => {
        this.cookie.set('userSession', JSON.stringify(res.json()));
      },
      error => {
        document.querySelector('html').innerHTML = error.text()
      })
  }

}
