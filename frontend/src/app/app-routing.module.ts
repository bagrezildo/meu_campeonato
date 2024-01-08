import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HistoricoComponent } from './historico/historico.component';
import { RegistraTimeComponent } from './registra-time/registra-time.component';
import { TimesComponent } from './times/times.component';

const routes: Routes = [
  {path: '', component : HomeComponent},
  {path: 'login', component : LoginComponent},
  {path: 'register', component : RegisterComponent},
  {path: 'historico', component : HistoricoComponent},
  {path: 'campeonato', component : HomeComponent},
  {path: 'criaTime', component : RegistraTimeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
