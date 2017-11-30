import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { CadUsuarioComponent } from './cad-usuario/cad-usuario.component';
import { LoginUsuarioComponent } from './login-usuario/login-usuario.component';

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
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
