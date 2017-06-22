import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastrarEstabelecimentoPage } from './cadastrar-estabelecimento';

@NgModule({
  declarations: [
    CadastrarEstabelecimentoPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastrarEstabelecimentoPage),
  ],
  exports: [
    CadastrarEstabelecimentoPage
  ]
})
export class CadastrarEstabelecimentoPageModule {}
