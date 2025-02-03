import { Component } from '@angular/core';

@Component({
  selector: 'app-conversor-json-csv',
  standalone: false,
  templateUrl: './conversor-json-csv.component.html',
  styles: []
})
export class ConversorJsonParaCsvComponent {
  csvResultado: string = '';
  fileUploaded: boolean = false;

  atualizarCsv(resultado: string) {
    this.csvResultado = resultado;
  }

  onFileUploaded(uploaded: boolean) {
    this.fileUploaded = uploaded;
  }
}
