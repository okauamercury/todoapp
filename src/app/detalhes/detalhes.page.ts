import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  styleUrls: ['./detalhes.page.scss'],
  standalone: false
})
export class DetalhesPage implements OnInit {
voltar() {
throw new Error('Method not implemented.');
}
  tarefa: any; // está variavél armezenará a tarefa recebida pela rota

  constructor(
    private router: Router,
    private navCtrl: NavController,
  ) { 
    const nav = this.router.getCurrentNavigation();
    // verifica se o estado da navegação existe e contém o objeto 'tarefa'
    if(nav?.extras.state && nav.extras.state['tarefaSelecionada']){
      this.tarefa = nav.extras.state['tarefaSelecionada'];

    }else{
      // opcionalmente volta para a URL de origem
      this.navCtrl.back();
    }
  }

  ngOnInit() {
    console.log('Tarefa recebida:', this.tarefa);
  }



  // exemplo de função para consumir os dados que vieram pelo objeto tarefa

  getTitulo(){
    return this.tarefa ? this.tarefa.titulo : 'Nenhuma tarefa encontrada';
  }
}
