import { CoreMenu } from '@core/types';

export const menu: CoreMenu[] = [
  // Dashboard
  {
    id: 'inicio',
    title: 'Inicio',
    // translate: 'MENU.HOME',
    // role: [Role.SuperMonedas],
    type: 'item',
    icon: 'home',
    url: 'personas/inicio',

  },
  {
    id: 'corp',
    title: 'Corp',
    // role: [Role.SuperMonedas],
    // translate: 'MENU.PAGES.SECTION',
    type: 'collapsible',
    icon: 'coffee',
    children: [
      {
        id: 'misEmpleados',
        title: 'Mis empleados',
        // translate: 'MENU.APPS.EMAIL',
        type: 'collapsible',
        icon: 'users',
        children: [
          {
            id: 'nominaEmpleados',
            title: 'Nómina de empleados',
            // translate: 'MENU.APPS.EMAIL',
            type: 'item',
            icon: 'circle',
            url: 'personas/supermonedas/mis-monedas'
          },
          {
            id: 'solicitarCreditos',
            title: 'Solicitar créditos para mis empleados',
            // translate: 'MENU.APPS.EMAIL',
            type: 'item',
            icon: 'circle',
            url: 'personas/supermonedas/mis-monedas'
          },
          {
            id: 'confirmarAutorizacion',
            title: 'Confirmar autorización de débito del ROLL',
            // translate: 'MENU.APPS.EMAIL',
            type: 'item',
            icon: 'circle',
            url: 'personas/supermonedas/mis-monedas'
          },
          {
            id: 'aprobacionSolicitud',
            title: 'Aprobación de solicitud de créditos',
            // translate: 'MENU.APPS.EMAIL',
            type: 'item',
            icon: 'circle',
            url: 'personas/supermonedas/mis-monedas'
          },
          {
            id: 'registroCreditos',
            title: 'Registro de créditos',
            // translate: 'MENU.APPS.EMAIL',
            type: 'item',
            icon: 'circle',
            url: 'personas/supermonedas/mis-monedas'
          },
        ]
      },
      {
        id: 'lineasCredito',
        title: 'Líneas de crédito',
        // translate: 'MENU.APPS.EMAIL',
        type: 'collapsible',
        icon: 'credit-card',
        children: [
          {
            id: 'misLineasCredito',
            title: 'Mis líneas de crédito',
            // translate: 'MENU.APPS.EMAIL',
            type: 'item',
            icon: 'circle',
            url: 'personas/supermonedas/mis-monedas'
          },
          {
            id: 'appLineaProv',
            title: 'Aplicar línea de crédito para pago Proveedores',
            // translate: 'MENU.APPS.EMAIL',
            type: 'item',
            icon: 'circle',
            url: 'personas/supermonedas/mis-monedas'
          },
          {
            id: 'appLineaNom',
            title: 'Aplicar línea de crédito para pago de nómina',
            // translate: 'MENU.APPS.EMAIL',
            type: 'item',
            icon: 'circle',
            url: 'personas/supermonedas/mis-monedas'
          },
          {
            id: 'consultaLineas',
            title: 'Consultas de líneas de crédito',
            // translate: 'MENU.APPS.EMAIL',
            type: 'item',
            icon: 'circle',
            url: 'personas/supermonedas/mis-monedas'
          },
        ]
      },
      {
        id: 'suoerMonedas',
        title: 'Super monedas',
        // translate: 'MENU.APPS.EMAIL',
        type: 'collapsible',
        icon: 'dollar-sign',
        children: [
          {
            id: 'cargarSuperMonedas',
            title: 'Cargar super monedas a empleados',
            // translate: 'MENU.APPS.EMAIL',
            type: 'item',
            icon: 'circle',
            url: 'personas/supermonedas/mis-monedas'
          }
        ]
      },
      {
        id: 'descuentosROLL',
        title: 'Descuentos de ROLL',
        // translate: 'MENU.APPS.EMAIL',
        type: 'collapsible',
        icon: 'folder-minus',
        children: [
          {
            id: 'descontarEmpleados',
            title: 'Descontar a empleados',
            // translate: 'MENU.APPS.EMAIL',
            type: 'item',
            icon: 'circle',
            url: 'personas/supermonedas/mis-monedas'
          }
        ]
      },
      {
        id: 'comisiones',
        title: 'Comisiones',
        // translate: 'MENU.APPS.EMAIL',
        type: 'collapsible',
        icon: 'plus-square',
        children: [
          {
            id: 'misComisiones',
            title: 'Mis comisiones',
            // translate: 'MENU.APPS.EMAIL',
            type: 'item',
            icon: 'circle',
            url: 'personas/supermonedas/mis-monedas'
          }
        ]
      },
    ]
  },
  
];
