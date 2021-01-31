import { TokenState, TokenStateModel } from './token/token-state';

export interface AppState {
    tokenStateModel: TokenStateModel;
}

export const states = [TokenState];
