import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListarEstabelecimentoPage } from './listar-estabelecimento';

@NgModule({
  declarations: [
    ListarEstabelecimentoPage,
  ],
  imports: [
    IonicPageModule.forChild(ListarEstabelecimentoPage),
  ],
  exports: [
    ListarEstabelecimentoPage
  ]
})
export class ListarEstabelecimentoPageModule {}
