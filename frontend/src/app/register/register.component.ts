import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;

  url: string = 'http://localhost:8000/api';

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router:Router){

  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: '',
      email: '',
      password: '',
    });
  }

  register(): void{
    //console.log(this.form.getRawValue());
    this.http.post(this.url + '/register', this.form.getRawValue()).subscribe(()=> this.router.navigate(['/login']));
  }

  
}
