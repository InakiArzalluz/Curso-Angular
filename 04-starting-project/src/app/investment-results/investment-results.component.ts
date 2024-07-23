import { Component, Input } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { AnnualData } from './investment-result.model';
@Component({
  selector: 'app-investment-results',
  standalone: true,
  imports: [ CommonModule, CurrencyPipe ],
  templateUrl: './investment-results.component.html',
  styleUrl: './investment-results.component.css'
})
export class InvestmentResultsComponent {
  @Input() InvestementResult?: AnnualData[];
}
