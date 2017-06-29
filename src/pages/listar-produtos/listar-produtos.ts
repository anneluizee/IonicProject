import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController,ToastController} from 'ionic-angular';
import { BackandService } from '@backand/angular2-sdk';
import { CadastrarProdutoPage } from '../cadastrar-produto/cadastrar-produto';
import { ProdutoZoomPage } from '../produto-zoom/produto-zoom';

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

   /*   let toast = this.toast.create({
       message: this.produtos.length +' produtos carregados com sucesso',
       duration: 3000,
       position: 'top'
      });
      toast.present();*/

    }).catch((err) => {
    });
  }

editar(p) {
    this.navCtrl.push(CadastrarProdutoPage, { id: p.id });
  }

  cadastrar(){
    this.navCtrl.push(CadastrarProdutoPage);
  }

  excluir(p) {
    let confirm = this.alertCtrl.create({
      title: 'Excluir produto',
      message: 'Deseja realmente excluir o produto?',
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
            this.backand.object.remove("produto", p.id).then((resp) => {
              let toast = this.toast.create({
                message: 'Produto excuído com sucesso!',
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

  produtoClick(p){
    console.log('rotear para zoomProduto');
    this.navCtrl.push(ProdutoZoomPage, { id: p.id}); //tem que passar os parametros do produto
  }


}
