import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';

import { BackandService } from '@backand/angular2-sdk'

@Component({
  template:  `<ion-nav [root]="rootPage"></ion-nav>`
})

export class MyApp {
  rootPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private backand:BackandService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
        backand.init({
        appName: 'buscape',
        signUpToken: '9943944c-3896-45ef-872e-3477476f1401',
        anonymousToken: '0afef5bb-2f84-4f11-9bc5-fca0483ce197',
        runSocket: true,
        mobilePlatform: 'ionic'
      });
      this.rootPage = TabsPage;
    });
  }
}

