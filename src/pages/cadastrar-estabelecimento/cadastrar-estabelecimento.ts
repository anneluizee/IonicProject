import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { BackandService } from '@backand/angular2-sdk';
import { ListarEstabelecimentoPage } from '../listar-estabelecimento/listar-estabelecimento';

@IonicPage()
@Component({
  selector: 'page-cadastrar-estabelecimento',
  templateUrl: 'cadastrar-estabelecimento.html',
})
export class CadastrarEstabelecimentoPage {
  estabelecimento: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public backand: BackandService, public loadingCtrl: LoadingController) {
    this.estabelecimento = {};
    let id = this.navParams.get("id");
    
    if(id!=undefined){
      let loading = this.loadingCtrl.create({
        content: 'Recuperando informações...'
      });
      loading.present();
      this.backand.object.getOne("estabelecimento",id).then((resp)=>{
        this.estabelecimento = resp.data;
        loading.dismiss();
      }).catch((errp)=>{
      });
    }
  }

cadastrar(){
  let loading = this.loadingCtrl.create({
    content: 'Salvando...'
  });
  loading.present();

  if(this.estabelecimento.id!=undefined){
    this.atualizar(loading);
  }else{
    this.criar(loading);
  }
}

criar(loading){
  this.backand.object.create("estabelecimento", this.estabelecimento).then((resp) => {
    loading.dismiss();
    this.navCtrl.setRoot(ListarEstabelecimentoPage);
  }).catch((err) => {
    console.log("erroCadastrarEstabelecimento: "+err);
  });
}

atualizar(loading){
  this.backand.object.update("estabelecimento",this.estabelecimento.id, this.estabelecimento).then((resp) => {
    loading.dismiss();
    this.navCtrl.setRoot(ListarEstabelecimentoPage);
  }).catch((err) => {
    console.log(err);
  });
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastrarEstabelecimentoPage');
  }

}
