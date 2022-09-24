import { Component } from '@angular/core';
import { BaseResourceListComponent} from "src/app/shared/base-resource-list/base-resource-list.component"
import { Category } from "src/app/pages/categories/shared/category.model";
import { CategoryService } from "src/app/pages/categories/shared/category.service";

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent extends BaseResourceListComponent<Category>{
  
  constructor(private categoryService: CategoryService) {
    super(categoryService)
   }

 }
