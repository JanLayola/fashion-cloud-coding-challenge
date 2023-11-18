import {Deserializable} from "../Deserializable/Deserializable";

export interface IApiProducts {
  gtin: string;
  name: string;
  image: string;
  category: string;
  stock: number;
  price: number;
  brandName: string;
}

export default class Product implements Deserializable{
  id: string;
  name: string;
  image: string;
  category: string;
  availableStockUnits: number;
  price: number;
  brandName: string;

  constructor(
    id?: string,
    name?: string,
    image?: string,
    category?: string,
    availableStockUnits?: number,
    price?: number,
    brandName?: string
  )
  {
    this.id = id || '';
    this.name = name || '';
    this.image = image || '';
    this.category = category || '';
    this.availableStockUnits = availableStockUnits || 0;
    this.price = price || 0;
    this.brandName = brandName || '';
  }

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getImage(): string {
    return `./assets/productImages/${this.image}`;
  }

  public getImageDescription(): string {
    return `${this.getBrandName()} ${this.getName()} image`;
  }

  public getPrice(): string {
    return `${this.price.toLocaleString("nl-NL", {style: 'currency', currency: "EUR"})}`;
  }

  public getStock(): number {
    return this.availableStockUnits;
  }

  public getBrandName(): string {
    return this.brandName;
  }

  deserialize(apiProducts: IApiProducts): this {
    this.id = apiProducts.gtin;
    this.name = apiProducts.name;
    this.image = apiProducts.image;
    this.category = apiProducts.category;
    this.availableStockUnits = apiProducts.stock;
    this.price= apiProducts.price;
    this.brandName = apiProducts.brandName;

    return this
  }
}
