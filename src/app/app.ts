import { Component, signal } from '@angular/core';
import { Farm } from './components/farm/farm';

@Component({
  selector: 'app-root',
  imports: [Farm],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('gbe-visor-test');
}
