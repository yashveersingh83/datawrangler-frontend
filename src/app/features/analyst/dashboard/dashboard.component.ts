import { Component, inject ,effect} from '@angular/core';
import { DashboardServiceService } from '../services/dashboard-service.service';
import { Observable, of } from 'rxjs';

import { getAppScopedQueuedEventInfos } from '@angular/core/primitives/event-dispatch';
import { DevExtremeModule } from 'devextreme-angular';
import { CommonModule } from '@angular/common';
import Keycloak from 'keycloak-js';
import {
  HasRolesDirective,
  KEYCLOAK_EVENT_SIGNAL,
  KeycloakEventType,
  typeEventArgs,
  ReadyArgs
} from 'keycloak-angular';
import { RouterModule } from '@angular/router';
import { DataActionRecord } from '../../../shared/data-action-model';

@Component({
  selector: 'app-dashboard',
 // standalone: false,
  imports:[DevExtremeModule,CommonModule,RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  authenticated = false;
  keycloakStatus: string | undefined;
  private readonly keycloak = inject(Keycloak);
  private readonly keycloakSignal = inject(KEYCLOAK_EVENT_SIGNAL);

  
  columns: any[];
  editing: any;

  dataActions$ :Observable<DataActionRecord[]>= of([]); ;
  constructor(private dataActionService:DashboardServiceService){


    effect(() => {
      const keycloakEvent = this.keycloakSignal();

      this.keycloakStatus = keycloakEvent.type;

      if (keycloakEvent.type === KeycloakEventType.Ready) {
        this.authenticated = typeEventArgs<ReadyArgs>(keycloakEvent.args);
      }

      if (keycloakEvent.type === KeycloakEventType.AuthLogout) {
        this.keycloak.login();
      }
      if (keycloakEvent.type === KeycloakEventType.AuthError) {
        this.keycloak.login();
       
      }
    });
    // Define columns
    this.columns = [
      { dataField: 'SirYear', caption: 'Sir Year', dataType: 'number' },
      { dataField: 'DataSource', caption: 'Data Source'  ,alignment: 'center' },
      //{ dataField: 'Id', caption: 'ID', allowEditing: false  , hidd},
      { dataField: 'User', caption: 'User'  ,alignment: 'center' },
      { dataField: 'StatusDisplay', caption: 'Status'   ,alignment: 'center' },
      { dataField: 'Timestamp', caption: 'Timestamp', dataType: 'datetime'  ,alignment: 'center'  },
     
     
      {
        dataField: 'IsCancellable',
        caption: 'Cancellable',
        dataType: 'boolean'
      }
    ];

    // Editing configuration
    this.editing = {
      mode: 'popup', // Options: 'popup', 'batch', 'cell', 'row'
      allowUpdating: false,
      allowAdding: false,
      allowDeleting: true
    };
    
  }
  
  ngOnInit() {
      
    this.dataActions$ = this.dataActionService.fetchDataActions();
   
  }

  onPagingChange(e: any) {
    if (e.fullName === 'paging.pageSize' || e.fullName === 'paging.pageIndex') {
      const pageSize = e.component.pageSize();
      const pageIndex = e.component.pageIndex();

      console.log(`Page size: ${pageSize}, Page index: ${pageIndex}`);
      // API calls are already handled in the custom data source, no need to call here
    }
  }

   login() {
    this.keycloak.login();
  }

  logout() {
    this.keycloak.logout();
  }

}
