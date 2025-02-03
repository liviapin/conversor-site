import { Component, EventEmitter, Output } from '@angular/core';
import { ConversorJsonService } from '../../../service/conversor/conversor-json.service';

@Component({
  selector: 'app-json-editor',
  standalone: false,
  templateUrl: './json-editor.component.html',
  styleUrls: ['./json-editor.component.css']
})
export class JsonEditorComponent {
  @Output() csvGerado = new EventEmitter<string>();

  jsonInput: string = '';
  csvOutput: string = '';
  errorMessage: string = '';

  constructor(
    private conversorJsonService: ConversorJsonService,
  ) {}

  converter() {
    if (!this.jsonInput.trim()) {
      this.errorMessage = 'O JSON não pode estar vazio.';
      return;
    }

    this.errorMessage = '';
    this.conversorJsonService.converterJsonParaCsv(this.jsonInput).subscribe({
      next: (response: Blob) => {
        console.log("sucesso");
        this.exibirCsv(response);
      },
      error: () => {
        console.log("Erro ao converter JSON para CSV.");
      },
    });
  }
  
  exibirCsv(csvBlob: Blob) {
    const reader = new FileReader();
    reader.onload = () => {
      this.csvOutput = reader.result as string;
      this.csvGerado.emit(this.csvOutput);
    };
    reader.readAsText(csvBlob);
  }

  onInputChange(event: Event): void {
    const input = event.target as HTMLTextAreaElement;
    this.jsonInput = JSON.stringify(JSON.parse(input.value));
  }

  downloadCsv() {
    const blob = new Blob([this.csvOutput], { type: 'text/csv' });
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = 'output.csv';
    link.click();
    window.URL.revokeObjectURL(downloadUrl);
  }
  limpar() {
    const inputElement = document.getElementById('jsonInput') as HTMLTextAreaElement;
    if (inputElement) {
      inputElement.value = '';
    }
    this.jsonInput = '';
    this.errorMessage = '';
    this.csvGerado.emit('');
  }
}
