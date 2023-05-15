import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  username: string="";
  email: string="";
  password: string="";

  constructor(private http: HttpClient) {}

  onSubmit() {
    const data = {
      username: this.username,
      email: this.email,
      password: this.password
    };
    this.http.post('http://localhost:8888/signup.php', data)
      .subscribe(response => console.log(response));
  }
}
