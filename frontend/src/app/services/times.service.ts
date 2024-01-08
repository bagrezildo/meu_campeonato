import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimesService {
  private url: string = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
       'Content-Type': 'application/json',
       
      })
  }

  listaTimes(){
    console.log('quero listar os times');
    return this.http.get(this.url + '/listaTimes', {... this.httpOptions,withCredentials: true});
    
  }

  buscaTime(timeId: number){
    return this.http.get(this.url + '/buscaTime/' + timeId, {... this.httpOptions,withCredentials: true});
  }

  criaCampeonato(){
    const campeonato = {
      name: 'Campeonato',
    }
    console.log('quero começar o campeonato');
    return this.http.post(this.url + '/criaCampeonato', campeonato, {... this.httpOptions,withCredentials: true});
  }

  listaCampeonatos(){
    return this.http.get(this.url + '/listaCampeonatos', {... this.httpOptions,withCredentials: true});
  }

  comecaCampeonato(campeonatoId: number, timeId: number): Observable<any>{
    const campeonato = {
      campeonato_id: campeonatoId,
      time_id: timeId,
    }
    return this.http.post(this.url + '/comecaCampeonato', campeonato, {... this.httpOptions,withCredentials: true});
  }

  simulaPartida(campeonatoId: number, time_casa_id: number, time_visitante_id: number, fase_id: number){
    const partida = {
      campeonato_id: campeonatoId,
      time_casa_id: time_casa_id,
      time_visitante_id: time_visitante_id,
      fase_id: fase_id,
    }
    return this.http.post(this.url + '/criaPartida', partida, {... this.httpOptions,withCredentials: true});

  }

  resultadoCampeonato(campeonatoId: number){
    const campeonato = {
      campeonato_id: campeonatoId,
    }
    return this.http.get(this.url + '/resultadoCampeonato/' + campeonato.campeonato_id, {... this.httpOptions,withCredentials: true});
  }

  listaPontuacaoCampeonato(campeonatoId: number): Observable<any>{
    const campeonato = {
      campeonato_id: campeonatoId,
    }
    return this.http.get(this.url + '/listaPontuacaoCampeonato/' + campeonato.campeonato_id, {... this.httpOptions,withCredentials: true});
  }

  historicoCampeonato(){
    return this.http.get(this.url + '/historicoCampeonatos', {... this.httpOptions,withCredentials: true});
  }



}
