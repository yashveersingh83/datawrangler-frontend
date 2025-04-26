import { Injectable } from '@angular/core';

import { FeaturePermissions, INFORMATION_REQUEST_PERMISSIONS } from './feature-permission.config';
import { NavigationContext } from '../navbar/NavigationContext';
import { FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root',
})
export class FeaturePermissionService {

    constructor() { }

    getInformationRequestPermissions(context: NavigationContext): FeaturePermissions {
        return INFORMATION_REQUEST_PERMISSIONS;
    }

    // Optionally in future you can add other features
    // getUserPermissions(context: NavigationContext, feature: 'info-request' | 'submission' | 'recipient'): FeaturePermissions {}
    applyFieldPermissions(
        formGroup: FormGroup,
        editableFields: 'ALL' | string[] | ((context: NavigationContext) => 'ALL' | string[]),
        context?: NavigationContext
    ) {
        const fields = typeof editableFields === 'function'
            ? editableFields(context!)
            : editableFields;

        const controls = Object.keys(formGroup.controls);

        controls.forEach(controlName => {
            const control = formGroup.get(controlName);
            if (!control) return;

            if (this.isFieldEditable(controlName, fields)) {
                control.enable({ emitEvent: false });
            } else {
                control.disable({ emitEvent: false });
            }
        });
    }

    private isFieldEditable(fieldName: string, editableFields: 'ALL' | string[]): boolean {
        if (editableFields === 'ALL') {
            return true;
        }
        return editableFields.includes(fieldName);
    }
   
}
