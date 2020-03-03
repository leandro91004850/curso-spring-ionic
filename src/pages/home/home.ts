
import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';
import { CredenciaisDTO } from '../../models/credencias.dto';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  creds : CredenciaisDTO ={
    email: "",
    senha: ""
  };

  constructor(public navCtrl: NavController, public menu: MenuController) { //injeção de independencia

  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false); // quando for aberta a pagina inicial será desabilitado o menu

    }

    //https://ionicframework.com/docs/components
    ionViewDidLeave() { // ao entra na page seguinte o menu sera abilitado novamente 
    this.menu.swipeEnable(true);

    }

// navegação da pagina home para categoria

  login(){
     // this.navCtrl.push('CategoriaPage'); // empilhar uma pagina sobre a outra com push
     console.log(this.creds);
     this.navCtrl.setRoot('CategoriaPage');
  
    }

}
