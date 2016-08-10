"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var forms_1 = require('@angular/forms');
var MediumEditorComponent = (function () {
    function MediumEditorComponent(el, ngControl) {
        this.propagateChange = function (_) { };
        this.el = el;
        if (ngControl) {
            ngControl.valueAccessor = this;
            this.ngControl = ngControl;
        }
    }
    MediumEditorComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.options = (typeof this.options === 'string') ? JSON.parse(this.options)
            : (typeof this.options === 'object') ? this.options : {};
        if (this.placeholder && this.placeholder !== '') {
            Object.assign(this.options, {
                placeholder: { text: this.placeholder }
            });
        }
        this.editor = new MediumEditor(this.host.nativeElement, this.options);
        this.editor.subscribe('editableInput', function (event, editable) {
            var value = _this.editor.elements[0].innerHTML;
            _this.ngOnChanges(value);
        });
    };
    MediumEditorComponent.prototype.ngOnDestroy = function () {
        if (this.editor) {
            this.editor.destroy();
        }
    };
    MediumEditorComponent.prototype.ngOnChanges = function (changes) {
        this.propagateChange(changes);
    };
    MediumEditorComponent.prototype.writeValue = function (value) {
        console.log(value);
        if (this.editor) {
            if (value && value !== '') {
                this.editor.setContent(value);
            }
        }
    };
    MediumEditorComponent.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    MediumEditorComponent.prototype.registerOnTouched = function (fn) { };
    __decorate([
        core_1.Input()
    ], MediumEditorComponent.prototype, "options", void 0);
    __decorate([
        core_1.Input()
    ], MediumEditorComponent.prototype, "placeholder", void 0);
    __decorate([
        core_1.ViewChild('host')
    ], MediumEditorComponent.prototype, "host", void 0);
    MediumEditorComponent = __decorate([
        core_1.Component({
            selector: 'medium-editor',
            providers: [{
                    provide: forms_1.NG_VALUE_ACCESSOR,
                    useExisting: core_1.forwardRef(function () { return MediumEditorComponent; }),
                    multi: true
                }, common_1.NgControl],
            template: "<div #host></div>"
        })
    ], MediumEditorComponent);
    return MediumEditorComponent;
}());
exports.MediumEditorComponent = MediumEditorComponent;
