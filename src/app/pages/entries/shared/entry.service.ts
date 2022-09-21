import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable, throwError } from "rxjs";
import { map, catchError, flatMap } from "rxjs/operators";

import { Entry } from "./entry.model";
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';

@Injectable({
  providedIn: 'root'
})
export class EntryService extends BaseResourceService<Entry>{
    constructor(protected override injector: Injector) { 
      super("http://localhost:3000/comments", injector, Entry.fromJson)
  }

  override getAll(): Observable<any[]>{
    return this.http.get<any[]>(this.apiPath).pipe(
      catchError(this.handleError),
      map((obj) => obj)
    )
  }



  //Private Methods
  protected jsonDataToEntries(jsonData: any[]): Entry[]{
    const entries: Entry[] = [];

    jsonData.forEach(element => {
     const entry = Entry.fromJson(element)
     entries.push(entry);
   });

   return entries;
}

  protected jsonDataToEntry(jsonData: any): Entry {
     return Entry.fromJson(jsonData)
   }

}
