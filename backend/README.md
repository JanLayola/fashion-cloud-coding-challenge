# Backend

The backend of the Fashion Cloud SRP project serves as the backbone for delivering a swift and efficient product 
browsing experience to retailers. Developed with scalability and speed in mind, the backend ensures seamless 
communication between the frontend and the MongoDB database, accommodating the vast array of products available on the 
Fashion Cloud B2B platform.

## How to run it locally

```shell
# Install npm dependencies
npm install 

# Start the dev server at http://localhost:8000.
# The application will automatically reload if you change any of the source files.
npm run dev 
```

## Routes docs
## /getAll

The `/getAll` route is a fundamental endpoint in the Fashion Cloud SRP Backend, designed to retrieve a list of products 
based on specified criteria. This route provides essential functionality for populating the Search Result Page (SRP) 
on the frontend, allowing retailers to browse and select products efficiently.

### Endpoint Details

- **Method**: GET
- **Endpoint**: `/getAll`

## Request Parameters

The `/getAll` route supports the following query parameters:

1. **brand** (optional): Filters products based on the specified brand.
    - Example: `/getAll?brand=Aurora`

2. **category** (optional): Filters products based on the specified category.
    - Example: `/getAll?category=shirt`

3. **limit** (optional): Specifies number of results per page.
    - Example: `/getAll?limit=10`

4. **page** (optional): Specifies the page number for paginated results.
    - Example: `/getAll?page=2`

## Response

The API response is a JSON object containing an array of products (results) that match the specified criteria. Each 
product object includes properties such as GTIN, name, image, category, stock, price, and brand name. And the number of 
pages and items found for pagination purposes.

Example:

```json
{
  "results": [
    {
      "GTIN": "1234567890123",
      "name": "Product Name",
      "image": "product-image.jpg",
      "category": "shirt",
      "stock": 100,
      "price": 30,
      "brand": "Aurora"
    }, 
    // ... additional products
  ],
  "pages": 5,
  "totalResults": 123
}
```

## Notes
- If no filtering or sorting criteria are specified, the route defaults to sorting by highest stock.

