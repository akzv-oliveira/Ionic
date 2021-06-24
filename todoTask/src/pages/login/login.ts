import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';
import { HomePage } from '../home/home'

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [
    UsersProvider
  ]
})
export class LoginPage {
  model: User;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private usersProvider: UsersProvider,
    private toast: ToastController,
  ) {
    this.model = new User();
    this.model.email = '';
    this.model.password = '';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.usersProvider.getDetailsFromAPI();
  }

  login() {
    //SQLITE
    // this.storage.set('email', this.model.email);
    // this.storage.set('password', this.model.password);
    this.usersProvider.login(this.model.email, this.model.password)
      // SUCESSO
      .then((result: any) => {
        this.toast.create({
          message: 'Usuário logado com sucesso. Token: '
            + result.token, position: 'botton', duration: 3000
        }).present();
        this.navCtrl.push(HomePage);
      })
      // ERRO
      .catch((error: any) => {
        this.toast.create({
          message: 'Erro ao efetuar login. Erro: '
            + error.error, position: 'botton', duration: 3000
        }).present();
      })
  }


}

export class User {
  email: string;
  password: string;
}
