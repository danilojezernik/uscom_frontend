import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html'
})
export class HeroComponent {
  @Input() hero: {title: string, content: string} | undefined
}
