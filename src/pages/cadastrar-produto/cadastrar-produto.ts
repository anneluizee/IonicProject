import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { BackandService } from '@backand/angular2-sdk';
import { ListarProdutosPage } from '../listar-produtos/listar-produtos';

@IonicPage()
@Component({
  selector: 'page-cadastrar-produto',
  templateUrl: 'cadastrar-produto.html',
})
export class CadastrarProdutoPage {
  produto: any;
  estabelecimentos: any;
  nome: any;
  preco: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public backand: BackandService,
    public loadingCtrl: LoadingController) {

    this.produto = {};
    this.preco = {};
    this.produto.precos = {};
    this.estabelecimentos = {};
    this.estabelecimentos.nome = {};

    let id = this.navParams.get("id");

    if (id != undefined) {
      this.backand.object.getOne("produto", id).
      then((resp) => {
        this.produto = resp.data;
      }).catch((errp) => {
      });

      this.backand.object.getOne("Estabelecimento",{myEstabelecimento:id}).
      then((resp) => {
      this.estabelecimentos = resp.data;
       }).catch((errp) => {
  });

    }
      console.log("est:"+this.estabelecimentos);
  }

  cadastrar() {
    //let loading = this.loadingCtrl.create({
      //content: 'Salvando...'
    //});
    //loading.present();

    if (this.produto.id != undefined) {
      this.atualizar();
    } else {
      this.criar();
    }
  }

  criar() {
    this.backand.object.create("produto", this.produto).then((resp) => {
     // loading.dismiss();
      this.navCtrl.setRoot(ListarProdutosPage);
    }).catch((err) => {
      console.log(err);
    });

    this.backand.object.create("Estabelecimento",
    {myEstabelecimento: this.produto.id}).then((resp) => {
     // loading.dismiss();
      this.navCtrl.setRoot(ListarProdutosPage);
    }).catch((err) => {
      console.log(err);
    });

}

  atualizar() {
    this.backand.object.update("produto", this.produto.id, this.produto).then((resp) => {
     // loading.dismiss();
      this.navCtrl.setRoot(ListarProdutosPage);
    }).catch((err) => {
      console.log(err);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastrarProdutoPage');
  }

}
