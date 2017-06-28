import { Component } from '@angular/core';
import { LoadingController, Platform, NavController, NavParams, ViewController } from 'ionic-angular';
import { BackandService } from '@backand/angular2-sdk';
import { ListarProdutosPage } from '../listar-produtos/listar-produtos';

@Component({
  selector: 'page-comentario-modal',
  templateUrl: 'comentario-modal.html',
})
export class ComentarioModalPage {
  produto: any;
  comentario: any;
  comentarios: any;
  myProduto: any;
  descricao: any;

  //peguei o id do produto
  obj: any = this.params.get('id');

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    public backand: BackandService,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController) {

    this.produto = {};
    this.comentarios = [];
    this.myProduto = {};

    if (this.obj != undefined) {
      let loading = this.loadingCtrl.create({
        content: 'Recuperando informações...'
      });
      loading.present();

      this.backand.object.getOne("produto", this.obj).then((resp) => {
        this.produto = resp.data;
        if(this.produto.comentarios==null){
          this.produto.comentarios = [];
        }
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

  }

  cadastrar() {
    let loading = this.loadingCtrl.create({
    content: 'Salvando...'
  });
  loading.present();

  //if(this.comentario.id!=undefined){
   // this.atualizar(loading); //teria que ser algo como identificar o usuário e modificar o comentário dele

  //}else{
    this.criar(loading);
 // }

  }

  criar(loading){

  this.backand.object.create("comentario", {
    descricao: this.produto.comentarios,
    myProduto: this.produto.id
    //user: res.data.userId
  }).then((resp) => {
    this.produto = {};
    loading.dismiss();
    this.navCtrl.setRoot(ListarProdutosPage);
  }).catch((err) => {
    console.log("erroCadastrarComentario: "+err);
  });

}

}