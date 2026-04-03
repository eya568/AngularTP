import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlightStatus]'
})
export class HighlightStatusDirective implements OnChanges {

  @Input('appHighlightStatus') status: string = '';

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnChanges() {
    this.applyClasses();
  }

  private applyClasses() {
    // Remove previous classes
    this.renderer.removeClass(this.el.nativeElement, 'border-yellow-400');
    this.renderer.removeClass(this.el.nativeElement, 'bg-yellow-50');
    this.renderer.removeClass(this.el.nativeElement, 'border-blue-400');
    this.renderer.removeClass(this.el.nativeElement, 'bg-blue-50');
    this.renderer.removeClass(this.el.nativeElement, 'border-green-400');
    this.renderer.removeClass(this.el.nativeElement, 'bg-green-50');
    this.renderer.removeClass(this.el.nativeElement, 'border-gray-400');
    this.renderer.removeClass(this.el.nativeElement, 'bg-gray-50');

    // Add classes according to status
    switch(this.status) {
      case 'En attente':
        this.renderer.addClass(this.el.nativeElement, 'border-yellow-400');
        this.renderer.addClass(this.el.nativeElement, 'bg-yellow-50');
        break;
      case 'En cours':
        this.renderer.addClass(this.el.nativeElement, 'border-blue-400');
        this.renderer.addClass(this.el.nativeElement, 'bg-blue-50');
        break;
      case 'Terminé':
        this.renderer.addClass(this.el.nativeElement, 'border-green-400');
        this.renderer.addClass(this.el.nativeElement, 'bg-green-50');
        break;
      default:
        this.renderer.addClass(this.el.nativeElement, 'border-gray-400');
        this.renderer.addClass(this.el.nativeElement, 'bg-gray-50');
    }
  }
}