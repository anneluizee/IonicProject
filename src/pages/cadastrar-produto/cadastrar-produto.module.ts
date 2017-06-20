import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastrarProdutoPage } from './cadastrar-produto';

@NgModule({
  declarations: [
    CadastrarProdutoPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastrarProdutoPage),
  ],
  exports: [
    CadastrarProdutoPage
  ]
})
export class CadastrarProdutoPageModule {}
