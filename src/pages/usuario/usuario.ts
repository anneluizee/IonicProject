import { ViewChild, OnInit, Component } from '@angular/core';
import { MenuController, LoadingController, AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Device } from '@ionic-native/device';
import { Vibration } from '@ionic-native/vibration';
import { BackandService } from '@backand/angular2-sdk';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-usuario',
  templateUrl: 'usuario.html',
})
export class UsuarioPage implements OnInit{
  @ViewChild(NavParams) nav: NavParams;
  rootPage : any = LoginPage;

  user: any;
  deviceInfo: any;
  ngOnInit() {
  }

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public backand: BackandService,
    private geolocation: Geolocation, 
    private device: Device, 
    public loadingCtrl: LoadingController, 
    private vibration: Vibration,
    public alertCtrl: AlertController,
    public menu: MenuController) {

        this.deviceInfo = {};
        this.user = {};

        this.backand.user.getUserDetails()
        .then(
          (data: any) => {
        this.user = data.data;
        //console.log("USUARIO", data.data);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsuarioPage');
     this.getUser();
  }

  getUser(){
    let alert = this.alertCtrl.create({
      title: 'Erro!',
      subTitle: 'Não conseguimos obter sua localização. Ative o GPS',
      buttons: ['OK']
    });
    let loader = this.loadingCtrl.create({
      content: "Lendo informações do dispositivo...",
    });

    loader.present();

    this.deviceInfo.modelo = this.device.model;
    this.deviceInfo.plataforma = this.device.platform;
    this.deviceInfo.fabricante = this.device.manufacturer;
    this.geolocation.getCurrentPosition()
      .then((data) => {
        this.deviceInfo.latitude = data.coords.latitude;
        this.deviceInfo.longitude = data.coords.longitude;
        let id = this.user.userId
        this.deviceInfo.user = id
        if (this.deviceInfo.id != undefined) {

          this.atualizar(loader);
        } else {

          this.criar(loader);
        }
        
      }).catch((err) => {
        alert.present();
        console.log("erro ao buscar localização");
      });
    loader.dismiss();
  }

criar(loader) {

    let id = this.user.userId
    this.deviceInfo.user = id
    this.backand.object.create("info", this.deviceInfo).then((resp) => {
      loader.dismiss();
    }).catch((err) => {
      console.log(err);
    });
  }

  atualizar(loader) {

    this.backand.object.update("info", this.deviceInfo.id, this.deviceInfo).then((resp) => {
      loader.dismiss();
    }).catch((err) => {
      console.log(err);
    });
  }
 public Sair() {
    let alert = this.alertCtrl.create({
      title: 'Confirmar',
      message: 'Você tem certeza que deseja sair?',
      buttons: [
        {
          text: 'Não',
          role: 'cancelar',
          handler: () => {
            console.log('not clicked');
          }
        },
        {
          text: 'Sair',
          handler: () => {
            console.log('Sair clicked');
            this.backand.signout();
            window.location.reload()
            this.vibration.vibrate(500);
            this.menu.enable(false,'menu');
            //this.navParams.setRoot(LoginPage);
            //console.log("deslogado", this.user);
            
         
          }
        }
      ]
    });
    alert.present();

}
}
