import { Component, Input, forwardRef, ElementRef, ViewChild, OnChanges, OnInit, OnDestroy } from '@angular/core';
import { NgControl } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'medium-editor',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => MediumEditorComponent),
        multi: true
    }, NgControl],
    template: `<div #host></div>`
})
export class MediumEditorComponent implements ControlValueAccessor, OnInit, OnDestroy, OnChanges {
    @Input() options: any;
    @Input() placeholder: string;
    el: ElementRef;
    ngControl: NgControl;
    editor: any;
    @ViewChild('host') host: any;
    propagateChange = (_: any) => { };

    constructor(el: ElementRef, ngControl: NgControl) {
        this.el = el;
        if (ngControl) {
            ngControl.valueAccessor = this;
            this.ngControl = ngControl;
        }
    }

    ngOnInit() {
        this.options = (typeof this.options === 'string') ? JSON.parse(this.options)
            : (typeof this.options === 'object') ? this.options : {};
        if (this.placeholder && this.placeholder !== '') {
            Object.assign(this.options, {
                placeholder: { text: this.placeholder }
            });
        }
        this.editor = new MediumEditor(this.host.nativeElement, this.options);
        this.editor.subscribe('editableInput', (event: any, editable: any) => {
            let value = this.editor.elements[0].innerHTML;
            this.ngOnChanges(value);
        });
    }

    ngOnDestroy() {
        if (this.editor) {
            this.editor.destroy();
        }
    }

    ngOnChanges(changes: any) {
        this.propagateChange(changes);
    }

    writeValue(value: any) {
        console.log(value);
        if (this.editor) {
            if (value && value !== '') {
                this.editor.setContent(value);
            }
        }
    }
    registerOnChange(fn: any) {
        this.propagateChange = fn;
    }
    registerOnTouched(fn: any) { }

}
