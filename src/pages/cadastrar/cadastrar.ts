import { Component } from '@angular/core';
import { BackandService } from '@backand/angular2-sdk';
import { AlertController } from 'ionic-angular';
//import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CadastrarPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
//@IonicPage()
@Component({
  selector: 'page-cadastrar',
  templateUrl: 'cadastrar.html',
})
export class CadastrarPage {

  email:string = '';
  firstName:string = '';
  lastName:string = '';
  signUpPassword: string = '';
  confirmPassword: string = '';
  userData: any = {};

  constructor(private backand: BackandService, public alertCtrl: AlertController) {
    console.log('cadastrar');
  }

public signUp() {
    if (this.signUpPassword != this.confirmPassword){
      alert('As senhas não são iguais');
      return;
    }
    this.backand.signup(this.firstName, this.lastName, this.email, this.signUpPassword, this.confirmPassword)
      .then((res: any) => {
         this.Alerta()
          this.email = this.signUpPassword = this.confirmPassword = this.firstName = this.lastName = '';
      },
      (err: any) => {
        alert(err.data)
      }
    );
  }

public Alerta(){
let alert = this.alertCtrl.create({
          title: 'Sucesso!',
          message: 'Cadastro realizado com sucesso',
          buttons: ['Ok']
        });
    alert.present()

}
}
