import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MyComponentsModule } from './modules/my-components.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppHttpInterceptor } from './httpInterceptor/httpInterceptor';
import { NgxsModule } from '@ngxs/store';
import { environment } from '../environments/environment.prod';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { states } from '../app/states/states'

@NgModule({
  declarations: [AppComponent],
  imports: [
    NgxsModule.forRoot(states, {
      developmentMode: !environment.production
    }),
    NgxsStoragePluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    BrowserModule,
    MyComponentsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  // providers: [{provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true},],
  bootstrap: [AppComponent]
})
export class AppModule { }
