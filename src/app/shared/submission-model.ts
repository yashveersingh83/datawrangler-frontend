export interface SubmissionModel {
    Id: string;
    SIRYear: number;
    InformationRequest: string | null;
    RequestNumber: string;
    RecipientID: number;
    DDSUCode: string;
    SubmissionType: string;
    ExistingSubmissionType: string | null;
    InformationSought: string;
    SPQComment: string;
    WorksheetAvailabilityDate: string; // You might need a date converter for this format
    WorksheetType: string | null;
    Approver: string;
    ApproverName: string;
    OrganizationalUnitName: string;
    RequestStatus: string;
    RequestStatusType: number;
    RequestStatusText: string;
    CoordinatorName: string;
    id: string;
  }
  