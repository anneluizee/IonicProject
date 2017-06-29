import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController,ToastController} from 'ionic-angular';
import { BackandService } from '@backand/angular2-sdk';
import { CadastrarEstabelecimentoPage } from '../cadastrar-estabelecimento/cadastrar-estabelecimento';

@IonicPage()
@Component({
  selector: 'page-listar-estabelecimento',
  templateUrl: 'listar-estabelecimento.html',
})

export class ListarEstabelecimentoPage {
  estabelecimentos: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public backand: BackandService,
    public loadingCtrl: LoadingController, public alertCtrl: AlertController, public toast: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListarEstabelecimentoPage');
    this.listar();
  }

  listar() {
    let loader = this.loadingCtrl.create({
      content: "Atualizando lista de produtos..."
    });
    loader.present();

    this.backand.object.getList("estabelecimento").then((resp) => {
      this.estabelecimentos = resp.data;
      loader.dismiss();

    /*  let toast = this.toast.create({
        message: this.estabelecimentos.length +' estabelecimentos carregados com sucesso',
        duration: 3000,
        position: 'top'
      });
      toast.present();*/
    }).catch((err) => {
    });
  }

editar(e){
  this.navCtrl.push(CadastrarEstabelecimentoPage, { id: e.id});
}

cadastrar(){
  this.navCtrl.push(CadastrarEstabelecimentoPage);
}

excluir(e){
  let confirm = this.alertCtrl.create({
    title: 'Excluir estabelecimento',
    message: 'Deseja realmente excluir o estabelecimento?',
    buttons: [
      {
        text: 'Não',
        handler: () => {
          }
      },
      {
        text: 'Sim',
        handler: () => {
          let loading = this.loadingCtrl.create({
            content: 'Excluindo...'
          });
          loading.present();
          this.backand.object.remove("estabelecimento", e.id).then((resp) => {
            let toast = this.toast.create({
              message: 'Estabelecimento excluído com sucesso!',
              duration: 2000
            });
            toast.present();
            loading.dismiss();
            this.listar();
          }).catch((err) => {
          });
        }
      }
    ]
  });
  confirm.present();
}

}
