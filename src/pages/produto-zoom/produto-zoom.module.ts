import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProdutoZoomPage } from './produto-zoom';

@NgModule({
  declarations: [
    ProdutoZoomPage,
  ],
  imports: [
    IonicPageModule.forChild(ProdutoZoomPage),
  ],
  exports: [
    ProdutoZoomPage
  ]
})
export class ProdutoZoomPageModule {}
