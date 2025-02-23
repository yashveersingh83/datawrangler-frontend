export interface InformationRequestModel {
    id: string;
    sIRYear: number;
    informationRequest: string | null;
    requestNumber: string;  
    
    recipientID: number;
    ddsuCode: string;
    submissionType: string;
    existingSubmissionType: string | null;
    informationSought: string;
    spqComment: string;
    worksheetAvailabilityDate: string; // This is a string as it seems like a date format in JSON
    worksheetType: string | null;
    milestoneID: number;
    mileStoneDate: string; // This is a string as it seems like a date format in JSON
    
    approver: string;
    approverName: string;
    inputWorksheetLink: string | null;
    latestSubmittedWorksheetLink: string | null;
    worksheetDetails: string | null;
    worksheetTabs: string | null;
    requestStatusID: number;
    lastModifiedBy: string;
    lastModifiedDate: string;
    organizationalUnitName: string;
    requestStatus: string;
    requestStatusType: number;    
    coordinatorName: string;
    statusModifiedDate: string;
    
  }
  