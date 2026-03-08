import { Component, Input } from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loader',
  imports: [
   MatProgressSpinnerModule 
  ],
  templateUrl: './loader.html',
  styleUrl: './loader.scss',
})
export class Loader {
  @Input() color: string = 'var(--mat-sys-primary)'
  @Input() diameter: number = 160;
  @Input() stroke: number = 8;
}
