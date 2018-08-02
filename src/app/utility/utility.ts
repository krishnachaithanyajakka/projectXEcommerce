
import { Injectable } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';

@Injectable()
export class Utility {
    shouldShowErrors(controlFormNField,formName): boolean {
        let control;
        control = formName.controls[controlFormNField];
        return control &&
        control.errors &&
        (control.dirty || control.touched);
    }
    getErrorMessage(controlFormNField,formName): string{
        let control;
        control = formName.controls[controlFormNField];
        return control.errors.message;
    }
    validateAllFormFields(formGroup: FormGroup){
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
            control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormGroup) {
            this.validateAllFormFields(control);
            }
        });
    }
}