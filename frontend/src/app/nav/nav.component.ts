import { Component, OnInit } from '@angular/core';
import { Emitters } from '../emiiters/emitters';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent implements OnInit{
  authenticated = false;
  url: string = 'http://localhost:8000/api';

  constructor(private http:HttpClient){}

  ngOnInit(): void {
    Emitters.authEmitter.subscribe((auth:boolean)=>{
      this.authenticated = auth;
    })
  }

  logout(): void{
    this.http.post(this.url + '/logout', {}, {withCredentials: true}).subscribe(()=>{ this.authenticated = false;});
  }
}
