
import { Injectable } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { Float } from 'aws-sdk/clients/gamelift';

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

    offpercent(newPrice: string, oldPrice: string): Float{
        let n_price = parseFloat(newPrice);
        let o_price = parseFloat(oldPrice);
        let percent = 0.0;
        if(o_price > n_price){
            return percent= -(((o_price-n_price)/o_price)*100);
        }
        return 0;
    }
}