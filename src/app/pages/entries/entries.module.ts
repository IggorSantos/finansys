import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";

import { EntriesRoutingModule } from './entries-routing.module';
import { EntryListComponent } from "./entry-list/entry-list.component";
import { EntryFormComponent } from "./entry-form/entry-form.component";

import { CalendarModule } from "primeng-lts/calendar";
import {InputNumberModule} from 'primeng-lts/inputnumber';


@NgModule({
  declarations: [EntryListComponent,EntryFormComponent],
  imports: [
    CommonModule,
    EntriesRoutingModule,
    ReactiveFormsModule,
    CalendarModule,
    InputNumberModule
  ]
})
export class EntriesModule { }
