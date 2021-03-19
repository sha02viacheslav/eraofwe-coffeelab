import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
    selector: '[appWordLimit]',
})
export class WordLimitDirective {
    @Input() limit: number; // number | decimal

    private specialKeys = ['Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight'];

    constructor(private el: ElementRef) {}

    @HostListener('keydown', ['$event'])
    onKeyDown(event: KeyboardEvent) {
        if (
            // Allow: Delete, Backspace, Tab, Escape, Enter, etc
            this.specialKeys.indexOf(event.key) !== -1 ||
            (event.key === 'a' && event.ctrlKey === true) || // Allow: Ctrl+A
            (event.key === 'c' && event.ctrlKey === true) || // Allow: Ctrl+C
            (event.key === 'v' && event.ctrlKey === true) || // Allow: Ctrl+V
            (event.key === 'x' && event.ctrlKey === true) || // Allow: Ctrl+X
            (event.key === 'a' && event.metaKey === true) || // Cmd+A (Mac)
            (event.key === 'c' && event.metaKey === true) || // Cmd+C (Mac)
            (event.key === 'v' && event.metaKey === true) || // Cmd+V (Mac)
            (event.key === 'x' && event.metaKey === true) // Cmd+X (Mac)
        ) {
            return; // let it happen, don't do anything
        }
        // Do not use event.keycode this is deprecated.
        // See: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
        const current: string = this.el.nativeElement.value;
        const next: string = current.concat(event.key);
        const stringData = next
            .replace(/(^\s*)|(\s*$)/gi, '')
            .replace(/[ ]{2,}/gi, ' ')
            .replace(/\n /, '\n');
        const length = stringData ? stringData.split(' ').length : 0;

        if (length > this.limit) {
            event.preventDefault();
        }
    }
}
