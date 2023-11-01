import { Injectable } from '@angular/core';
import { Contato } from '../entities/Contato';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {
  public listaDeContatos : Contato[] = [];

  constructor() {
    let c1 : Contato = new Contato("Carlos Eduardo", 991094415);
    c1.email = "ciatskiu@uniguairaca.edu.br";
    let c2 : Contato = new Contato("Jotair", 991094400);
    let c3 : Contato = new Contato("Matheus Souto", 991091112);
    let c4 : Contato = new Contato("Antonio Zampier", 991091234);
    this.listaDeContatos.push(c1);
    this.listaDeContatos.push(c2);
    this.listaDeContatos.push(c3);
    this.listaDeContatos.push(c4);
   }

   cadastrar(contato : Contato){
    this.listaDeContatos.push(contato);
   }

   obterTodos() : Contato[]{
    return this.listaDeContatos;
   }

   obterPorIndice(indice : number) : Contato{
    return this.listaDeContatos[indice];
   }

   atualizar(indice : number, novo : Contato){
    this.listaDeContatos[indice] = novo;
   }

   deletar(indice : number){
    this.listaDeContatos.splice(indice, 1);
   }

}
