import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-download',
  standalone: false,
  templateUrl: './download.component.html',
  styles: []
})
export class DownloadComponent {
  @Input() csvOutput: string = '';

  fazerDownload() {
    const blob = new Blob([this.csvOutput], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'output.csv';
    link.click();
    window.URL.revokeObjectURL(url);
  }

  copiarTexto() {
    if (!this.csvOutput) return;

    const textArea = document.createElement('textarea');
    textArea.value = this.csvOutput;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);

    alert('Texto copiado para a área de transferência!');
  }
}
