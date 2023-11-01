import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Contato } from 'src/app/model/entities/Contato';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {
  public nome! : string;
  public telefone! : number;
  public email! : string;
  public genero! : number;
  public imagem : any;

  constructor(private alertController: AlertController,
    private router : Router, private firebase : FirebaseService) { }

  ngOnInit() {
  }

  uploadFile(imagem: any){
    this.imagem = imagem.files;
  }

  cadastrar(){
    if(this.nome && this.telefone){
      let novo : Contato = new Contato(this.nome, this.telefone);
      novo.email = this.email;
      novo.genero = this.genero;
      if(this.imagem){
        this.firebase.uploadImage(this.imagem, novo)
        ?.then(()=> {
          this.router.navigate(["/home"]);
        })
      }else{
        this.firebase.cadastrar(novo)
        .then(() =>  this.router.navigate(["/home"]))
        .catch((error) => {
          console.log(error);
          this.presentAlert("Erro", "Erro ao salvar contato!");
        })
      }
    }else{
      this.presentAlert("Erro", "Nome e Telefone são campos Obrigatórios!");
    }
  }

  async presentAlert(subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header: 'Agenda de Contatos',
      subHeader: subHeader,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
