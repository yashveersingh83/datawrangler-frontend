export const environment = {
    production: false,
    apiUrl: 'http://localhost:8010/api', // Example API URL for Docker
    enableDebug: false,
    realm:'Datawrangler',
    keyclockClientId:'datawranglerclient',
    keyclockServerUrl:'http://host.docker.internal:7080/',
    localHostUrlPattern:/^(http:\/\/localhost:4200)(\/.*)?$/i
  };