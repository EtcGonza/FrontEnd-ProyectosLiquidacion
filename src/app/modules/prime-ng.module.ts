import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonModule} from 'primeng/button';
import {SplitButtonModule} from 'primeng/splitbutton';
import {MenubarModule} from 'primeng/menubar';
import {InputTextModule} from 'primeng/inputtext';
import { SharedModule } from 'primeng/api';
import {PasswordModule} from 'primeng/password';
import {TableModule} from 'primeng/table';
import {TooltipModule} from 'primeng/tooltip';
import {DropdownModule} from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {InputNumberModule} from 'primeng/inputnumber';
import {CardModule} from 'primeng/card';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    SplitButtonModule,
    MenubarModule,
    SharedModule,
    InputTextModule,
    PasswordModule,
    TableModule,
    TooltipModule,
    DropdownModule,
    TagModule,
    InputTextareaModule,
    InputNumberModule,
    CardModule
  ],
  exports: [
    ButtonModule,
    SplitButtonModule,
    MenubarModule,
    SharedModule,
    InputTextModule,
    PasswordModule,
    TableModule,
    TooltipModule,
    DropdownModule,
    TagModule,
    InputTextareaModule,
    InputNumberModule,
    CardModule
  ]
})
export class PrimeNgModule { }
