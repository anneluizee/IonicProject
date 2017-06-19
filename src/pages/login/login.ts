import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import 'rxjs/Rx'
import { BackandService } from '@backand/angular2-sdk'
import { AlertController } from 'ionic-angular';


/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  templateUrl: 'login.html',
  selector: 'page-login', 
})
export class LoginPage {
  username:string = null;
  password:string = null;
  auth_type:string = "N/A";
  is_auth_error:boolean = false;
  auth_status:string = null;
  loggedInUser: string = '';
   testRadioOpen: boolean;
  testRadioResult;
  AlertaString:string=null;

  constructor(private backand:BackandService,public alertCtrl: AlertController) {
 this.backand.user.getUserDetails().then(
      (res: any) => {
        if(res.data) {
          this.loggedInUser = res.data.username;
          this.auth_status = 'OK';
          this.auth_type = res.data.token_type == 'Anonymous' ? 'Anonymous' : 'Token';
        }
      },
      (err: any) => {
        this.loggedInUser = null;
        this.auth_status = null;
        this.auth_type = null;
      }
    );
}

public getAuthTokenSimple() {
    this.auth_type = 'Token';
    this.backand.signin(this.username, this.password)
      .then((res: any) => {
        this.auth_status = 'OK';
        this.is_auth_error = false;
        this.loggedInUser = res.data.username;
        this.username = '';
        this.password = '';
       this.AlertaConseguiu()
      },
      (error: any) => {
        let errorMessage: string = error.data.error_description;
        this.auth_status = `Error: ${errorMessage}`;
        this.is_auth_error = true;
        this.auth_status = 'ERROR';
         this.username = '';
        this.password = '';
       this.AlertaNaoConseguiu()
      }
    );
   }

 public  AlertaConseguiu(){
     let alert = this.alertCtrl.create();
    alert.setTitle('Escolha a categoria');

    alert.addInput({
      type: 'radio',
      label: 'Blue',
      value: 'blue',
      checked: true
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        this.testRadioOpen = false;
        this.testRadioResult = data;
      }
    });
    alert.present();
   }

  public AlertaNaoConseguiu(){
      let alert = this.alertCtrl.create({
      title: 'Login Failed',
      message: 'Você não conseguiu fazer login. Tente novamente!',
      buttons: ['Ok']
    });
    alert.present()
   }

   
  }

