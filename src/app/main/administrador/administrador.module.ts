import {NgModule} from '@angular/core';
import {CoreCommonModule} from '../../../@core/common.module';
import {RouterModule} from '@angular/router';
import {ContentHeaderModule} from '../../layout/components/content-header/content-header.module';
import {TranslateModule} from '@ngx-translate/core';
import {SwiperModule} from 'ngx-swiper-wrapper';
import {FormsModule} from '@angular/forms';
import {CoreTouchspinModule} from '../../../@core/components/core-touchspin/core-touchspin.module';
import {CoreSidebarModule} from '../../../@core/components';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {Ng2FlatpickrModule} from 'ng2-flatpickr';
import {CardSnippetModule} from '../../../@core/components/card-snippet/card-snippet.module';
import {Role} from '../../auth/models';
import {AuthGuard} from '../../auth/helpers';
import {ListarComponent} from './usuarios/listar/listar.component';

const routes = [
  {path: '', redirectTo: 'usuarios', pathMatch: 'full'},
  {
    path: 'usuarios',
    component: ListarComponent,
    data: {roles: [Role.SuperAdministrador, Role.Administrador]},
    canActivate: [AuthGuard]
    // data: { animation: 'auth' }
  },
];


@NgModule({
  declarations: [
    ListarComponent,
  ],
  imports: [
    CoreCommonModule,
    RouterModule.forChild(routes),
    ContentHeaderModule,
    TranslateModule,
    SwiperModule,
    FormsModule,
    CoreTouchspinModule,
    CoreSidebarModule,
    NgbModule,
    Ng2FlatpickrModule,
    CardSnippetModule,
  ]
})
export class AdministradorModule {
}
