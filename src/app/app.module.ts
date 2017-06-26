import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
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
import { ListarEstabelecimentoPage } from '../pages/listar-estabelecimento/listar-estabelecimento';
import { CadastrarEstabelecimentoPage } from '../pages/cadastrar-estabelecimento/cadastrar-estabelecimento';
import { ProdutoZoomPage } from "../pages/produto-zoom/produto-zoom";
import { BackandService } from '@backand/angular2-sdk';
import { ComentarioModalPage } from "../pages/comentario-modal/comentario-modal"; 

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    EsqueceuSenhaPage,
    CadastrarPage,
    ListarProdutosPage,
    CadastrarProdutoPage,
    CadastrarEstabelecimentoPage,
    ListarEstabelecimentoPage,
    ProdutoZoomPage,
    ComentarioModalPage
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
    CadastrarProdutoPage,
    ListarEstabelecimentoPage,
    CadastrarEstabelecimentoPage,
    ProdutoZoomPage,
    ComentarioModalPage
    ],
  providers: [
    StatusBar,
    SplashScreen,
    BackandService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
