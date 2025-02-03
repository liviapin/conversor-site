import {  NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { RouterModule } from "@angular/router";
import { ConversorModule } from "./conversor/conversor.module";

@NgModule({
    imports: [
        RouterModule,
        ConversorModule,
        AppComponent,
    ],
      bootstrap: [AppComponent],
    })
    export class AppModule { }