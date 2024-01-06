import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  form!: FormGroup;

  url: string = 'http://localhost:8000/api';

  constructor( private formBuilder: FormBuilder, private http: HttpClient, private router: Router){
  }

  ngOnInit(): void {
      this.form = this.formBuilder.group({
        email: '',
        password: '',
      });
  }

  login(): void {
    //console.log(this.form.getRawValue());
    this.http.post(this.url + '/login', this.form.getRawValue(), {
      withCredentials: true
    }).subscribe(()=> this.router.navigate(['']));
  }
}
