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
import { CookieService } from 'ngx-cookie-service';
import { HomeComponent } from './home/home.component';
import { EstagiarioComponent } from './estagiario/estagiario.component';
import { CadEstagiarioComponent } from './cad-estagiario/cad-estagiario.component';
import { AvaliarComponent } from './estagiario/avaliar/avaliar.component';
import { AvaliacaoComponent } from './estagiario/avaliacao/avaliacao.component';

const appRoutes: Routes = [
  { path: 'cadastro', component: CadUsuarioComponent },
  { path: 'cad-estagiario', component: CadEstagiarioComponent },
  { path: 'login', component: LoginUsuarioComponent },
  { path: 'home', component: HomeComponent },
  { path: 'estagiario/:id', component: EstagiarioComponent },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { path: '**', component: LoginUsuarioComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    CadUsuarioComponent,
    LoginUsuarioComponent,
    HomeComponent,
    EstagiarioComponent,
    CadEstagiarioComponent,
    AvaliarComponent,
    AvaliacaoComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [LaravelService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
