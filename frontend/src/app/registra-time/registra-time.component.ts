import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Emitters } from '../emiiters/emitters';

@Component({
  selector: 'app-registra-time',
  templateUrl: './registra-time.component.html',
  styleUrl: './registra-time.component.scss'
})
export class RegistraTimeComponent {
  time!: FormGroup;

  url: string = 'http://localhost:8000/api';

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router:Router){

  }

  ngOnInit(): void {
    this.time = this.formBuilder.group({
      name: '',
    })  
  }

  registraTime(): void{
    console.log(this.time.getRawValue());
    this.http.post(this.url + '/criaTime', this.time.getRawValue(), {withCredentials: true}).subscribe(()=> this.router.navigate(['/campeonato']));
    Emitters.timesEmitter.emit();
  }
}
