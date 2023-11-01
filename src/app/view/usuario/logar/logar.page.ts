import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Alert } from 'src/app/common/alert';
import { AuthService } from 'src/app/model/services/auth.service';

@Component({
  selector: 'app-logar',
  templateUrl: './logar.page.html',
  styleUrls: ['./logar.page.scss'],
})
export class LogarPage implements OnInit {
logar!: FormGroup;


  constructor(private router: Router,
    private alert : Alert,
    private auth: AuthService,
    private builder: FormBuilder) {
      this.logar = new FormGroup({
        email: new FormControl(''),
        senha: new FormControl('')
      });
     }

  ngOnInit() {
    this.logar = this.builder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get errorControl(){
    return this.logar.controls;
  }

  submitForm(){
    if(!this.logar.valid){
      this.alert.presentAlert("OK", "Erro ao Logar!");
    }else{
      this.login();
    }
  }

  logarComGmail(){}

  irParaRegistrar(){
    this.router.navigate(["/registrar"]);
  }

  private login(){
    this.auth.logar(this.logar.value['email'], this.logar.value['senha'])
    .then((res) =>{
      this.alert.presentAlert("OK", "Seja Bem Vindo!");
      this.router.navigate(['/home']);})
      .catch((error) =>{
        this.alert.presentAlert("Erro", "Erro ao cadastrar!");
        console.log(error);
      })
    }
  }

