import { Component, OnInit } from '@angular/core';
import {ProductsService} from "../../services/products.service";
import {Product} from "../../model/product.model";
import {catchError, map, Observable, of, startWith} from "rxjs";
import {AppDataState, DataStateEnum} from "../../state/product.state";
import {Router} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  // Par Convention en met un $ a la fin
  products$ ?: Observable<AppDataState<Product[]>>

  //affecter un type a une variable et on le recupere dans la partie HTML
  readonly DataStateEnum = DataStateEnum;

  // Pour Premiere Methode products ?: Product[];
  //or products : Product[] | null=null;

  constructor(private productsService: ProductsService, private router:Router) { }

  ngOnInit(): void {
  }

  onGetAllProducts() {
  /* Une premiere MEthode pour detecter l'erreur
   this.productsService.getAllProducts().subscribe(data =>{
      this.products = data;
    }, error => {
      console.log(error);
    })*/

    // Il faut declarer un Type pour le State, sinn erreur
    // @ts-ignore

    this.products$ =
      this.productsService.getAllProducts().pipe(
        map(data =>{
          return ({dataState:DataStateEnum.LOADED, data:data})
        }),

        //startWith: retourne un resultat avant que la requete ne sois envoyer
        startWith({dataState: DataStateEnum.LOADING}),
        catchError(err=> of({dataState: DataStateEnum.ERROR, errorMessage:err.message}))
        );

    /* pipe on peut utiliser des operateurs,ex: map, startWith, catchError*/

  }

  onGetSelectedProducts() {

    this.products$ =
      this.productsService.getSelectedProducts().pipe(
        map(data =>{
          return ({dataState:DataStateEnum.LOADED, data:data})
        }),
        //startWith: retourne un resultat avant que la requete ne sois envoyer
        startWith({dataState: DataStateEnum.LOADING}),
        catchError(err=> of({dataState: DataStateEnum.ERROR, errorMessage:err.message}))
      );

  }
  onGetAvailableProducts() {
    this.products$ =
      this.productsService.getAvailableProducts().pipe(
        map(data =>{
          return ({dataState:DataStateEnum.LOADED, data:data})
        }),

        //startWith: retourne un resultat avant que la requete ne sois envoyer
        startWith({dataState: DataStateEnum.LOADING}),
        catchError(err=> of({dataState: DataStateEnum.ERROR, errorMessage:err.message}))
      );
  }

  onSearch(dataForm:any) {
    this.products$ =
      this.productsService.searchProducts(dataForm.keyword).pipe(
        map(data =>{
          return ({dataState:DataStateEnum.LOADED, data:data})
        }),

        //startWith: retourne un resultat avant que la requete ne sois envoyer
        startWith({dataState: DataStateEnum.LOADING}),
        catchError(err=> of({dataState: DataStateEnum.ERROR, errorMessage:err.message}))
      );
}

  onSelect(p:Product) {
    this.productsService.select(p)
      .subscribe(data => {
        p.selected = data.selected;
      })
  }

  onDelete(p:Product) {
    let v = confirm("Etes vous sur?");
    if(v == true)
  this.productsService.deleteProduct(p)
    .subscribe(data => {
      this.onGetAllProducts();
    })
  }

  onNewProducts() {
    this.router.navigateByUrl("/newProduct")
  }

  onEdit(p: Product) {
    this.router.navigateByUrl("/editProduct/" + p.id);
  }
}
