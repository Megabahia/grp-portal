import {Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {CoreMenuService} from '@core/components/core-menu/core-menu.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {User} from 'app/auth/models';
import {SwiperConfigInterface} from 'ngx-swiper-wrapper';
import {Subject} from 'rxjs';
import {PrincipalService} from './principal.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {class: 'ecommerce-application'}
})
export class PrincipalComponent implements OnInit, OnDestroy {

  public productos;
  private _unsubscribeAll: Subject<any>;
  public usuario: User;

  constructor(
    private _principalService: PrincipalService,
    private _coreMenuService: CoreMenuService,
    private modalService: NgbModal,
  ) {
    this._unsubscribeAll = new Subject();
    this.usuario = this._coreMenuService.grpCreditUser;
    this.productos = {
      cont: 0,
      info: []

    };
  }

  ngOnInit(): void {
  }


  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
