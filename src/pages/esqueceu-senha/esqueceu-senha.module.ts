import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EsqueceuSenhaPage } from './esqueceu-senha';

@NgModule({
  declarations: [
    EsqueceuSenhaPage,
  ],
  imports: [
    IonicPageModule.forChild(EsqueceuSenhaPage),
  ],
  exports: [
    EsqueceuSenhaPage
  ]
})
export class EsqueceuSenhaPageModule {}
