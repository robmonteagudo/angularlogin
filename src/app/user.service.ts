import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
 
@Injectable()
export class UserService {
 
  private httpOptions: any;
 
  public token: string;
 
  public email: string;
  public first_name: string;
  public last_name: string;
  public password: string;
  public avatar: string;
 
  public errors: any = [];
 
  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})
    };
  }
 
  public login(user) {
    const body = new HttpParams()
        .set('email', user.email)
        .set('password', user.password);
    this.http.post('http://localhost:8000/profiles/login/', body.toString(), this.httpOptions).subscribe(
      data => {
        this.updateData(data);
      },
      err => {
        this.errors = err['error'];
      }
    );
  }
 
  public logout() {
    this.token = null;
    this.email = null;
  }
 
  private updateData(token) {
    this.token = token['access_token'];
    this.email = token['user']['email'];
    this.first_name = token['user']['first_name'];
    this.last_name = token['user']['last_name'];
    this.password = token['user']['password'];
    this.avatar = token['user']['avatar'];
    this.errors = [];
 
    // decode the token to read the username and expiration timestamp
    const token_parts = this.token.split(/\./);
    const token_decoded = JSON.parse(window.atob(token_parts[1]));
    this.email = token_decoded.email;
  }
 
}