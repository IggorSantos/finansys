import { Component, OnInit, Injector } from '@angular/core';
import { Validators } from "@angular/forms";

import { BaseResourceFormComponent } from "../../../shared/components/base-resource-form/base-resource-form.component"

import { Entry } from "../shared/entry.model";
import { EntryService } from "../shared/entry.service";

import { Category } from "../../categories/shared/category.model";
import { CategoryService } from "../../categories/shared/category.service";
import { ExpressionStatement } from '@angular/compiler';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css']
})
export class EntryFormComponent extends BaseResourceFormComponent<Entry> implements OnInit{

  
  categories: Array<Category> = [];

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

  optionsSelect = [{value: 'expense', text: 'Despesa'}, {value: 'revenue', text: 'Receita'}]

  constructor(protected entryService: EntryService, protected categoryService: CategoryService, protected override injector: Injector) {
    super(injector, new Entry(), entryService, Entry.fromJson)
   }

  override ngOnInit() {
    this.loadCategories();
    super.ngOnInit()
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

  // PRIVATE METHODS

  protected buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
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

  private loadCategories(){
   this.categoryService.getAll().subscribe(
     categories => this.categories = categories
   );
 }
}
