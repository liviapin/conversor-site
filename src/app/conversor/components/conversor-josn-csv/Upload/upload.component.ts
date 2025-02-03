import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-upload',
  standalone: false,
  templateUrl: './upload.component.html',
  styles: []
})
export class UploadComponent {
  @Output() fileUploaded = new EventEmitter<boolean>();
  jsonInput: string = '';

  onFileChange(event: any) {
    const file = event.target.files[0];
  
    if (file) {
      const reader = new FileReader();
      
      reader.onload = () => {
        try {
          const jsonContent = JSON.parse(reader.result as string);
          this.jsonInput = JSON.stringify(jsonContent);
          console.log('JSON Carregado:', this.jsonInput);
          this.fileUploaded.emit(true);
        } catch (error) {
          console.error("Erro ao parsear o arquivo JSON", error);
          this.fileUploaded.emit(false);
        }
      };
  
      reader.readAsText(file);
    }
  }
}
