import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livro-update',
  templateUrl: './livro-update.component.html',
  styleUrls: ['./livro-update.component.css']
})
export class LivroUpdateComponent implements OnInit {

  id_cat: String = "";

  titulo = new FormControl("", [Validators.minLength(3)]);
  texto = new FormControl("", [Validators.minLength(10)]);
  nome_autor = new FormControl("", [Validators.minLength(3)]);

  livro: Livro ={
    id: '',
    titulo: '',
    nome_autor:'',
    texto: ''
  }
  
  constructor(private service: LivroService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get("id_cat")!;
    this.livro.id = this.route.snapshot.paramMap.get("id")!;
    this.findById()
  }

  update(): void {
    this.service.update(this.livro).subscribe({
      next: (resposta) => {
        this.router.navigate([`categorias/${this.id_cat}/livros`]);
        this.service.mensagem("Livro atualizado com sucesso!");
      },
      error: (err) => {
        this.router.navigate([`categorias/${this.id_cat}/livros`]);
        this.service.mensagem("Erro ao atualizar o livro! Por favor tente mais tarde!");
      },
    });
  
  }
  cancel(): void {
    this.router.navigate([`categorias/${this.id_cat}/livros`]);
  }
  findById():void{
    this.service.findById(this.livro.id!).subscribe((resposta) => {
      this.livro = resposta
    })
  }

  getMessage() {
    if (this.titulo.invalid) {
      return "O TÍTULO deve conter de 3 a 100 caracteres.";
    }

    if (this.texto.invalid) {
      return "O TEXTO deve conter de 10 a 20000000 caracteres.";
    }

    if (this.nome_autor.invalid) {
      return "O NOME DO AUTOR deve conter de 3 a 100 caracteres.";
    }
    return false;
  }

  
}

