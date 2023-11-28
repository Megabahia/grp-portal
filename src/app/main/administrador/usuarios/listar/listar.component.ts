import {DatePipe} from '@angular/common';
import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CoreSidebarService} from '@core/components/core-sidebar/core-sidebar.service';
import {NgbModal, NgbPagination} from '@ng-bootstrap/ng-bootstrap';
import {Subject} from 'rxjs';
import {UsuariosService} from '../usuarios.service';

import {compararPassword, Usuario} from '../models/usuarios';
import {RolesService} from '../../roles/roles.service';
// import {Empresa} from '../../empresas/models/empresas';
import {FlatpickrOptions} from 'ng2-flatpickr';
import {ParametrizacionesService} from '../../parametrizaciones/parametrizaciones.service';

/**
 * Bigpuntos
 * center
 * Esta pantalla sirve para listar los usuarios
 * Rutas:
 * `${environment.apiUrl}/central/usuarios/listOne/${id}`
 * `${environment.apiUrl}/central/roles/list/`,
 * `${environment.apiUrl}/corp/empresas/list/filtro`,
 * `${environment.apiUrl}/corp/empresas/listOne/${id}`
 * `${environment.apiUrl}/central/usuarios/listOne/${id}`
 * `${environment.apiUrl}/central/usuarios/create/`
 * `${environment.apiUrl}/central/usuarios/update/${datos._id}`,
 * `${environment.apiUrl}/central/param/list/tipo/todos/`,
 * `${environment.apiUrl}/central/usuarios/delete/${id}`
 */
