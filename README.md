# Frontend App

https://d273287pk6tneh.cloudfront.net/

# Product-Service

endpoints:
GET - https://42q5umkn1h.execute-api.ap-south-1.amazonaws.com/dev/products
GET - https://42q5umkn1h.execute-api.ap-south-1.amazonaws.com/dev/products/{productId}
POST - https://42q5umkn1h.execute-api.ap-south-1.amazonaws.com/dev/products
GET - https://icthj8lyjc.execute-api.ap-south-1.amazonaws.com/swagger
GET - https://icthj8lyjc.execute-api.ap-south-1.amazonaws.com/swagger.json
functions:
getProducts: product-service-dev-getProducts (23 kB)  
 getProductById: product-service-dev-getProductById (23 kB)
createProduct: product-service-dev-createProduct (23 kB)
catalogBatchProcess: product-service-dev-catalogBatchProcess (23 kB)
swaggerUI: product-service-dev-swagger-ui (23 kB)
swaggerJSON: product-service-dev-swagger-json (23 kB)

getProductsList endpoint: https://42q5umkn1h.execute-api.ap-south-1.amazonaws.com/dev/products
getProductsById endpoint: https://42q5umkn1h.execute-api.ap-south-1.amazonaws.com/dev/products/7567ec4b-b10c-48c5-9345-fc73348a80a1

create Product endpoint: https://42q5umkn1h.execute-api.ap-south-1.amazonaws.com/dev/products
with the request body:
{
"title":"Product11",
"description": "Nice product",
"price": 10,
"count": 10
}

## Import Service

endpoints:  
 GET - https://a4aa61csgk.execute-api.ap-south-1.amazonaws.com/dev/import
GET - https://2ho7uyyrb7.execute-api.ap-south-1.amazonaws.com/swagger
GET - https://2ho7uyyrb7.execute-api.ap-south-1.amazonaws.com/swagger.json
functions:
importProductsFile: import-service-dev-importProductsFile (8.9 kB)  
 importFileParser: import-service-dev-importFileParser (8.9 kB)
swaggerUI: import-service-dev-swagger-ui (8.9 kB)
swaggerJSON: import-service-dev-swagger-json (8.9 kB)

## Cart-Service

endpoints:  
 ANY - https://unsfhnjouj.execute-api.ap-south-1.amazonaws.com/dev/
ANY - https://unsfhnjouj.execute-api.ap-south-1.amazonaws.com/dev/{proxy+}
functions:
main: cart-service-dev-main (27 MB)
