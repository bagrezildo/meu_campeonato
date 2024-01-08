import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Emitters } from './emiiters/emitters';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'meucampeonato';

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
