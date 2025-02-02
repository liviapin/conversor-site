import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppModule } from './app.module';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    AppModule,
  ],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'conversor-app';
}
