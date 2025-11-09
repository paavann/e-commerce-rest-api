# E-Commerce REST API

A comprehensive RESTful API for an e-commerce platform built with Node.js, Express.js, and PostgreSQL. This API supports user authentication, product management with image uploads, category management, shopping cart functionality, and order processing with advanced filtering capabilities.

## Features

### User Management
- JWT-based authentication with secure password hashing
- Role-based access control (Admin & Customer)
- User registration and login endpoints

### Product Management (Admin)
- Complete CRUD operations for products
- Image upload integration with Cloudinary
- Category assignment for products
- Stock management

### Category Management (Admin)
- Create, update, delete, and list product categories
- Organize products into logical groups

### Product Discovery (Customer)
- Advanced filtering by price range, category, and product name
- Pagination support for efficient data loading
- Search functionality

### Shopping Cart & Orders (Customer)
- Add/remove items from cart
- View cart contents
- Place orders with persistent pricing
- Order history tracking
- Persistent Cart Pricing: Original prices are maintained even if product prices change after items are added to cart

### Additional Features
- Comprehensive Swagger API documentation
- Input validation using express-validator
- Security best practices with helmet and CORS
- Automated testing suite with Jest/Mocha

## Tech Stack

- **Backend Framework**: Node.js with Express.js
- **Database**: PostgreSQL
- **ORM**: Sequelize
- **Authentication**: JWT (JSON Web Tokens)
- **Image Storage**: Cloudinary
- **File Upload**: Multer
- **Validation**: express-validator
- **API Documentation**: Swagger
- **Testing**: Jest / Mocha & Chai
- **Security**: Helmet, CORS

## Prerequisites

Before running this application, ensure you have the following installed:

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn
- Cloudinary account (for image uploads)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ecommerce-api
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ecommerce_db
DB_USER=your_db_user
DB_PASSWORD=your_db_password

# JWT Configuration
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
```

4. Set up the database:
```bash
# Create database
createdb ecommerce_db

# Run migrations
npm run migrate

# (Optional) Seed database with sample data
npm run seed
```

## Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The API will be available at `http://localhost:3000`

## API Documentation

Once the server is running, access the Swagger documentation at:
```
http://localhost:3000/api-docs
```

The Swagger UI provides interactive documentation for all available endpoints, request/response schemas, and allows you to test the API directly from the browser.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and receive JWT token

### Products (Admin)
- `GET /api/products` - List all products with filters
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product (with image upload)
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Categories (Admin)
- `GET /api/categories` - List all categories
- `GET /api/categories/:id` - Get category by ID
- `POST /api/categories` - Create new category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

### Cart (Customer)
- `GET /api/cart` - View cart contents
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:itemId` - Update cart item quantity
- `DELETE /api/cart/:itemId` - Remove item from cart

### Orders (Customer)
- `GET /api/orders` - View order history
- `GET /api/orders/:id` - Get order details
- `POST /api/orders` - Place new order from cart

## Product Filtering

The product listing endpoint supports the following query parameters:

- `category` - Filter by category ID
- `minPrice` - Minimum price range
- `maxPrice` - Maximum price range
- `search` - Search by product name
- `page` - Page number for pagination (default: 1)
- `limit` - Items per page (default: 10)

Example:
```
GET /api/customers/products?category=1&minPrice=10&maxPrice=100&search=laptop&page=1&limit=20
```

## Testing

Run the test suite:
```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

The test suite includes:
- User authentication tests (signup, login)

## Security Features

- Password hashing using bcrypt
- JWT token-based authentication
- Protected routes with role-based access control
- Input validation and sanitization
- CORS configuration
- Helmet.js for security headers
- SQL injection prevention through Sequelize ORM
- XSS protection

## Error Handling

The API uses consistent error responses:

```json
{
  "success": false,
  "error": "Error message",
  "statusCode": 400
}
```

Success responses:
```json
{
  "success": true,
  "data": {},
  "message": "Operation successful"
}
```

## Environment Variables

All sensitive configuration is stored in environment variables. Never commit the `.env` file to version control.

## Acknowledgments

This project was developed as part of a Node.js backend assignment for Ailoitte Technologies, focusing on e-commerce API development and demonstrating proficiency in RESTful API design, authentication, database management, file uploads, and testing.

Assignment provided by Ailoitte Technologies (https://www.ailoitte.com/)