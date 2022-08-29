import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router, ParamMap } from "@angular/router";

import { Category } from "src/app/pages/categories/shared/category.model";
import { CategoryService } from "src/app/pages/categories/shared/category.service";

import { switchMap } from "rxjs/operators";
import Swal from "sweetalert2";


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
 id: number | any;

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

  submitForm(){
   this.submittingForm = true;

   if(this.currentAction == "new")
     this.createCategory();
   else // currentAction == "edit"
     this.updateCategory();
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

      /*this.route.queryParams.subscribe(params => {
        let id = params['id'];
        console.log({id})
      }*/
    this.id = this.route.snapshot.url[0].path
    this.categoryService.getById(this.id)
      .subscribe(
        (category) => {
          this.category = category;
          this.categoryForm.patchValue(category) // binds loaded category data to CategoryForm
        },
        (error) => alert('Ocorreu um erro no servidor, tente mais tarde.')
      )
    }
  }

  private createCategory(){
   const category: Category = Object.assign(new Category(), this.categoryForm.value);

   this.categoryService.create(category)
     .subscribe(
       category => this.actionsForSuccess(category),
       error => this.actionsForError(error)
     )
 }

 private updateCategory(){
  const category: Category = Object.assign(new Category(), this.categoryForm.value);

  this.categoryService.update(category)
    .subscribe(
      category => this.actionsForSuccess(category),
      error => this.actionsForError(error)
    )
}

private actionsForSuccess(category: Category){
  Swal.fire({
    title: 'Sucesso!',
    text: 'Solicitação processada com sucesso!' ,
    icon: 'success',
    timer: 3000,
    showConfirmButton: false
  })

  // redirect/reload component page
  this.router.navigateByUrl("categories", {skipLocationChange: true}).then(
    () => this.router.navigate(["categories", category.id, "edit"])
  )
}


  private actionsForError(error: any){
    Swal.fire({
      title: 'Erro!',
      text: 'Ocorreu um erro ao realizar a solicitação!' ,
      icon: 'error',
      timer: 3000,
      showConfirmButton: false
    })

    this.submittingForm = false;

    if(error.status === 422)
      this.serverErrorMessages = JSON.parse(error._body).errors;
    else
      this.serverErrorMessages = ["Falha na comunicação com o servidor. Por favor, tente mais tarde."]
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