@Component({
    selector: 'app-listar',
    templateUrl: './listar.component.html',
    styleUrls: ['./listar.component.scss'],
    providers: [DatePipe]
})
export class ListarComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild(NgbPagination) paginator: NgbPagination;
    @ViewChild('mensajeModal') mensajeModal;
    @ViewChild('eliminarUsuarioMdl') eliminarUsuarioMdl;
    public page = 1;
    public page_size: any = 10;
    public maxSize;
    public collectionSize;
    public listaUsuarios;
    public listaRoles;
    public listaEmpresas;
    public listaCargos;
    public usuario: Usuario;
    private _unsubscribeAll: Subject<any>;
    public idUsuario;
    public ruc;
    public usuarioForm: FormGroup;
    public usuarioSubmitted: boolean;
    public mensaje = '';
    public tipoUsuario = '';
    public fecha;
    public tipoCargoOpciones;
    public tipoGeneroOpciones;
    public startDateOptions: FlatpickrOptions = {
        altInput: true,
        mode: 'single',
        altFormat: 'Y-n-j',
        altInputClass: 'form-control flat-picker flatpickr-input invoice-edit-input',
    };
    public cargandoUsuario = false;

    constructor(
        private paramService: ParametrizacionesService,
        private datePipe: DatePipe,
        private _coreSidebarService: CoreSidebarService,
        private _usuariosService: UsuariosService,
        private _formBuilder: FormBuilder,
        private _modalService: NgbModal,
        private _rolService: RolesService,
    ) {
        this._unsubscribeAll = new Subject();
        this.idUsuario = '';
        this.usuario = this.inicializarUsuario();
    }

    ngOnInit(): void {
        this.usuarioForm = this._formBuilder.group({
                email: ['', [Validators.required]],
                nombres: ['', [Validators.required]],
                apellidos: ['', [Validators.required]],
                telefono: ['', [Validators.required]],
                whatsapp: ['', [Validators.required]],
                // cargo: ['', [Validators.required]],
                fechaNacimiento: ['', [Validators.required]],
                genero: ['', [Validators.required]],
                // password: ['', [Validators.required]],
                roles: ['', [Validators.required]],
                // empresa: ['', [Validators.required]],
                estado: ['', [Validators.required]],
            }
        );
    }

    inicializarUsuario() {
        this.fecha = '';
        return {
            id: '',
            email: '',
            nombres: '',
            apellidos: '',
            telefono: '',
            whatsapp: '',
            cargo: '',
            fechaNacimiento: '',
            genero: '',
            // password:"",
            roles: '',
            empresa: '',
            estado: ''
        };
    }

    ngAfterViewInit() {
        this.iniciarPaginador();

        this.obtenerListaUsuarios();
        this.obtenerListaRoles();
        this.obtenerCargoOpciones();
        this.obtenerGeneroOpciones();
    }

    obtenerListaUsuarios() {
        this._usuariosService.obtenerListaUsuarios({
            page: this.page - 1, page_size: this.page_size, tipoUsuario: 'credit'
        }).subscribe(info => {
            this.listaUsuarios = info.info;
            this.collectionSize = info.cont;
        });
    }

    obtenerListaRoles() {
        this._rolService.obtenerListaRoles({
            page: this.page - 1, page_size: this.page_size, tipoUsuario: 'corp'
        }).subscribe(info => {
            this.listaRoles = info.info;
            this.collectionSize = info.cont;
        });
    }

    obtenerListaEmpresas() {
        this._usuariosService.obtenerListaEmpresas({
            ruc: this.ruc
        }).subscribe((info) => {
                this.listaEmpresas = info.info;
            },
            (error) => {

            });
    }

    cambiarTipoUsuario() {
        this._usuariosService.obtenerEmpresa(this.usuario.empresa).subscribe((info) => {
            this.tipoUsuario = info.tipoEmpresa;
        });
    }

    toggleSidebar(name, id): void {
        this.idUsuario = id;
        if (this.idUsuario) {
            this._usuariosService.obtenerUsuario(this.idUsuario).subscribe((info) => {
                    this.usuario.empresa = '';
                    this.usuario = info;
                    if (info.infoUsuario) {
                        this.usuario.nombres = info.infoUsuario.nombres;
                        this.usuario.apellidos = info.infoUsuario.apellidos;
                        this.usuario.nombres = info.infoUsuario.nombres;
                        // info.fechaNacimiento = this.transformarFecha(info.infoUsuario.fechaNacimiento);
                        this.fecha = this.transformarFecha(info.infoUsuario.fechaNacimiento);
                        this.usuario.fechaNacimiento = this.transformarFecha(info.infoUsuario.fechaNacimiento);
                        this.usuario.cargo = info.infoUsuario.cargo;
                        this.usuario.genero = info.infoUsuario.genero;
                        this.usuario.whatsapp = info.infoUsuario.whatsapp;
                        this.usuario.telefono = info.infoUsuario.telefono;
                    }

                    if (info.empresa) {
                        this.listaEmpresas = [info.empresa];
                        this.usuario.empresa = info.empresa._id;
                        this.cambiarTipoUsuario();
                    }
                    if (info.roles.length) {
                        this.usuario.roles = info.roles[0]._id;
                    }
                },
                (error) => {
                    this.mensaje = 'No se ha podido obtener el usuario';
                    this.abrirModal(this.mensajeModal);
                });
        } else {
            this.usuario = this.inicializarUsuario();
        }
        this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
    }

    guardarUsuario() {
        this.usuarioSubmitted = true;
        if (this.usuarioForm.invalid) {
            return;
        }
        this.cargandoUsuario = true;
        if (this.idUsuario === '') {
            this._usuariosService.crearUsuario({
                ...this.usuario,
                tipoUsuario: 'credit',
                fechaNacimiento: this.transformarFecha(this.usuario.fechaNacimiento)
            }).subscribe((info) => {
                this.mensaje = 'Usuario creado correctamente';
                this.abrirModal(this.mensajeModal);
                this.obtenerListaUsuarios();
                this.toggleSidebar('guardarUsuario', '');
                this.cargandoUsuario = false;

            }, (error) => {
                this.mensaje = 'Error al crear el usuario';
                this.abrirModal(this.mensajeModal);
                this.toggleSidebar('guardarUsuario', '');
                this.cargandoUsuario = false;

            });
        } else {
            this._usuariosService.actualizarUsuario({
                ...this.usuario,
                tipoUsuario: this.tipoUsuario,
                fechaNacimiento: this.transformarFecha(this.usuario.fechaNacimiento)
            }).subscribe((info) => {
                this.mensaje = 'Usuario actualizado correctamente';
                this.abrirModal(this.mensajeModal);
                this.obtenerListaUsuarios();
                this.toggleSidebar('guardarUsuario', '');
                this.cargandoUsuario = false;

            }, (error) => {
                this.mensaje = 'Error al actualizar el usuario';
                this.abrirModal(this.mensajeModal);
                this.toggleSidebar('guardarUsuario', '');
                this.cargandoUsuario = false;

            });
        }
        // if (this.idEmpresa == "") {
        //   this._empresasService.crearEmpresa(this.empresa).subscribe((info) => {
        //     this.obtenerListaEmpresas();
        //     this.mensaje = "Empresa guardada con éxito";
        //     this.abrirModal(this.mensajeModal);
        //     this.toggleSidebar('guardarEmpresa', '');
        //   },
        //     (error) => {
        //       let errores = Object.values(error);
        //       let llaves = Object.keys(error);
        //       this.mensaje = "";
        //       errores.map((infoErrores, index) => {
        //         this.mensaje += llaves[index] + ": " + infoErrores + "<br>";
        //       });
        //       this.abrirModal(this.mensajeModal);
        //     });
        // } else {
        //   this._empresasService.actualizarEmpresa(this.empresa).subscribe((info) => {
        //     this.obtenerListaEmpresas();
        //     this.mensaje = "Empresa actualizada con éxito";
        //     this.abrirModal(this.mensajeModal);
        //     this.toggleSidebar('guardarEmpresa', '');

        //   },
        //     (error) => {
        //       let errores = Object.values(error);
        //       let llaves = Object.keys(error);
        //       this.mensaje = "";
        //       errores.map((infoErrores, index) => {
        //         this.mensaje += llaves[index] + ": " + infoErrores + "<br>";
        //       });
        //       this.abrirModal(this.mensajeModal);
        //     });
        // }

    }

    obtenerCargoOpciones() {
        this.paramService.obtenerListaPadres('CARGO').subscribe((info) => {
            this.tipoCargoOpciones = info;
        });
    }

    obtenerGeneroOpciones() {
        this.paramService.obtenerListaPadres('GENERO').subscribe((info) => {
            this.tipoGeneroOpciones = info;
        });
    }

    transformarFecha(fecha) {
        return this.datePipe.transform(fecha, 'yyyy-MM-dd');
    }

    eliminarUsuario() {
        this._usuariosService.eliminarUsuario(this.idUsuario).subscribe(() => {
                this.obtenerListaUsuarios();
                this.mensaje = 'Usuario eliminado correctamente';
                this.abrirModal(this.mensajeModal);
            },
            (error) => {
                this.mensaje = 'Ha ocurrido un error al eliminar el usuario';
                this.abrirModal(this.mensajeModal);
            });
    }

    get usuForm() {
        return this.usuarioForm.controls;
    }

    iniciarPaginador() {
        this.paginator.pageChange.subscribe(() => {
            this.obtenerListaUsuarios();
        });
    }

    eliminarUsuarioModal(id) {
        this.idUsuario = id;
        this.abrirModal(this.eliminarUsuarioMdl);
    }

    abrirModal(modal) {
        this._modalService.open(modal);
    }

    cerrarModal() {
        this._modalService.dismissAll();
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
