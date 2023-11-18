import { ICardProperties } from '../../components/card/card.component';
import Product, { IApiProducts } from "./Product";

describe('Product', () => {
  let productService: Product;
  let mockApiProducts: IApiProducts;

  beforeEach(() => {
    productService = new Product();
    mockApiProducts = {
      gtin: '123456789',
      name: 'Test Product',
      image: 'test-image.jpg',
      category: 'Test Category',
      stock: 10,
      price: 19,
      brandName: 'Test Brand',
    };
  });

  it('should create an instance', () => {
    expect(productService).toBeTruthy();
  });

  it('should return correct values from methods', () => {
    productService.deserialize(mockApiProducts);

    expect(productService.getId()).toEqual(mockApiProducts.gtin);
    expect(productService.getName()).toEqual(mockApiProducts.name);
    expect(productService.getImage()).toEqual(`./assets/productImages/${mockApiProducts.image}`);
    expect(productService.getImageDescription())
      .toEqual(`${mockApiProducts.brandName} ${mockApiProducts.name} image`);
    expect(productService.getPrice()).toEqual('€ 19,00');
    expect(productService.getStock()).toEqual(mockApiProducts.stock);
    expect(productService.getBrandName()).toEqual(mockApiProducts.brandName);

    const convertedItem: ICardProperties = productService.convertToItem();
    expect(convertedItem.title).toEqual(mockApiProducts.name);
    expect(convertedItem.subtitle).toEqual('€ 19,00');
    expect(convertedItem.image).toEqual(`./assets/productImages/${mockApiProducts.image}`);
    expect(convertedItem.rightInfo).toEqual('10');
  });
});
