import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListarProdutosPage } from './listar-produtos';

@NgModule({
  declarations: [
    ListarProdutosPage,
  ],
  imports: [
    IonicPageModule.forChild(ListarProdutosPage),
  ],
  exports: [
    ListarProdutosPage
  ]
})
export class ListarProdutosPageModule {}
