import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { EntriesRoutingModule } from './entries-routing.module';
import { EntryListComponent } from "./entry-list/entry-list.component";
import { EntryFormComponent } from "./entry-form/entry-form.component";

import { CalendarModule } from "primeng-lts/calendar";
import {InputNumberModule} from 'primeng-lts/inputnumber';


@NgModule({
  declarations: [EntryListComponent,EntryFormComponent],
  imports: [
    SharedModule,
    EntriesRoutingModule,
    CalendarModule,
    InputNumberModule
  ]
})
export class EntriesModule { }
