import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';

export class SetTokenAction {
  static readonly type = '[Token] Set Token';

  constructor(public token: string) {}
}

export class ResetTokenAction {
  static readonly type = '[Token] Reset Token';

  constructor() {}
}

export class TokenStateModel {
  public token: string;
}

const tokenStateModelDefaults: TokenStateModel = {
  token: ''
}

@State<TokenStateModel>({
  name: 'tokenState',
  defaults: tokenStateModelDefaults  
})

@Injectable()
export class TokenState {
  constructor() {}

  @Action(SetTokenAction)
  setToken(ctx: StateContext<TokenStateModel>, action: SetTokenAction) {
    ctx.patchState({token: action.token});
  }

  @Action(ResetTokenAction)
  resetToken(ctx: StateContext<TokenStateModel>) {
    ctx.setState(tokenStateModelDefaults);
  }

  @Selector()
  static getToken(state: TokenStateModel) {
    return state.token;
  }
}