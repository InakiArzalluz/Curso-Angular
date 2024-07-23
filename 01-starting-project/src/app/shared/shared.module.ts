import { NgModule } from "@angular/core";
import { CardComponent } from "./card/card.component";

@NgModule({
    declarations: [CardComponent], // Hace accesible CardComponent para este modulo completo
    imports: [],
    exports: [CardComponent], // hace accesible CadComponent para los otros modulos que importen este modulo
})
export class SharedModule{}