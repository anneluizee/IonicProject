import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { BackandService } from '@backand/angular2-sdk';
import { ListarProdutosPage } from '../pages/listar-produtos/listar-produtos';


@Component({
  templateUrl: 'app.html',
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage : any = LoginPage; 

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, 
  public backand:BackandService) {

    this.initializeApp();
     this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Lista de Produtos', component: ListarProdutosPage }
    ];

        backand.init({
        appName: 'buscape',
        signUpToken: '9943944c-3896-45ef-872e-3477476f1401',
        anonymousToken: '0afef5bb-2f84-4f11-9bc5-fca0483ce197',
        runSocket: true,
        mobilePlatform: 'ionic'
      });
    
   
   
  }

  initializeApp(){
      this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

   });
}

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  
}