# CNDB-M27

## Overview
This project is about a record database with search functionality.

## Prerequisites
- Node.js (version v18.17.1 or higher)
- npm (version 9.6.7 or higher)
- Ensure you have the necessary database setup as per the project's requirements.

## Getting Started

### Backend Setup

1. **Navigate to the backend directory**:
    ```bash
    cd backend
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Configure the database**:
    - Change the database credentials in the `.env` file according to your local setup.

4. **Start the backend server**:
    ```bash
    npm run start
    ```

### Frontend Setup

1. **Navigate to the frontend directory**:
    ```bash
    cd frontend
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Start the frontend development server**:
    ```bash
    npm run dev
    ```

## Running the Project
Once you have both the backend and frontend servers running, open your browser and navigate to the address provided by the frontend development server, typically `http://localhost:5173`.

## .env Configuration
If no .env found inside backend folder. Make one and define these infos below.

```plaintext
# .env file example for backend
CLIENT_URL = "http://localhost:5173"
SERVER_PORT = 3000
NODE_ENV = "development"
SERVER_URL = "localhost"
BASE_PATH = "/api/"
HTTP_PROTOCOL = "http://"
# Postgresql Database Config
db_HOST = "localhost"
db_USER = "postgres"
db_PASSWORD = "freshhappinesseveryday"
db_PORT = 5433,
db_DB = "records-system"
# JWT Config
ACCESS_TOKEN_SECRET = "81c08663502831db6bb41bdd56ebb56c452ec3a6add993f505a9be0a7b3bed2d8a123995c35adc2ce2a9ec6d0187d69538f1496644a9784186da2adb626dd435"
REFRESH_TOKEN_SECRET = "2816cb963a831f36ec869459a74e53981dc7ec4df49fe3d4ec241f83935b817c10df0531f356e9f9a0face4e69259572c94d55186aeaab71f3e182b72f92022c"
#Superadmin Credentials
SUPERADMIN_DEFAULT_USERNAME="admin"
SUPERADMIN_DEFAULT_PASS="admin"
#Upload directory path
UPLOAD_PATH="./uploads/"
