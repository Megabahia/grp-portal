import {CoreMenu} from '@core/types';
import {Role} from '../auth/models';

export const menu: CoreMenu[] = [
  // Dashboard
  {
    id: 'inicio',
    title: 'Inicio',
    // translate: 'MENU.HOME',
    role: [Role.SuperAdministrador, Role.Vendedor, Role.Administrador],
    type: 'item',
    icon: 'home',
    url: 'personas/inicio',
  },
  {
    id: 'Administracion',
    title: 'Administrador',
    // translate: 'MENU.HOME',
    role: [Role.SuperAdministrador],
    type: 'item',
    icon: 'home',
    url: 'administrador/usuarios',
  },
];
