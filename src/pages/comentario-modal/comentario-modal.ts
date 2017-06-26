import { Component } from '@angular/core';
import { LoadingController, Platform, NavController, NavParams, ViewController } from 'ionic-angular';
import { BackandService } from '@backand/angular2-sdk';

@Component({
  selector: 'page-comentario-modal',
  templateUrl: 'comentario-modal.html',
})
export class ComentarioModalPage {
  produto: any;


  obj:any = this.params.get('id');

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    public backand: BackandService,
    public loadingCtrl: LoadingController) {
   
 
    if (this.obj != undefined) {
      let loading = this.loadingCtrl.create({
        content: 'Recuperando informações...'
      });
      loading.present();

      this.backand.object.getOne("produto", this.obj).then((resp) => {
        this.produto = resp.data;
        loading.dismiss();
      }).catch((errp) => {
      });
    }
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ComentarioModalPage');
   // this.carregar();
  }
  carregar() {

    this.backand.object.getOne("produto", this.params.get('id')).then((resp) => {
      // obtem o objeto e adiciona na variavel produto
      this.produto = resp.data;
      //dispensa a mensagem

    }).catch((errp) => {
    });

  }
}
