export interface ManagerModel {
  ddsuCode: string;
    division: string;
    divisionCode: string;
    sectionCode: string;
    fullName: string;
    functionalTitle: string;
    approverRole: boolean;
    contributorRole: boolean;
    coordinatorRoles: string;
    personnelNumber: string;
    managerComment: string;
    showWarningIcon: boolean;
    warningTitle: string;
    approverRoleForExcel: string;
    id: string;
  }
  
  export interface Years {
    year: number;
    description: string;
  }

