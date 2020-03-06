import { Injectable } from '@angular/core';
import { StorageService } from '../storage.service';
import { Cart } from '../../models/cart';
import { ProdutoDTO } from '../../models/produto.dto';

@Injectable()
export class CartService {

    constructor(public storage: StorageService) {
    }

    // metodo para criar o o carrinho e limpa-lo
    createOrClearCart() : Cart {
        let cart: Cart = {items: []};
        this.storage.setCart(cart);
        return cart;
    }

    // metodo responsavel por pega o carrinho
    getCart() : Cart {
        let cart: Cart = this.storage.getCart();
        if (cart == null) {
            cart = this.createOrClearCart();
        }
        return cart;
    }

    addProduto(produto: ProdutoDTO) : Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id);
        if (position == -1) {
            cart.items.push({quantidade: 1, produto: produto});
        }
        this.storage.setCart(cart);
        return cart;
    }

    // remover o item do carrinho
    removeProduto(produto: ProdutoDTO) : Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id);
        if (position != -1) {
            cart.items.splice(position, 1); // se o valor encontrado for diferente de 1 sera removido do carrinho
        }
        this.storage.setCart(cart);
        return cart;
    }

    increaseQuantity(produto: ProdutoDTO) : Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id);
        if (position != -1) {
            cart.items[position].quantidade++; // implementar a quantidade do produto
        }
        this.storage.setCart(cart);
        return cart;
    }

    // metodo responsável pela remoção do itens do carrinho
    decreaseQuantity(produto: ProdutoDTO) : Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id);
        if (position != -1) {
            cart.items[position].quantidade--; 
            if(cart.items[position].quantidade <1){
                cart = this.removeProduto(produto);
            }
        }
        this.storage.setCart(cart);
        return cart;
    }

    // metodo responsavel pela soma do itens adicionados no carrinho
    total(): number{
        let cart = this.getCart();
        let sum = 0;
        for(var i= 0; i < cart.items.length; i++){
            sum += cart.items[i].produto.preco * cart.items[i].quantidade;

        }
        return sum;
    }


}