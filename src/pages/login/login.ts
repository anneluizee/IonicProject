import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';

import 'rxjs/Rx'
import { BackandService } from '@backand/angular2-sdk'
import { HomePage } from "../home/home";
import { EsqueceuSenhaPage} from "../esqueceu-senha/esqueceu-senha";


@Component({
  templateUrl: 'login.html',
  selector: 'page-login', 
  
})
export class LoginPage {

  homePage = HomePage;
  esqueceuSenhaPage = EsqueceuSenhaPage;

  username:string = null;
  password:string = null;
  auth_type:string = "N/A";
  is_auth_error:boolean = false;
  auth_status:string = null;
  loggedInUser: string = '';
   testRadioOpen: boolean;
  testRadioResult;
  AlertaString:string=null;
params: Object;
pushPage: any;

  constructor(private backand:BackandService,public alertCtrl: AlertController,public navCtrl: NavController) {

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
   this.navCtrl.setRoot(HomePage); 
   //{
   //   firstPassed: "value 1",
   //   secondPassed: "value 2"
   // })
    
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

