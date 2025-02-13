export interface DataActionRecord {
    Id: string; // Unique identifier (e.g., a GUID)
    ComparisonDetailsUrl: string; // URL for comparison details
    ResolveConflictsUrl: string; // URL to resolve conflicts
    User: string; // User associated with the record
    Timestamp: string; // Timestamp of the action (in ISO format or a custom format)
    SirYear: number; // Year associated with the record
    DataSource: string; // Source of the data (e.g., CIRS)
    EntitiesText: string; // List of entities as a single string
    Entities: any[] | null; // Entities (can be detailed objects or null)
    DataAction: string; // Action performed (e.g., Import)
    Status: number; // Status code (e.g., 3 for Completed)
    InformationMessage: string; // Additional information or message
    StatusDisplay: string; // Human-readable status (e.g., Completed)
    StatusClass: string; // CSS class or status indicator (e.g., completed)
    IsCancellable: boolean; // Indicates if the action can be canceled (0 or 1)
    IsRemovable: boolean; // Indicates if the action can be removed (0 or 1)
    DataAction1?: string | null; // Additional data action (optional)
  }
  