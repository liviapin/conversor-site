import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConversorJsonService } from '../../../service/conversor/conversor-json.service';

@Component({
  selector: 'app-json-editor',
  standalone: false,
  templateUrl: './json-editor.component.html',
  styleUrls: ['./json-editor.component.css']
})
export class JsonEditorComponent {
  @Output() csvGerado = new EventEmitter<string>();
  @Input() fileUploaded: boolean = false;

  jsonInput: string = '';
  csvOutput: string = '';
  errorMessage: string = '';

  constructor(
    private conversorJsonService: ConversorJsonService,
  ) {}

  onFileUploaded(uploaded: boolean, jsonContent: string) {
    if (uploaded) {
      this.jsonInput = jsonContent;
    } else {
      this.errorMessage = 'Erro ao carregar o arquivo JSON.';
    }
  }

  converter() {
    if (!this.jsonInput.trim() && !this.fileUploaded) {
      this.errorMessage = 'O JSON não pode estar vazio.';
      return;
    }
  
    try {
      JSON.parse(this.jsonInput);
      this.errorMessage = ''; 
    } catch (error) {
      this.errorMessage = 'JSON inválido. Verifique o formato e tente novamente.';
      return;
    }
  
    this.conversorJsonService.converterJsonParaCsv(this.jsonInput).subscribe({
      next: (response: Blob) => {
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
    try {
      const parsedJson = JSON.parse(input.value);
      this.jsonInput = JSON.stringify(parsedJson);
      this.errorMessage = '';
    } catch (error) {
      this.errorMessage = 'JSON inválido. Verifique o formato e tente novamente.';
      this.jsonInput = input.value;
    }
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
