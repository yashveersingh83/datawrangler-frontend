export interface CoordinatorModel {
    Id: string;
    Division: string | null;
    Coordinator: string;
    CoordinatorName: string;
    DDSUCode: string;
    OrganizationalUnitName: string;
    Comments: string;
    LastModifiedBy: string | null;
    LastModifiedDate: string; // You might need to convert this into a Date object
    IsActive: boolean;
    ActiveText: string;
    NumberOfPendingRequests: number | null;
    IsInRole: boolean;
    CoordinatorRoles: string;
    id: string;
  }
  