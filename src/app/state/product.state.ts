// Il contient 3 attributs
//data qui contient les donnees que je veux afficher
// dataState qui est un enumerateur qui peut etre soit: LOADING,LOADED, ERROR
//errorMessage type string

// ? ca veut dire qu'il est facultatif

export enum DataStateEnum {
  LOADING,
  LOADED,
  ERROR
}
// <T> prend un type generique T
export interface AppDataState<T> {
  dataState ?: DataStateEnum,
  data ?: T, // ca peut etre liste de produits ou de qqch de generique
  errorMessage ?: string
}
