import {Component, OnDestroy, OnInit} from '@angular/core';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {first, takeUntil} from 'rxjs/operators';
import {CoreConfigService} from '../../../../@core/services/config.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {AuthenticationService} from '../../../auth/service/authentication.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  //  Public
  public coreConfig: any;
  public loginForm: FormGroup;
  public loading = false;
  public submitted = false;
  public returnUrl: string;
  public error = '';
  public passwordTextType: boolean;
  public startDateOptions = {
    altInput: true,
    mode: 'single',
    altInputClass: 'form-control flat-picker flatpickr-input invoice-edit-input',
    enableTime: true
  };

  // Private
  private _unsubscribeAll: Subject<any>;
  private usuarios = [];
  public grpCreditUser: Observable<any>;
  // private
  private grpCorpUserSubject: BehaviorSubject<any>;

  public get grpCorpUserValue(): any {
    return this.grpCorpUserSubject.value;
  }

  constructor(
    private _toastrService: ToastrService,
    private _coreConfigService: CoreConfigService,
    private _formBuilder: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router,
    private _authenticationService: AuthenticationService
  ) {
    // this.grpCorpUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('grpCreditUser')));
    // this.grpCreditUser = this.grpCorpUserSubject.asObservable();
    // const filePath = './assets/usuarios/usuarios.csv';
    // fetch(filePath)
    //   .then(response => {
    //     if (!response.ok) {
    //       throw new Error(`No se pudo cargar el archivo ${filePath}`);
    //     }
    //     return response.text();
    //   })
    //   .then(csvContent => {
    //     this.usuarios = csvContent.split('\n').map((item) => {
    //       const fila = item.split(';');
    //       return {
    //         email: fila[0],
    //         password: fila[1],
    //         roles: [{nombre: fila[2]}],
    //         perfil: fila[3],
    //         tokenExpiracion: 0,
    //       };
    //     });
    //   })
    //   .catch(error => console.error('Error al cargar el archivo:', error));
    this._unsubscribeAll = new Subject();

    // Configure the layout
    this._coreConfigService.config = {
      layout: {
        navbar: {
          hidden: true
        },
        menu: {
          hidden: true
        },
        footer: {
          hidden: true
        },
        customizer: false,
        enableLocalStorage: false
      }
    };
    if (this._authenticationService.grpCorpUserValue) {
      this._router.navigate(['/']);
    }
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  /**
   * Toggle password
   */
  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  async onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    // Login
    this.loading = true;
    const data = await this._authenticationService
      .login(this.f.email.value, this.f.password.value);
    console.log('data', data);
    if (!data) {
          this.error = 'Fallo en la autenticación, vuelva a intentarlo';
          this.loading = false;
    }
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';

    // Subscribe to config changes
    this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
      this.coreConfig = config;
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
