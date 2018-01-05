import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

import { RouterModule, Routes } from '@angular/router'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'

import { AppComponent } from './app.component'
import { CadUsuarioComponent } from './cad-usuario/cad-usuario.component'
import { LoginUsuarioComponent } from './login-usuario/login-usuario.component'
import { LaravelService } from './laravel.service'
import { CookieService } from 'ngx-cookie-service'
import { HomeComponent } from './home/home.component'
import { EstagiarioComponent } from './estagiario/estagiario.component'
import { CadEstagiarioComponent } from './cad-estagiario/cad-estagiario.component'
import { AvaliarComponent } from './estagiario/avaliar/avaliar.component'
import { AvaliacaoComponent } from './estagiario/avaliacao/avaliacao.component'
import { GestorComponent } from './gestor/gestor.component'
import { IndicadoresComponent } from './gestor/indicadores/indicadores.component'
import { PesosComponent } from './gestor/pesos/pesos.component';
import { ImprimirComponent } from './estagiario/imprimir/imprimir.component'

const appRoutes: Routes = [
  { path: 'login', component: LoginUsuarioComponent },
  { path: 'cadastro', component: CadUsuarioComponent },
  { path: 'home', component: HomeComponent },

  { path: 'gestor', component: GestorComponent },
  { path: 'gestor/pesos', component: PesosComponent },
  { path: 'gestor/indicador/:id', component: IndicadoresComponent },

  { path: 'cad-estagiario', component: CadEstagiarioComponent },
  { path: 'imprimir/:cargo', component: ImprimirComponent },
  { path: 'estagiario/:id', component: EstagiarioComponent },
  { path: 'estagiario/:id/avaliar', component: AvaliarComponent },
  { path: 'estagiario/:estagiario_id/avaliacao/:aval_id', component: AvaliacaoComponent },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: LoginUsuarioComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    CadUsuarioComponent,
    LoginUsuarioComponent,
    HomeComponent,
    EstagiarioComponent,
    CadEstagiarioComponent,
    AvaliarComponent,
    AvaliacaoComponent,
    GestorComponent,
    IndicadoresComponent,
    PesosComponent,
    ImprimirComponent,
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
