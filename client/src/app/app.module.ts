import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CadUsuarioComponent } from './cad-usuario/cad-usuario.component';
import { LoginUsuarioComponent } from './login-usuario/login-usuario.component';
import { LaravelService } from './laravel.service';

const appRoutes: Routes = [
  {
    path: 'cadastro',
    component: CadUsuarioComponent
  },
  {
    path: 'login',
    component: LoginUsuarioComponent
  },
  {
    path: '',
    redirectTo: '/cadastro',
    pathMatch: 'full'
  },
  { path: '**', component: LoginUsuarioComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    CadUsuarioComponent,
    LoginUsuarioComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [LaravelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
