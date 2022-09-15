import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { CategoriesFormComponent } from './categories-form/categories-form.component';


@NgModule({
  declarations: [
    CategoriesListComponent,
    CategoriesFormComponent
  ],
  imports: [
    SharedModule,
    CategoriesRoutingModule,
    
  ]
})
export class CategoriesModule { }
