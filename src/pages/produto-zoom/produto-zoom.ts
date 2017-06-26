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
    let modal = this.modalCtrl.create(ComentarioModalPage,{id: id});
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
