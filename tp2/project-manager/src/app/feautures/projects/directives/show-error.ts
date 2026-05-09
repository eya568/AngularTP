import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
  OnDestroy
} from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appShowError]',
  standalone: true
})
export class ShowErrorDirective implements OnDestroy {

  private control!: AbstractControl;
  private errorType!: string;
  private sub?: Subscription;

  constructor(
    private tpl: TemplateRef<any>,
    private vcr: ViewContainerRef
  ) {}

 @Input() set appShowError(control: AbstractControl | null) {
  if (!control) return;
  this.control = control;
  this.updateView();
  this.listen();
}


  @Input('appShowErrorErrorType') set errorTypeInput(type: string) {
    this.errorType = type;
    this.updateView();
  }

  private listen() {
    if (!this.control) return;

    this.sub?.unsubscribe();

    this.sub = this.control.statusChanges.subscribe(() => {
      this.updateView();
    });
  }

  private updateView() {
    this.vcr.clear();

    if (
      this.control &&
      this.control.touched &&
      this.control.errors?.[this.errorType]
    ) {
      this.vcr.createEmbeddedView(this.tpl);
    }
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
