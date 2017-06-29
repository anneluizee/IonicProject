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

  constructor(public navCtrl: NavController, public navParams: NavParams, public backand: BackandService,
    public loadingCtrl: LoadingController) {

    this.produto = {};
    this.estabelecimentos = {};

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
      });

      this.backand.object.getList("estabelecimento").then((resp) => {
      this.estabelecimentos = resp.data;
      
  });
    }
  }

  cadastrar() {
    let loading = this.loadingCtrl.create({
      content: 'Salvando...'
    });
    loading.present();

    if (this.produto.id != undefined) {
      this.atualizar(loading);
    } else {
      this.criar(loading);
    }
  }

  criar(loading) {
    this.backand.object.create("produto", this.produto).then((resp) => {
      loading.dismiss();
      this.navCtrl.setRoot(ListarProdutosPage);
    }).catch((err) => {
      console.log(err);
    });

    this.backand.object.getList("estabelecimento").then((resp) => {
      this.estabelecimentos = resp.data;
      
  });
}

  atualizar(loading) {
    this.backand.object.update("produto", this.produto.id, this.produto).then((resp) => {
      loading.dismiss();
      this.navCtrl.setRoot(ListarProdutosPage);
    }).catch((err) => {
      console.log(err);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastrarProdutoPage');
  }

}
