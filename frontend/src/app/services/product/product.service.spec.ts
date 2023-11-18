import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import ProductService from "./product.service";

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    });
    service = TestBed.inject(ProductService)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it('should get all products', inject([ProductService, HttpTestingController], (service: ProductService, httpMock: HttpTestingController) => {
  //   const mockProducts: IApiProducts[] = [
  //     { gtin: '1234567890123', name: 'Product 1', image: 'img1.jpg', category: 'Category 1', stock: 10, price: 99.99, brandName: 'Brand 1' },
  //     { gtin: '4567890123456', name: 'Product 2', image: 'img2.jpg', category: 'Category 2', stock: 20, price: 49.99, brandName: 'Brand 2' }
  //   ];
  //
  //   service.getAllProducts().subscribe((products: Product[]) => {
  //     expect(products.length).toBe(mockProducts.length);
  //     expect(products[0].getId()).toBe(mockProducts[0].gtin);
  //     expect(products[1].getName()).toBe(mockProducts[1].name);
  //     expect(products[1].getStock()).toBe(mockProducts[1].stock);
  //   });
  //
  //   const req = httpMock.expectOne('/product/getAll');
  //   expect(req.request.method).toBe('GET');
  //   req.flush({ results: mockProducts });
  //
  //   httpMock.verify();
  // }));
});
