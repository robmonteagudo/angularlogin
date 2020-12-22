import {Component, OnInit} from '@angular/core';
import {UserService} from './user.service';
import {throwError} from 'rxjs';
 
@Component({
  selector: 'app-root',
  providers: [UserService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 
  public user: any;
 
  constructor(public _userService: UserService) { }
 
  ngOnInit() {
    this.user = {
      email: '',
      password: '',
      first_name: '',
      last_name: '',
    };
  }
 
  login() {
    this._userService.login({'email': this.user.email, 'password': this.user.password});
  }
 
  logout() {
    this._userService.logout();
  }
 
}