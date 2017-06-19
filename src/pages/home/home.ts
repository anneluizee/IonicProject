import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import 'rxjs/Rx'
import { BackandService } from '@backand/angular2-sdk'

@Component({
  templateUrl: 'home.html',
  selector: 'page-home',
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

}
