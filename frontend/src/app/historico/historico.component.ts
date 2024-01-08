import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Emitters } from '../emiiters/emitters';
import { TimesService } from '../services/times.service';
import { error } from 'console';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrl: './historico.component.scss'
})
export class HistoricoComponent implements OnInit{
  message = '';
  authenticated = false;
  url: string = 'http://localhost:8000/api';

  campeonatos: any;
  id_campeonatos: any;
  resultado: any;
  resultados: any[] = [];

  constructor(private http:HttpClient, private timesService: TimesService){}
  
  ngOnInit():void {
    this.http.get(this.url + '/user', {withCredentials:true}).subscribe(
      (res: any) => {
        this.message = `Oi ${res.name}`, this.authenticated = true;
        Emitters.authEmitter.emit(true)},
      err => {this.message = 'Você não está logado!', this.authenticated = false;
      Emitters.authEmitter.emit(false);
      }
    );
      //this.mostraCampeonatos();
      this.historicoCampeonato();

  }

  mostraCampeonatos(){
    this.timesService.listaCampeonatos().subscribe(
      (data: any) => {
      this.campeonatos = data;

      //console.log('Campeonatos: ', this.id_campeonatos);
    },
    (error) => {
      console.error('Erro ao buscar os campeonatos:', error);
    });
  }

  


    async historicoCampeonato(){
      this.timesService.historicoCampeonato().subscribe(
        (data: any) => {
          this.resultados = data;
          console.log('Resultado do campeonato', this.resultados)
        },
        (error) => {
          console.error('Erro ao buscar resultados dos campeonatos:', error);
        }
      );
    }
}
  


