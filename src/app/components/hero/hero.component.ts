import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['../../app.component.css']
})
export class HeroComponent {
  @Input() hero: {title: string, content: string} | undefined
}
