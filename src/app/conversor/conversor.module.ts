import { CommonModule } from "@angular/common";
import { CsvPreviewComponent } from "./components/conversor-josn-csv/CsvPreview/csv-preview.component";
import { DownloadComponent } from "./components/conversor-josn-csv/Download/donwload.component";
import { JsonEditorComponent } from "./components/conversor-josn-csv/JsonEditor/json-editor.component";
import { UploadComponent } from "./components/conversor-josn-csv/Upload/upload.component";
import { ConversorJsonParaCsvListagemComponent } from "./paginas/conversor-json-csv-listagem/conversor-json-csv-listagem.component";
import { NgModule } from "@angular/core";
import { ConversorJsonParaCsvComponent } from "./components/conversor-josn-csv/conversor-json-csv.component";

@NgModule({
  declarations: [
    CsvPreviewComponent,
    DownloadComponent,
    JsonEditorComponent,
    UploadComponent,
    ConversorJsonParaCsvComponent,
    ConversorJsonParaCsvListagemComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ConversorModule {}
