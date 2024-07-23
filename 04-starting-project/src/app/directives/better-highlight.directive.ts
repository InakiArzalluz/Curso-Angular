import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2 } from "@angular/core";

@Directive({
    selector: '[appBetterHighlight]' // [] lo hace seteable estilo atributo
})
export class BetterHighlightDirective implements OnInit{
    @Input() defaultColor: string = 'transparent';
    @Input() highlightColor: string = 'blue';

    constructor(private elRef: ElementRef, private renderer: Renderer2){
        // Eso lo que está haciendo es inyectarme esas dos dependencias:
        // 1. Una referencia al elemento en el que se seteo ésta directiva.
        // 2. Un renderer que voy a utilizar para setear los estilos (xq hacerlo de forma
        //    directa ocasiona problemas si no estoy ejecutando en web).
    }

    ngOnInit(): void {
        // Esto setea el color al inicializar
        //this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue');
    }

    @HostListener('mouseenter') mouseover(eventData: Event) {
        this.renderer.setStyle(this.elRef.nativeElement, 'background-color', this.highlightColor);
    }

    @HostListener('mouseleave') mouseleave(eventData: Event) {
        this.renderer.setStyle(this.elRef.nativeElement, 'background-color', this.defaultColor);
    }
}