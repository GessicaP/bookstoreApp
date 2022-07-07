import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Livro } from "../livro.model";
import { LivroService } from "../livro.service";

@Component({
  selector: "app-livro-create",
  templateUrl: "./livro-create.component.html",
  styleUrls: ["./livro-create.component.css"],
})
export class LivroCreateComponent implements OnInit {
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
  }

  create(): void {
    this.service.create(this.livro,this.id_cat).subscribe({
      next: (resposta) => {
        this.router.navigate([`categorias/${this.id_cat}/livros`]);
        this.service.mensagem("Livro criado com sucesso!");
      },
      error: (err) => {
        this.router.navigate([`categorias/${this.id_cat}/livros`]);
        this.service.mensagem("Erro ao criar novo livro! Por favor tente mais tarde!");
      },
    });
  }
  cancel(): void {
    this.router.navigate([`categorias/${this.id_cat}/livros`]);
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
