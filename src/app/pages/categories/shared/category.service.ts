import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from "../../../shared/services/base-resource.service";

import { Category } from "./category.model";

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseResourceService<Category>{
  
  constructor(protected override injector: Injector) {
    super("http://localhost:3000/posts", injector, Category.fromJson)
   }

  
}
