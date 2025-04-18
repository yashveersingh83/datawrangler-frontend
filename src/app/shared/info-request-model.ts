export interface InformationRequestModel {
    id: string;
    sirYear: number;
    informationRequest: string | null;
    requestNumber: string;     
    
    ddsuCode: string;
    submissionType: string;
    existingSubmissionType: string | null;
    informationSought: string;
    spqComment: string;
    worksheetAvailabilityDate: string|null; // This is a string as it seems like a date format in JSON
    worksheetType: string | null;    
    mileStoneDate: string; // This is a string as it seems like a date format in JSON
    
    approver: string;
    approverName: string;
    inputWorksheetLink: string | null;
    latestSubmittedWorksheetLink: string | null;
     worksheetDetails: string | null;
     worksheetTabs: string | null;
    
    //lastModifiedBy: string;
    //lastModifiedDate: string;
    organizationalUnitName: string;
    requestStatus: string;
    requestStatusType: number;    
    coordinatorName: string| null;
    //statusModifiedDate: string| null;
    requestStatusID:string| null;
    milestoneID:string| null;
    recipientID:string| null;
    approverID:string|null;
    organizationalUnitID: string;
    submissionTypeID: string;
    
  }
  