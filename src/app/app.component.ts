import { Component, ViewChild } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { BackandService } from '@backand/angular2-sdk';
import { ListarProdutosPage } from '../pages/listar-produtos/listar-produtos';


@Component({
  templateUrl: 'app.html'
  //template: `<ion-nav [root]="rootPage"></ion-nav>` 
})

export class MyApp {
  @ViewChild(NavController) nav: NavController
  rootPage : any =LoginPage; 

pages: Array<{title: string, component: any}>

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public backand:BackandService) {
    this.initializeApp();
   
        backand.init({
        appName: 'buscape',
        signUpToken: '9943944c-3896-45ef-872e-3477476f1401',
        anonymousToken: '0afef5bb-2f84-4f11-9bc5-fca0483ce197',
        runSocket: true,
        mobilePlatform: 'ionic'
      });
    
     this.pages = [
      { title: 'Home', component: HomePage },
       { title: 'Lista', component: ListarProdutosPage }     
    ];
   
  }

  initializeApp(){
      this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

   });
}

}