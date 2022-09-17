import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { Entry } from "../shared/entry.model";
import { EntryService } from "../shared/entry.service";

import { Category } from "../../categories/shared/category.model";
import { CategoryService } from "../../categories/shared/category.service";

import { switchMap } from "rxjs/operators";

import Swal from "sweetalert2";

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css']
})
export class EntryFormComponent implements OnInit, AfterContentChecked{

  currentAction: string = '';
  entryForm: FormGroup | any;
  pageTitle: string = '';
  serverErrorMessages: string[] = [];
  submittingForm: boolean = false;
  entry: Entry = new Entry();
  categories: Array<Category> = [];
  id: number | any;

  ptBR = {
    firstDayOfWeek: 0,
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    dayNamesMin: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sa'],
    monthNames: [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
      'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ],
    monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    today: 'Hoje',
    clear: 'Limpar'
  }

  constructor(
    private entryService: EntryService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.setCurrentAction();
    this.buildEntryForm();
    this.loadEntry();
    this.loadCategories();
  }

  ngAfterContentChecked(){
    this.setPageTitle();
  }

  get typeOptions(): Array<any>{
   return Object.entries(Entry.types).map(
     ([value, text]) => {
       return {
         text: text,
         value: value
       }
     }
   )
 }

  submitForm(){
    this.submittingForm = true;

    if(this.currentAction == "new")
      this.createEntry();
    else // currentAction == "edit"
      this.updateEntry();
  }


  // PRIVATE METHODS

  private setCurrentAction() {
    if(this.route.snapshot.url[0].path == "new")
      this.currentAction = "new"
    else
      this.currentAction = "edit"
  }

  private buildEntryForm() {
    this.entryForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null],
      type: [null, [Validators.required]],
      amount: [null, [Validators.required]],
      date: [null, [Validators.required]],
      paid: [true, [Validators.required]],
      categoryId: [null, [Validators.required]]
    });
  }

  private loadEntry() {
    if (this.currentAction == "edit") {

      /*this.route.queryParams.subscribe(params => {
        let id = params['id'];
        console.log({id})
      }*/
    this.id = this.route.snapshot.url[0].path
    this.entryService.getById(this.id)
      .subscribe(
        (entry) => {
          this.entry = entry;
          this.entryForm.patchValue(entry) // binds loaded category data to CategoryForm
        },
        (error) => alert('Ocorreu um erro no servidor, tente mais tarde.')
      )
    }
  }

  private loadCategories(){
   this.categoryService.getAll().subscribe(
     categories => this.categories = categories
   );
 }


  private setPageTitle() {
    if (this.currentAction == 'new')
      this.pageTitle = "Cadastro de Novo Lançamento"
    else{
      const entryName = this.entry.name || ""
      this.pageTitle = "Editando Lançamento: " + entryName;
    }
  }


  private createEntry(){
    const entry: Entry = Entry.fromJson(this.entryForm.value)

    this.entryService.create(entry)
      .subscribe(
        entry => this.actionsForSuccess(entry),
        error => this.actionsForError(error)
      )
  }


  private updateEntry(){
    const entry: Entry = Entry.fromJson(this.entryForm.value)

    this.entryService.update(entry)
      .subscribe(
        entry => this.actionsForSuccess(entry),
        error => this.actionsForError(error)
      )
  }


  private actionsForSuccess(entry: Entry){
    Swal.fire({
      title: 'Sucesso!',
      text: 'Solicitação processada com sucesso!' ,
      icon: 'success',
      timer: 3000,
      showConfirmButton: false
    })

    // redirect/reload component page
    this.router.navigateByUrl("entries", {skipLocationChange: true}).then(
      () => this.router.navigate(["entries", entry.id, "edit"])
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
}
