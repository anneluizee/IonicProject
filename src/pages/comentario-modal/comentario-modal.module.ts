import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComentarioModalPage } from './comentario-modal';

@NgModule({
  declarations: [
    ComentarioModalPage,
  ],
  imports: [
    IonicPageModule.forChild(ComentarioModalPage),
  ],
  exports: [
    ComentarioModalPage
  ]
})
export class ComentarioModalPageModule {}
