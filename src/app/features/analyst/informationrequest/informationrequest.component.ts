import { Component, OnDestroy, OnInit } from '@angular/core';
import { InformationRequestModel } from '../../../shared/info-request-model';
import CustomStore from 'devextreme/data/custom_store';
import { InforrequestService } from '../services/inforrequest.service';
import { FeaturePermissionService } from '../../feature-permission.service';
import { KeycloakAuthService } from '../../../core/authentication/services/keycloak-auth.service';
import { createEmptyNavigationContext, NavigationContext } from '../../../navbar/NavigationContext';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-informationrequest',
  templateUrl: './informationrequest.component.html',
  standalone: false,
  styleUrls: ['./informationrequest.component.scss']
})
export class InformationrequestComponent implements OnInit ,OnDestroy {
  informationRequestDataSource: any;

  private routerSubscription: Subscription = new Subscription;

  ischildRoute: boolean = false;


  showForm: boolean = false;

  navigationContext: NavigationContext = createEmptyNavigationContext();
  permissions: any;
  constructor(
    private inforService: InforrequestService,

    private router: Router,  

    private featurePermissionService: FeaturePermissionService,
    private keycloakAuthService: KeycloakAuthService
  ) {
    this.initializeDataSource(); 

    const roles = this.keycloakAuthService.getUserRoles();
    const profile = this.keycloakAuthService.getUserProfile();

    this.navigationContext = { userRoles: roles, userProfile: profile };
    this.permissions = this.featurePermissionService.getInformationRequestPermissions(this.navigationContext);

   
  }
  ngOnInit(): void {
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.checkRoute(event.url);  // Check the URL after navigation ends
      }
    });
  }
  checkRoute(url: string): void {
    if (url.includes('informationrequest') && (url.includes('new') || url.split('/').length > 3)) {
      this.ischildRoute = true;
    } else {
      this.ischildRoute = false;
    }
  }ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
  initializeDataSource() {
    this.initializeRequestStore();
  }

  private initializeRequestStore() {
    this.informationRequestDataSource = new CustomStore({
      key: 'id',
      load: () => {
        const page = 1// (loadOptions.skip / loadOptions.take) + 1 || 1;
        const pageSize = 10;
        return this.inforService.getList(page, pageSize).toPromise();
      },
     
      // }
    });
  }

  openPopup(request: InformationRequestModel | null): void {
    if (request && request.id) {
      this.ischildRoute = true;
      console.log('Navigating to child route with id:', request.id);
      this.router.navigate(['/analyst/informationrequest', request.id]); // This should trigger child route with id
    } else {
      console.log('Navigating to new request creation');
      this.ischildRoute = true;
      this.router.navigate(['/analyst/informationrequest', 'new']); // Navigate to 'new' route if no id
    }
  }


  deleteRequest(key: any) {
    if (confirm('Are you sure you want to delete this request?')) {
      this.inforService.deleteRequest(key).subscribe(() => {
        alert('Request deleted successfully');
        this.initializeDataSource();
      });
    }
  }

  // onSave(requestData: InformationRequestModel) {
  //   if (requestData.id !='0') {
  //     this.inforService.updateRequestRequest(requestData).subscribe(() => {
  //       this.showForm = false;
  //       this.isPopupVisible = false;
  //       this.initializeDataSource(); // Refresh the data grid
  //     });
  //   } else {
  //     this.inforService.addRequest(requestData).subscribe(() => {
  //       this.showForm = false;
  //       this.isPopupVisible = false;
  //       this.initializeDataSource(); // Refresh the data grid
  //     });
  //   }
  // }

  // onCancel(): void {
  //   console.log('Closing popup');
  //   this.isPopupVisible = false;
  // }

  canDelete(): boolean {
    return this.permissions.canDelete(this.navigationContext);
  }
  canAdd(): boolean {
    return this.permissions.canAdd(this.navigationContext);
  }
  canEdit(): boolean {
    return this.permissions.canEdit(this.navigationContext);
  }
}
