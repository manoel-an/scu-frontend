import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { PanelModule } from 'primeng/panel';

@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    TooltipModule,
    RouterModule,
    ConfirmDialogModule,
    MessagesModule,
    MessageModule,
    PanelModule,
  ],
  exports: [
    NavbarComponent,
    TooltipModule,
    CommonModule,
    RouterModule,
    ConfirmDialogModule,
    MessagesModule,
    MessageModule,
    PanelModule,
  ]
})
export class CoreModule { }
