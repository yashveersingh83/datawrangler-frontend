import {
    provideKeycloak,
    createInterceptorCondition,
    IncludeBearerTokenCondition,
    INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
    withAutoRefreshToken,
    AutoRefreshTokenService,
    UserActivityService
  } from 'keycloak-angular';
import { environment } from '../../../../environments/environment';
  
  const localhostCondition = createInterceptorCondition<IncludeBearerTokenCondition>({
    urlPattern: environment.localHostUrlPattern
  });
  
  export const provideKeycloakAngular = () =>
    provideKeycloak({
      config: {
        realm: environment.realm,
        url: environment.keyclockServerUrl,
        clientId: environment.keyclockClientId
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
        enableLogging: true, 
        redirectUri: window.location.origin + '/'
      },
      features: [
        withAutoRefreshToken({
          onInactivityTimeout: 'logout',
          sessionTimeout: 60000
        })
      ],
      providers: [
        AutoRefreshTokenService,
        UserActivityService,
        {
          provide: INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
          useValue: [localhostCondition]
        }
      ]
    });