import { TokenState, TokenStateModel } from './token/token-state';
import { UsuarioState, UsuarioStateModel } from './usuario/usuario-state';

export interface AppState {
    tokenStateModel: TokenStateModel,
    usuarioStateModel: UsuarioStateModel;
}

export const states = [TokenState, UsuarioState];
