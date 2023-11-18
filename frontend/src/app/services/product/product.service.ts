import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import { map, Observable } from "rxjs";
import Product, { IApiProducts } from "../../models/Product/Product";

export enum SortType {
  PRICE_ASC = 'Price: Low-High',
  PRICE_DESC = 'Price: High-Low',
  STOCK_ASC = 'Stock: Low-High',
  STOCK_DESC = 'Stock: High-Low'
}
export interface IProductsPaginated {
  results: Product[],
  totalResults: number
}

interface IApiResponse {
  results: IApiProducts[],
  totalResults: number
}

@Injectable({
  providedIn: 'root'
})
export default class ProductService {

  constructor(private httpService: HttpClient) { }

  public getAllProductsPaginated(
    {
      page = 1,
      productsPerPage = 12,
      brand = '',
      category = '',
      sortBy = ''

  }): Observable<IProductsPaginated> {
    let params: HttpParams = new HttpParams();

    params.set('page', page)
    params.set('limit', productsPerPage)

    const getUrl = ():string => {
      let url = '/product/getAll?'
      if(page) url += `page=${page}`;
      if(productsPerPage) url += `&limit=${productsPerPage}`;

      if(brand) url += `&brand=${brand}`;
      if(category) url += `&category=${category}`;

      if(sortBy === SortType.PRICE_DESC) url += `&sortBy=price&sortDir=-1`;
      if(sortBy === SortType.PRICE_ASC) url += `&sortBy=price&sortDir=1`;
      if(sortBy === SortType.STOCK_DESC) url += `&sortBy=stock&sortDir=-1`;
      if(sortBy === SortType.STOCK_ASC) url += `&sortBy=stock&sortDir=1`;

      return url
    }

    return this.httpService.get<IApiResponse>(getUrl()).pipe(
      map((response: IApiResponse) => {
        const results: Product[] = response.results.map((product: IApiProducts) => new Product().deserialize(product))
        const productsPaginated: IProductsPaginated = {
          results,
          totalResults: response.totalResults
          }

          return productsPaginated
        })
    )
  }
}

