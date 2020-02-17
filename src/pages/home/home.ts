
import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) { //injeção de independencia

  }
// navegação da pagina home para categoria

  login(){
     // this.navCtrl.push('CategoriaPage'); // empilhar uma pagina sobre a outra com push
     this.navCtrl.setRoot('CategoriaPage');
  
    }

}
