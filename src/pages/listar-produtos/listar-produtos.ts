import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import { BackandService } from '@backand/angular2-sdk';
import { CadastrarProdutoPage } from '../cadastrar-produto/cadastrar-produto';
import { LoadingController,ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-listar-produtos',
  templateUrl: 'listar-produtos.html',
})

export class ListarProdutosPage {
  produtos: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public backand: BackandService,
    public loadingCtrl: LoadingController, public alertCtrl: AlertController, public toast: ToastController) {
  }

  ionViewDidLoad() { //no momento em que a página carrega
    this.listar();
  }

listar() {
    let loader = this.loadingCtrl.create({
      content: "Atualizando lista de produtos..."
    });
    loader.present();

    this.backand.object.getList("produto")
    .then((resp) => {
      this.produtos = resp.data;
      loader.dismiss();

      let toast = this.toast.create({
       message: this.produtos.length +' produtos carregados com sucesso',
       duration: 3000,
       position: 'top'
      });
      toast.present();

    }).catch((err) => {
    });
  }
}
