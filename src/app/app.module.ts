import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, NavController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import io from 'socket.io-client';
window["io"] = io;

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { EsqueceuSenhaPage} from "../pages/esqueceu-senha/esqueceu-senha";
import { CadastrarPage } from "../pages/cadastrar/cadastrar"; //para cadastrar usuario
import { CadastrarProdutoPage } from "../pages/cadastrar-produto/cadastrar-produto";
import { ListarProdutosPage } from "../pages/listar-produtos/listar-produtos";

import { BackandService } from '@backand/angular2-sdk';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    EsqueceuSenhaPage,
    CadastrarPage,
    ListarProdutosPage,
    CadastrarProdutoPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    CadastrarPage,
    EsqueceuSenhaPage,
    ListarProdutosPage,
    CadastrarProdutoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BackandService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
