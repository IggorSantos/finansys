import { Component, OnInit } from '@angular/core';
import { Category } from "src/app/pages/categories/shared/category.model";
import { CategoryService } from "src/app/pages/categories/shared/category.service";

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {
  categories: any[] = [];

  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.categoryService.getAll().subscribe(categories => {
      this.categories = categories
      console.log(this.categories)
    }, (err: any) => {
      console.error(err)
    })    
  }

}
