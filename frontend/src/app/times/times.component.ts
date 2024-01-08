import { Component, OnInit } from '@angular/core';
import { CommonModule} from '@angular/common';
import { TimesService } from '../services/times.service';

interface Time {
  id: number;
  name: string;
}

@Component({
  selector: 'app-times',
  templateUrl: './times.component.html',
  styleUrls: ['./times.component.scss']
})
export class TimesComponent implements OnInit {
  times: Time[] = [];
  timesSelecionados: Time[] = [];
  campeonato_id!: number;
  resultado: any;
  message: string = '';
  menosde8: boolean = false;
  maisde8: boolean = false;
  gerandoCampeonato: boolean = false;

  quartas: any[]= [];
  semis: any[]= [];
  terceiro: any[]= [];
  final: any[]= [];
  



  constructor(private timesService: TimesService) { }

  ngOnInit(): void {
    this.mostraTimes();
    
  }

  mostraTimes(){
    this.timesService.listaTimes().subscribe(
      (data: any) => {
      this.times = data;
    },
    (error) => {
      console.error('Erro ao buscar os times:', error);
    });
  }

  toggleTimeSelecionado(time: Time): void {
    const index = this.timesSelecionados.findIndex(t => t.id === time.id);

    if (index !== -1) {
      this.timesSelecionados.splice(index, 1);
    } else {
      if (this.timesSelecionados.length < 8) {
        this.maisde8 = false;
        this.timesSelecionados.push(time);
      }else{
        console.warn('Você já selecionou 8 times.');
        this.message = 'Você já selecionou 8 times.';
        this.maisde8 = true;
        console.log(this.timesSelecionados);
        this.menosde8 = false;
      }
    }
  }



  
  async confirmarSelecao(): Promise<void> {
    try{
      if(this.timesSelecionados.length !== 8){
       // console.warn('Selecione exatamente 8 times.');
        this.menosde8 = true;
        this.maisde8 = false;
        this.message = 'Você precisa selecionar 8 times.';
        return;
      }
      this.gerandoCampeonato = true;
      this.menosde8 = false;
      this.maisde8 = false;
      const criaCampeonato: any = await this.timesService.criaCampeonato().toPromise();
      this.campeonato_id = criaCampeonato.id;
      console.log(`Campeonato ${this.campeonato_id} criado com sucesso!`);

      const comecaCampeonato = this.timesSelecionados.map(time =>{
        return this.timesService.comecaCampeonato(this.campeonato_id, time.id).toPromise();
      });
      await Promise.all(comecaCampeonato);


      console.log('Times Embaralhados + ', this.embaralharTimes(this.timesSelecionados));
      const fase1: any = await this.iniciarFase(1, this.embaralharTimes(this.timesSelecionados));
      console.log('Quartas de Final');
      
      const fase2: any = await this.iniciarFase(2, fase1.vencedores);
      console.log('Semifinal');
      

      const fase4: any = await this.iniciarFase(4, fase2.perdedores);
      console.log('Terceiro Lugar');
      

      const fase3: any = await this.iniciarFase(3, fase2.vencedores);
      console.log('Final');
      

      const resultado: any = await this.timesService.resultadoCampeonato(this.campeonato_id).toPromise().then(
        (resultado) =>{
          this.resultado = resultado;
          console.log('Resultado do campeonato', resultado);
        }
      );

      this.quartas = this.resultado.map((partida: any) => partida.fase === 'Quartas de Final');
      this.semis = this.resultado.map((partida: any) => partida.fase === 'Semifinal');
      this.terceiro = this.resultado.map((partida: any) => partida.fase === 'Terceiro Lugar');
      this.final = this.resultado.map((partida: any) => partida.fase === 'Final');
      console.log('Resultado do campeonato', resultado);
        this.gerandoCampeonato = false;
    } catch (error) {
      console.error('Erro ao criar o campeonato:', error);
    }
  }

  embaralharTimes(timesSelecionados: any[]) {
    const timesEmbaralhados = JSON.parse(JSON.stringify(timesSelecionados));

    for (let i = timesEmbaralhados.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [timesEmbaralhados[i], timesEmbaralhados[j]] = [timesEmbaralhados[j], timesEmbaralhados[i]];
    }

    return timesEmbaralhados;
  }

  async iniciarFase(faseId: number, times: any[]): Promise<any> {
    const partidas: any[] = [];

    // Cria partidas para a fase
    for (let i = 0; i < times.length; i += 2) {
        const timeCasa = times[i];
        const timeVisitante = times[i + 1];
        const partida = await (this.timesService.simulaPartida(this.campeonato_id, timeCasa.id, timeVisitante.id, faseId)).toPromise();
        partidas.push(partida);
    }

    // Aguarda todas as partidas da fase serem concluídas
    await Promise.all(partidas.map( async (partida) => await partida));
    console.log('Partidas da fase ' + faseId + ' concluídas.');
    //console.log('Partidas', partidas);

    const vencedoresPromise = partidas.map((partida: any) => this.timesService.buscaTime(partida.vencedor_id).toPromise());
    const perdedoresPromise = partidas.map((partida: any) => this.timesService.buscaTime(partida.perdedor_id).toPromise());

    const vencedores = await Promise.all(vencedoresPromise);
    const perdedores = await Promise.all(perdedoresPromise);
    
    console.log('Vencedores', vencedores);
    console.log('Perdedores', perdedores);
    return {partidas, vencedores, perdedores};
  }

}
