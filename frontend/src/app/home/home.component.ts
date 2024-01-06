import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Emitters } from '../emiiters/emitters';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  message = '';
  url: string = 'http://localhost:8000/api';
  constructor(private http:HttpClient){}

  ngOnInit():void {
    this.http.get(this.url + '/user', {withCredentials:true}).subscribe(
      (res: any) => {
        this.message = `Oi ${res.name}`,
        Emitters.authEmitter.emit(true)},
      err => {this.message = 'Você não está logado';
      Emitters.authEmitter.emit(false);
      }
    );
  }
}
