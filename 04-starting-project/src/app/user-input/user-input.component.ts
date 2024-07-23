import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@Angular/forms'
import { InvestInfo } from '../investment-input.model';

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css'
})
export class UserInputComponent {
  @Output() investment = new EventEmitter<InvestInfo>(); 
  initialInvestment: number = 0;
  annualInvestment: number = 0;
  expectedReturn: number = 0;
  duration: number = 0;

  onSubmitInvestment(){
    // Los valores del form se asignan a atributos mediante two-way binding
    this.investment.emit(
      {
        initialInvestment: +this.initialInvestment, // El + castea de string a number wtf
        annualInvestment: +this.annualInvestment,
        expectedReturn: +this.expectedReturn,
        duration: +this.duration,
      } 
    )
  }
}
