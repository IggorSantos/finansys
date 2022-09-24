import { Component, OnInit, Inject } from '@angular/core';

import { BaseResourceModel } from "src/app/shared/models/base-resource.model";
import { BaseResourceService } from "src/app/shared/services/base-resource.service";

@Inject({})

export class BaseResourceListComponent <T extends BaseResourceModel> implements OnInit {

  resources: T[] = [];

  constructor(private resourceService: BaseResourceService<T>) { }

  ngOnInit() {
    this.resourceService.getAll().subscribe(
      resources => this.resources = resources,
      error => alert('Erro ao carregar a lista')
    )
    console.log(this.resources)

  }


  deleteResource(Resource: any) {
    const mustDelete = confirm('Deseja realmente excluir este item?');

    if (mustDelete){
      this.resourceService.delete(Resource.id).subscribe(
        () => this.resources = this.resources.filter(element => element != Resource),
        () => alert("Erro ao tentar excluir!")
      )
    }
  }

}
