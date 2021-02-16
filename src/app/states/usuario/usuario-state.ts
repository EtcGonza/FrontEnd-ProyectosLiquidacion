import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { RespuestaAuthentication } from '../../models/respuestaAuthentication';

export class SetUsuarioAction {
  static readonly type = '[Usuario] Set Usuario';
  constructor(public respuestaAuthentication: RespuestaAuthentication) {}
}

export class ResetUsuarioAction {
  static readonly type = '[Usuario] Reset Usuario';
  constructor() {}
}

export class UsuarioStateModel {
  public respuestaAuthentication: RespuestaAuthentication;
}

const UsuarioStateModelDefaults: UsuarioStateModel = {
  respuestaAuthentication: null
}

@State<UsuarioStateModel>({
  name: 'usuarioState',
  defaults: UsuarioStateModelDefaults  
})

@Injectable()
export class UsuarioState {
  constructor() {}

  @Action(SetUsuarioAction)
  setUsuario(ctx: StateContext<UsuarioStateModel>, action: SetUsuarioAction) {
    ctx.patchState({respuestaAuthentication: action.respuestaAuthentication});
  }

  @Action(ResetUsuarioAction)
  resetUsuario(ctx: StateContext<UsuarioStateModel>) {
    ctx.setState(UsuarioStateModelDefaults);
  }

  @Selector()
  static getUserName(state: UsuarioStateModel) {
    return state.respuestaAuthentication.username;
  }

  @Selector()
  static getIdEmpleado(state: UsuarioStateModel) {
    return state.respuestaAuthentication.idEmpleado;
  }

  @Selector()
  static getIdRol(state: UsuarioStateModel) {
    return state.respuestaAuthentication.idRol;
  }
}