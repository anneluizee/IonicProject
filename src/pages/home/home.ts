import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';

import 'rxjs/Rx'

@Component({
  templateUrl: 'home.html',
  selector: 'page-home',
})
export class HomePage {

  constructor(public navCtrl: NavController,public menu: MenuController) {
 this.menu.enable(true,'menu');
  }

}
