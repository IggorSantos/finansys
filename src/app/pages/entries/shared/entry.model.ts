import { Category } from '../../categories/shared/category.model'
import { BaseResourceModel } from 'src/app/shared/models/base-resource.model'

export class Entry extends BaseResourceModel {
  constructor(
   public override id?: number,
   public name?: string,
   public description?: string,
   public type?: string,
   public amount?: string,
   public date?: string,
   public paid?: string,
   public categoryId?: number,
   public category?: Category
 ){ 
  super();
 }

 static types = {
   expense: 'Despesa',
   revenue: 'Receita'
 }

 static fromJson(jsonData: any): Entry {
  return Object.assign(new Entry(), jsonData);
}


}
