export const GLOBAL = {
  RUTA_GLOBAL: ''
}


export const environment = {
  production: true,
  SERVICIOS_INICIA_SESION: GLOBAL.RUTA_GLOBAL + '/api/login',
  SERVICIOS_GUARDAR_VENTA: GLOBAL.RUTA_GLOBAL + '/api/note',
  SERVICIOS_BUSCAR_CLIENTE: GLOBAL.RUTA_GLOBAL + '/api/client',
  SERVICIOS_BUSCA_VENTA:GLOBAL.RUTA_GLOBAL + '/api/note/search',
  PAYMENTS_SERVICES: GLOBAL.RUTA_GLOBAL + '/api/payment'
};
