export const environment = {
    production: true,
    apiUrl: 'http://host.docker.internal:8010/api', // Example API URL for Docker
    enableDebug: false,
    realm:'Datawrangler',
    keyclockClientId:'datawranglerclient',
    keyclockServerUrl:'http://host.docker.internal:7080/',
    localHostUrlPattern:/^(http:\/\/localhost:8080)(\/.*)?$/i
  };