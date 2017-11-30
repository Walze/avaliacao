import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class LaravelService {

  private headers = new Headers({ 'Content-Type': 'application/json' })

  constructor(private http: Http) {
  }

  getFormData() {
    return this.http.get('http://localhost:8000/form', { headers: this.headers })
  }

  postUser(user) {
    this.http
      .post('http://localhost:8000/user', user, { headers: this.headers })
      .subscribe(res => {
        console.warn(res.json() || res)
      },
      error => {
        document.querySelector('html').innerHTML = error.text()
      }
      )
  }

}
