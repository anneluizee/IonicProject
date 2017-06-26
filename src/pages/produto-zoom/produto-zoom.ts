import { Component } from '@angular/core';
import { Platform, NavController, NavParams, LoadingController, ToastController, ModalController, ViewController } from 'ionic-angular';
import { BackandService } from '@backand/angular2-sdk';
import { ComentarioModalPage } from "../comentario-modal/comentario-modal";

@Component({
  selector: 'page-produto-zoom',
  templateUrl: 'produto-zoom.html',
})
export class ProdutoZoomPage {
  produto: any;
  identificador: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public backand: BackandService,
    public loadingCtrl: LoadingController,
    public toast: ToastController,
    public modalCtrl: ModalController) {

    this.produto = {};
    let id = this.navParams.get("id");

    if (id != undefined) {
      let loading = this.loadingCtrl.create({
        content: 'Recuperando informações...'
      });
      loading.present();

      this.backand.object.getOne("produto", id).then((resp) => {
        this.produto = resp.data;
        loading.dismiss();
      }).catch((errp) => {
      })  ;
    }

    //identificou o id do produto, então carrega os comentários do produto
    //mas verifica se tem comentários já cadastrados
    //aparece o botão de criar o comentário


  }

  openModal(id) {
    console.log(id)
    let identificador = {id: id};
    let modal = this.modalCtrl.create(ComentarioModalPage,identificador);
    modal.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProdutoZoomPage');
    this.listar();
  }

  listar() {
    let loader = this.loadingCtrl.create({
      content: "Carregando..."
    });
    loader.present();

    this.backand.object.getOne("produto", this.navParams.get('id')).then((resp) => {
      // obtem o objeto e adiciona na variavel produto
      this.produto = resp.data;
      //dispensa a mensagem
      loader.dismiss();
    }).catch((errp) => {
    });


  }
}

/*@Component(
  {
    template: `
<ion-header>
  <ion-toolbar color="primary">
    <ion-title>
      Comentário
    </ion-title>
     <ion-buttons start>
      <button ion-button (click)="dismiss()">
        <span ion-text color="primary" showWhen="ios">Cancel</span>
        <ion-icon name="md-close" showWhen="android, windows"></ion-icon>
      </button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>

<ion-content>
   <ion-item>
     <ion-label stacked>Nome</ion-label>
    <ion-label> {{produto.nome}} </ion-label>
    <p> teste</p>
  </ion-item>
</ion-content>
`
  })

class ModalContentPage {
  produto: any;

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    public backand: BackandService,
    public loadingCtrl: LoadingController) {
    console.log("teste");
    this.produto = {};
    let id = this.params.get("id");
     console.log("oi: "+id);
    if (id != undefined) {
      let loading = this.loadingCtrl.create({
        content: 'Recuperando informações...'
      });
      loading.present();

      this.backand.object.getOne("produto", id).then((resp) => {
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
    console.log('ionViewDidLoad ProdutoZoomPage');
    this.carregar();
  }

  carregar() {

    this.backand.object.getOne("produto", this.params.get('id')).then((resp) => {
      // obtem o objeto e adiciona na variavel produto
      this.produto = resp.data;
      //dispensa a mensagem

    }).catch((errp) => {
    });

  }

}*/
