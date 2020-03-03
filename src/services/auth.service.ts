import { Injectable } from "@angular/core";
import { CredenciaisDTO } from "../models/credencias.dto";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";

@Injectable()
export class AuthService{

    constructor(public http: HttpClient){

    }

    autenticacao(creds : CredenciaisDTO){
      return this.http.post(`${API_CONFIG.baseUrl}/login`, creds,
       {
            observe : 'response',
            responseType: 'text'

       })// realizando a requisição
        
    }
}