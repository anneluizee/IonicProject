import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-esqueceu-senha',
  templateUrl: 'esqueceu-senha.html',
})
export class EsqueceuSenhaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EsqueceuSenhaPage');
  }

public voltar(){
 this.navCtrl.push(LoginPage);
}
}
