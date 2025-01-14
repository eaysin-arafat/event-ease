# EventEase - Event Management Platform

EventEase is a web application for seamless event management. Users can create and manage events, register for them, and receive real-time updates about attendee registrations and event modifications.

## Features

### Backend Features:

#### User Authentication:

- Users can register and log in using their email and password.
- Secure API endpoints to allow only authenticated users to create or register for events.

#### Event Management:

- API endpoints to create, update, and delete events, including event details like:
  - Name
  - Date
  - Location
  - Max Attendees
  - Created By

#### Attendee Registration:

- Users can register for events with a limitation based on the event’s maximum number of attendees.

#### Real-time Updates:

- Socket.IO integration to provide real-time updates for:
  - New attendee registrations
  - Event updates or when the event reaches full capacity

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/event-ease.git
cd event-ease
```

### 2. Install Dependencies

Using Yarn:

```bash
yarn install
```

or using NPM:

```bash
npm install
```

### 3. Set Up Environment Variables

Create a .env file in the root directory with the following environment variables:

```bash
NODE_ENV="development"
PORT="4000"
DB_CONNECTION_URL="mongodb+srv://eaysinarafat:XB4siJQheDWOCmV2@cluster0.lwys0.mongodb.net/event-ease?retryWrites=true&w=majority"
DB_NAME="event-ease"
DB_USERNAME="eaysin-arafat"
DB_PASSWORD="XB4siJQheDWOCmV2"
APPLICATION_NAME="Event-Ease"
JWT_SECRET="441122f5a7bea277a33a39661225d63866bbc9a6cb7b5cc383c31c3"
JWT_EXPIRATION="1d"
```

### 4. Run the Project

For development:

```bash
yarn dev
```

For production build:

```bash
yarn build
yarn start
```

## Backend API Endpoints

1. User Authentication
   - `POST /api/auth/signup`: Register a new user.
   - `POST /api/auth/login`: Login with email and password.
   - `GET /api/auth/me`: Get the currently authenticated user.
2. Event Management
   - `POST /api/events`: Create a new event.
   - `PUT /api/events/:id`: Update an existing event.
   - `DELETE /api/events/`:id: Delete an event.
   - `GET /api/events`: Get a list of all events.
3. Attendee Registration
   - `POST /api/events/:id/register`: Register for an event.
4. Real-time Notifications
   - Socket.IO: Real-time updates for attendee registrations and event modifications. Emit notifications when:
     - A new attendee registers for an event.
     - An event's details are updated or when the event reaches maximum capacity.

## Project Structure

```bash
    .
    ├── .env                    # Environment configuration
    ├── .gitignore               # Git ignore file
    ├── README.md                # Project documentation
    ├── jest.config.js           # Jest configuration
    ├── openapi.yml              # API documentation using Swagger (OpenAPI)
    ├── package.json             # Project dependencies and scripts
    ├── project_structure.txt    # Project structure details
    ├── public                   # Static files
    │   ├── api-docs             # Swagger API docs
    │   ├── index.html           # Frontend entry point
    ├── src                      # Source code
    │   ├── api                  # API route handlers
    │   ├── app.ts               # Application setup
    │   ├── config               # Configuration files
    │   ├── database             # Database connection logic
    │   ├── errors               # Custom error classes
    │   ├── lib                  # Business logic
    │   ├── middleware           # Middlewares (authentication, error handling)
    │   ├── models               # Mongoose models
    │   ├── routes               # API routes definitions
    │   ├── schemas              # Validation schemas (Zod)
    │   ├── sockets              # Real-time socket event handlers
    │   ├── types                # TypeScript types
    │   └── utils                # Utility functions
    ├── tsconfig.json            # TypeScript configuration
    └── yarn.lock                # Yarn lock file
```

## Technologies Used

- Express: Web framework for Node.js.
- Socket.IO: For real-time communication.
- Mongoose: ODM for MongoDB.
- JWT (JSON Web Tokens): For secure authentication.
- Zod: Schema validation.
- Swagger UI Express: For API documentation.
- BcryptJS/Bcrypt: For password hashing.

## Running Tests

To run tests, use the following command:

```bash
yarn test
```

## OpenAPI Documentation

For detailed API documentation, you can refer to the OpenAPI YAML file.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Eaysin Arafat

Developer at EventEase

### Explanation:

- **OpenAPI YAML**: The OpenAPI file is mentioned as a link (`openapi.yml`) in the README for easy reference.
- **Project Details**: The structure and installation instructions are clearly stated for users and developers.
- **Technologies Used**: Lists the core technologies powering the backend.
