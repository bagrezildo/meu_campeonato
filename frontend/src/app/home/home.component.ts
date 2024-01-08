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
  authenticated = false;
  url: string = 'http://localhost:8000/api';
  constructor(private http:HttpClient){}

  ngOnInit():void {
    this.http.get(this.url + '/user', {withCredentials:true}).subscribe(
      (res: any) => {
        this.message = `Oi ${res.name}`, this.authenticated = true;
        Emitters.authEmitter.emit(true)},
      err => {this.message = 'Você não está logado', this.authenticated = false;
      Emitters.authEmitter.emit(false);
      }
    );
  }
}
