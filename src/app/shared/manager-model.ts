export interface ManagerModel {
    DDSUCode: string;
    Division: string;
    DivisionCode: string;
    SectionCode: string;
    FullName: string;
    FunctionalTitle: string;
    ApproverRole: boolean;
    ContributorRole: boolean;
    CoordinatorRoles: string;
    PersonnelNumber: string;
    ManagerComment: string;
    ShowWarningIcon: boolean;
    WarningTitle: string;
    ApproverRoleForExcel: string;
    id: string;
  }
  
  export interface Years {
    year: number;
    description: string;
  }