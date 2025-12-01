import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController, AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage {
  tarefas: any[] = []; // array tarefas (nome, feito (verdadeiro/falso))

  constructor(private alertCtrl: AlertController, private toast: ToastController, private actionSheetCtrl: ActionSheetController) {
    let tarefasJson = localStorage.getItem('tarefaDb');
    if (tarefasJson != null) {
      this.tarefas = JSON.parse(tarefasJson);
    }
    // console.log(this.tarefas);
  }
  async addTarefa() {
    const alerta = await this.alertCtrl.create({
      header: 'O que você precisa fazer?',
      inputs: [
        { name: 'txtnome', type: 'text', placeholder: 'Digite aqui...' }
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel', cssClass: 'light', handler: () => { console.log('Tarefa não adicionada'); } },
        {
          text: 'Salvar', handler: (form: { txtnome: any; }) => {
            this.add(form.txtnome);
          }
        }
      ]
    });
    alerta.present();
  }
  async add(nova: any) {
    if (nova.trim().length < 1) {
      const toast = await this.toast.create({
        message: 'Informe o que você precisa fazer!',
        duration: 2000,
        position: 'middle',
        color: 'warning'
      });
      toast.present();
    } else {
      let novaTarefa = { nome: nova, feito: false };
      this.tarefas.push(novaTarefa);
      this.atualizaLocalStorage(); // armazenando no celular
      const toast = await this.toast.create({
        message: 'Tarefa adicionada com sucesso!',
        duration: 2000,
        position: 'middle',
        color: 'success'
      });
      toast.present();
    }
  }
  atualizaLocalStorage() {
    localStorage.setItem('tarefaDb', JSON.stringify(this.tarefas));
  }
  async abrirOpcoes(tarefa: any) {
    const actsheet = await this.actionSheetCtrl.create({
      header: 'Escolha uma ação',
      buttons: [
        {
          text: tarefa.feito ? 'Desmarcar como feito' : 'Marcar como feito',
          icon: tarefa.feito ? 'checkmark-circle-outline' : 'checkmark-done-circle-outline',
          handler: () => {
            tarefa.feito = !tarefa.feito;
            this.atualizaLocalStorage();
          }
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Ação cancelada');
          }
        }

      ]
    });
    actsheet.present();
  }
  excluir(tarefa: any) {
    this.tarefas = this.tarefas.filter(t => t != tarefa);
    this.atualizaLocalStorage();
  }
}
