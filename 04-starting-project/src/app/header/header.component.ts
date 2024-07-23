import { Component } from '@angular/core';
import { HiglightModule } from '../directives/better-highlight.module';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  imports: [HiglightModule],
})
export class HeaderComponent {

}
