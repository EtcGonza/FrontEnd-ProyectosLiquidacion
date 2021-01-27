import { Injectable } from '@angular/core';
import Swal, { SweetAlertResult } from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})

export class MensagesAlertService {

  constructor() {}

  private colorConfirmButton = '#129793';
  private colorConfirmCancel = '#f88379';

  ventanaExitosa(titulo: string, textoCuerpo?: string) {
    Swal.fire({
      icon: 'success',
      title: titulo,
      text: textoCuerpo,
      showConfirmButton: true,
      confirmButtonText: 'Aceptar',
      confirmButtonColor: this.colorConfirmButton,
      heightAuto: false
    });
  }

  ventanaError(titulo: string, texto: string) {
    Swal.fire({
      icon: 'error',
      title: titulo,
      text: texto,
      showConfirmButton: true,
      confirmButtonColor: this.colorConfirmButton,
      heightAuto: false
    })
  }

  ventanaWarning(titulo: string, texto: string) {
    Swal.fire({
      icon: 'warning',
      title: titulo,
      text: texto,
      showConfirmButton: true,
      confirmButtonText: 'Aceptar',
      confirmButtonColor: this.colorConfirmButton,
      heightAuto: false
    })
  }

  ventanaConfirmar(titulo: string, textoCuerpo: string): Promise<SweetAlertResult<any>> {
    return Swal.fire({
      title: titulo,
      text: textoCuerpo,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.colorConfirmButton,
      cancelButtonColor: this.colorConfirmCancel,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      heightAuto: false
    });
  }
}
