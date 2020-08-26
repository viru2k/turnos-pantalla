


export const URL_SERVICIOS = 'http://localhost/api-turnos/public/api/';
export const config: SocketIoConfig = { url: 'http://localhost:4444', options: {} };
export const URL_ARCHIVO = 'http://localhost/api-turnos/public/uploads/';

/***********SERVER DE PRUEBAS ********************** */


export const VAPID_PUBLIC ='BNOJyTgwrEwK9lbetRcougxkRgLpPs1DX0YCfA5ZzXu4z9p_Et5EnvMja7MGfCqyFCY4FnFnJVICM4bMUcnrxWg'; // SIN USO

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

export const PARAMS = 'json=';

export const calendarioIdioma: any =  {
    firstDayOfWeek: 1,
    dayNames: [ 'domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado' ],
    dayNamesShort: [ 'dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb' ],
    dayNamesMin: [ 'D', 'L', 'M', 'X', 'J', 'V', 'S' ],
    // tslint:disable-next-line: max-line-length
    monthNames: [ 'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre' ],
    monthNamesShort: [ 'ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic' ],
    today: 'Hoy',
    clear: 'Borrar'
};




