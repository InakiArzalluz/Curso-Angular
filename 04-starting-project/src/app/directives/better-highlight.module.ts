import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BetterHighlightDirective } from '../directives/better-highlight.directive';



@NgModule({
  declarations: [BetterHighlightDirective],
  imports: [
    CommonModule
  ],
  exports: [BetterHighlightDirective]
})
export class HiglightModule { }