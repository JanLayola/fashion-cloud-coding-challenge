import { Component, OnInit } from '@angular/core';
import Product from "../../models/Product/Product";
import ProductService, { IProductsPaginated, SortType } from "../../services/product/product.service";
import { ICardProperties } from "../card/card.component";
import { BrandService } from "../../services/brand/brand.service";
import { CategoryService } from "../../services/category/category.service";
import { Observable } from "rxjs";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.less']
})
export class ProductListComponent implements OnInit {
  items: ICardProperties[] = [];

  brands: string[] = [];
  categories: string[] = [];
  sortItems: string[] = [SortType.PRICE_DESC, SortType.PRICE_ASC, SortType.STOCK_DESC, SortType.STOCK_ASC]

  selectedBrand: string = '';
  selectedCategory: string = '';
  selectedSortType: string = '';

  isLoading: boolean = true;
  canShowMoreItems: boolean = false;

  page: number = 1;
  productsPerPage: number = 12;

  constructor(
    private productService: ProductService,
    private brandService: BrandService,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this._showInitialProducts();
    this._getBrands();
    this._getCategories();
  }

  protected showMore(): void {
    this.page += 1;
    this._showMoreProducts();
  }

  protected resetFilters (): void {
    this.selectedBrand = '';
    this.selectedCategory = '';
    this.selectedSortType = '';

    this._showInitialProducts();
  }

  protected selectBrandToFilter(brand: string) {
    this.selectedBrand = this._getNewSelectedItem(brand);
    this._showInitialProducts();
  }

  protected selectCategoryToFilter(category: string) {
    this.selectedCategory = this._getNewSelectedItem(category);
    this._showInitialProducts();
  }

  protected selectSortType(sortType: string) {
    this.selectedSortType = this._getNewSelectedItem(sortType);
    this._showInitialProducts();
  }

  protected getNoItemsText(): string {
    return 'No luck on the threads hunt! Our clothes are on vacation, probably sipping mocktails on a fashion beach.\n' +
      'We\'re working on the rescue mission, so sit tight for the stylish comeback! 🌴👗✨';
  }

  protected getNoMoreItemsText(): string {
    return 'Ran out of threads! Time for a fashion refill. Switch up those filters and stay tuned for more choices! 👖🌈';
  }

  private _getNewSelectedItem(selectedItem: string): string {
    return selectedItem === 'clear' ? '' : selectedItem
  }

  private _getProducts(): Observable<IProductsPaginated> {
    return this.productService
      .getAllProductsPaginated({page: this.page, productsPerPage: this.productsPerPage, brand: this.selectedBrand, category: this.selectedCategory, sortBy: this.selectedSortType})
  }

  private _getBrands(): void {
    this.brandService.getAllBrands().subscribe({
      next: (response: string[]) => this.brands = response,
    })
  }

  private _getCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (response: string[]) =>
        this.categories = response,
    })
  }

  private _showInitialProducts(): void {
    this.isLoading = true;
    this.page = 1;
    this.items = [];
    this._getProducts().subscribe({
      next: (response: IProductsPaginated) => {
        this.isLoading = false;
        this._checkIfMoreResultsExists(response.totalResults);
        this.items = [...this.items, ...this._convertProductToItem(response.results)];
      },
      error: () => this.isLoading = false
    })
  }

  private _showMoreProducts(): void {
    this._getProducts().subscribe({
      next: (response: IProductsPaginated) => {
        this._checkIfMoreResultsExists(response.totalResults);
        this.items = [...this.items, ...this._convertProductToItem(response.results)];
      }
    })
  }

  private _checkIfMoreResultsExists(totalResults: number): void {
    if(totalResults <= this.items.length + this.productsPerPage) {
      this.canShowMoreItems = false;
      return;
    }
    this.canShowMoreItems = true;
  }

  private _convertProductToItem(products: Product[]): ICardProperties[] {
    return products.map((product: Product) => product.convertToItem());
  }
}
