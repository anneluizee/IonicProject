import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';

import 'rxjs/Rx'
import { BackandService } from '@backand/angular2-sdk'

@Component({
  templateUrl: 'home.html',
  selector: 'page-home',
})
export class HomePage {

  constructor(public navCtrl: NavController,public menu: MenuController) {
 this.menu.enable(true,'menu');
  }

}
