// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const GLOBAL = {
  RUTA_GLOBAL: 'http://localhost:8080'
}

export const environment = {
  production: false,
  SERVICIOS_INICIA_SESION: GLOBAL.RUTA_GLOBAL + '/api/login',
  SERVICIOS_GUARDAR_VENTA: GLOBAL.RUTA_GLOBAL + '/api/note',
  SERVICIOS_BUSCAR_CLIENTE: GLOBAL.RUTA_GLOBAL + '/api/client',
  SERVICIOS_BUSCA_VENTA:GLOBAL.RUTA_GLOBAL + '/api/note/search',
  SERVICIOS_REPORTES:GLOBAL.RUTA_GLOBAL + '/api/reports',
  PAYMENTS_SERVICES: GLOBAL.RUTA_GLOBAL + '/api/payment',
  CLIENTS_SERVICES: GLOBAL.RUTA_GLOBAL + '/api/clientsV2',
  NOTES_V2: GLOBAL.RUTA_GLOBAL + '/api/notesV2'
};



/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
