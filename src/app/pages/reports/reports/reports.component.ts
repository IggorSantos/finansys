import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Category } from "../../categories/shared/category.model";
import { CategoryService } from "../../categories/shared/category.service";

import { Entry } from "../../entries/shared/entry.model";
import { EntryService } from "../../entries/shared/entry.service";

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  expenseTotal: any = 0;
  revenueTotal: number = 0;
  balance: any = 0;  

  aux: number = 0;

  categories: Category[] = [];
  entries: Entry[] = [];

  @ViewChild('month') month: ElementRef | any = null;
  @ViewChild('year') year: ElementRef | any = null;


  constructor(private entryService: EntryService, private categoryService: CategoryService) { }
   
  ngOnInit(): void {
    this.categoryService.getAll()
      .subscribe(categories => this.categories = categories);
  }

  generateReports() {
    const month = this.month.nativeElement.value;
    const year = this.year.nativeElement.value;

    if(!month || !year)
      alert('Você precisa selecionar o Mês e o Ano para gerar os relatórios')
    else
      this.entryService.getByMonthAndYear(month, year).subscribe(this.setValues.bind(this))
  }

  private setValues(entries: Entry[]){
    this.entries = entries;
    this.calculateBalance();    
  }

  private calculateBalance(){
    let expenseTotal:number = 0;
    let revenueTotal:number = 0;

    this.entries.forEach(entry => {
      if(entry.type == 'revenue'){ 
        //this.aux = (Number(entry.amount))
        //console.log(typeof this.aux)
        revenueTotal += Number(entry.amount);
        
      }
      else
        expenseTotal += Number(entry.amount);
    });

    this.expenseTotal = expenseTotal
    this.revenueTotal = revenueTotal
    this.balance = revenueTotal - expenseTotal
  }

}
