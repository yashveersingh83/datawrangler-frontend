
import { ROLES } from './roles.constants';
import { INFORMATION_REQUEST_FIELDS } from './information-request-fields.constants';
import { NavigationContext } from '../navbar/NavigationContext';

export interface FeaturePermissions {
  canAdd: (ctx: NavigationContext) => boolean;
  canEdit: (ctx: NavigationContext) => boolean;
  canDelete: (ctx: NavigationContext) => boolean;
  editableFields?: (ctx: NavigationContext) => 'ALL' | string[];
}

export const INFORMATION_REQUEST_PERMISSIONS: FeaturePermissions = {
    canAdd: (ctx) => ctx.userRoles.includes(ROLES.ANALYST),
    canEdit: (ctx) =>
      ctx.userRoles.includes(ROLES.ANALYST) ||
      ctx.userRoles.includes(ROLES.COORDINATOR) ||
      ctx.userRoles.includes(ROLES.APPROVER),
    canDelete: (ctx) => ctx.userRoles.includes(ROLES.ANALYST),
    editableFields: (ctx) => {
      if (ctx.userRoles.includes(ROLES.ANALYST)) {
        return 'ALL';  
      }
      if (ctx.userRoles.includes(ROLES.COORDINATOR)) {
        return [INFORMATION_REQUEST_FIELDS.STATUS,INFORMATION_REQUEST_FIELDS.worksheetType
            
        ];
        
      }
      if (ctx.userRoles.includes(ROLES.APPROVER)) {
        return [
          INFORMATION_REQUEST_FIELDS.APPROVAL_COMMENT,
          INFORMATION_REQUEST_FIELDS.STATUS,INFORMATION_REQUEST_FIELDS.worksheetType
         
        ];
      }
      return []; // No editing by others
    }
  };