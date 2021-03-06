import { Injectable } from "@angular/core";
import { CredenciaisDTO } from "../models/credencias.dto";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { StorageService } from "./storage.service";
import { LocalUser } from "../models/local_user";
import {JwtHelper} from "angular2-jwt";
import { CartService } from "./domain/cart.service";

@Injectable()
export class AuthService{

      jwtHelper: JwtHelper = new JwtHelper();

     constructor(
       public http: HttpClient, 
       public storage: StorageService,
       public cartService: CartService) {
     
    }

    autenticacao(creds : CredenciaisDTO){
      return this.http.post(`${API_CONFIG.baseUrl}/login`, creds,
       {
            observe : 'response',
            responseType: 'text'

       });// realizando a requisição
        
    }

    // caso tenha duvido, conferir no back end da API
    refreshToken(){
      return this.http.post(
        `${API_CONFIG.baseUrl}/auth/refresh_token`, 
          {},
       {
            observe : 'response',
            responseType: 'text'

       });// realizando a requisição
        
    }

    successfulLogin(authorizationValue : string) {
      let tok = authorizationValue.substring(7);
      let user : LocalUser = {
          token: tok,
          email: this.jwtHelper.decodeToken(tok).sub
      };
      this.storage.setLocalUser(user);
      this.cartService.createOrClearCart(); // reponsável por limpa o carrinho quando for feito login novamente
    }

    logout() {
        this.storage.setLocalUser(null);
    }
    
}