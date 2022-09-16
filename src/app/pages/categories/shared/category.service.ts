import { Injectable } from '@angular/core';
import { BaseResourceService } from "../../../shared/services/base-resource.service";

import { Category } from "./category.model";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiPath: string = "http://localhost:3000/posts";

  constructor(
    private http: HttpClient
  ) { }

  
}
