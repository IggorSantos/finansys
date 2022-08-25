import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { Category } from "src/app/pages/categories/shared/category.model";
import { CategoryService } from "src/app/pages/categories/shared/category.service";

import { switchMap } from "rxjs/operators";


@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.css']
})
export class CategoriesFormComponent implements OnInit, AfterContentChecked {
 currentAction: string | any;
 categoryForm: FormGroup | any;
 pageTitle: string | any;
 serverErrorMessages: string[] = [];
 submittingForm: boolean = false;
 category: Category = new Category();

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

    ngOnInit(): void {
      this.setCurrentAction();
      this.buildCategoryForm();
      this.loadCategory();
    }

    ngAfterContentChecked(){
      this.setPageTitle();
    }

    private setCurrentAction() {
      if(this.route.snapshot.url[0].path == "new")
        this.currentAction = "new"
      else
        this.currentAction = "edit"
    }

    private buildCategoryForm() {
    this.categoryForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null]
    });
  }

  private loadCategory() {
    if (this.currentAction == "edit") {

      this.route.queryParams.subscribe(params => {
        let id = params['id'];
        console.log({id})
      }
    )
      /*.subscribe(
        (category) => {
          this.category = category;
          this.categoryForm.patchValue(category) // binds loaded category data to CategoryForm
        },
        (error) => alert('Ocorreu um erro no servidor, tente mais tarde.')
      )*/
    }
  }

  private setPageTitle() {
   if (this.currentAction == 'new')
     this.pageTitle = "Cadastro de Nova Categoria"
   else{
     const categoryName = this.category.name || ""
     this.pageTitle = "Editando Categoria: " + categoryName;
   }
 }
}
