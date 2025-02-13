import { Component, effect, inject } from '@angular/core';
import { RouterState } from '@angular/router';
import { KEYCLOAK_EVENT_SIGNAL, KeycloakEventType, ReadyArgs, typeEventArgs } from 'keycloak-angular';
import Keycloak from 'keycloak-js';

@Component({
  selector: 'app-unauthorize',
  imports: [],
  templateUrl: './unauthorize.component.html',
  styleUrl: './unauthorize.component.css'
})
export class UnauthorizeComponent {
  authenticated = false;
  keycloakStatus: string | undefined;
  private readonly keycloak = inject(Keycloak);
  private readonly keycloakSignal = inject(KEYCLOAK_EVENT_SIGNAL);

  constructor() {

    effect(() => {
      const keycloakEvent = this.keycloakSignal();

      this.keycloakStatus = keycloakEvent.type;

      if (keycloakEvent.type === KeycloakEventType.Ready) {
        this.authenticated = typeEventArgs<ReadyArgs>(keycloakEvent.args);
      }

      if (keycloakEvent.type === KeycloakEventType.AuthLogout) {
        this.authenticated = false;
      }
      if (keycloakEvent.type === KeycloakEventType.AuthError) {
        this.authenticated = false;
      }
    });
    
  }
  login() {
    if(!this.keycloak.authenticated)
    {
    this.keycloak.login();
    }
    else{
     // this.router.snapshot.
    }
  }

  logout() {
    this.keycloak.logout();
  }

}
