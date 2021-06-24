import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UsersProvider {

  private API_URL = 'http://localhost:3000/';
  public userList = new Array<any>();

  constructor(public http: HttpClient) {
    console.log('Hello UsersProvider Provider');
  }

  getDetailsFromAPI() {
    return this.http.get(this.API_URL + 'users')
      .subscribe(
        data => {
          const retorno = data as any;
          this.userList = this.userList.concat(retorno)
          console.log(this.userList);
          // this.storage.set('email', retorno.results.email);
          // this.storage.set('password', this.model.password);
        }, error => {
          console.log(error);
        }
      );
  }

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      var data = {
        email: email,
        password: password
      };

      this.http.post(this.API_URL + 'users', data)
        .subscribe((result: any) => {
          resolve(result);
        },
          (error: any) => {
            console.log(error)
            reject(error.json());
          });

    })
  }

}
