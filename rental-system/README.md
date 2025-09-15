# Rental System

## Overview
The Rental System is a full-stack application that allows users to manage rental listings. It consists of a React frontend and a Django backend, providing a seamless experience for users to view, add, and manage rental properties.

## Project Structure
```
rental-system
├── backend
│   ├── rental_system
│   ├── rentals
│   ├── manage.py
│   └── requirements.txt
└── frontend
    ├── public
    ├── src
    ├── package.json
    ├── tsconfig.json
    └── README.md
```

## Technologies Used
- **Frontend**: React, TypeScript
- **Backend**: Django, Django REST Framework
- **Database**: SQLite (default for Django, can be configured)

## Getting Started

### Backend Setup
1. Navigate to the `backend` directory.
2. Create a virtual environment:
   ```
   python -m venv venv
   ```
3. Activate the virtual environment:
   - On Windows:
     ```
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```
     source venv/bin/activate
     ```
4. Install the required packages:
   ```
   pip install -r requirements.txt
   ```
5. Run migrations:
   ```
   python manage.py migrate
   ```
6. Start the Django development server:
   ```
   python manage.py runserver
   ```

### Frontend Setup
1. Navigate to the `frontend` directory.
2. Install the dependencies:
   ```
   npm install
   ```
3. Start the React development server:
   ```
   npm start
   ```

## API Endpoints
The backend provides a RESTful API for managing rentals. The endpoints can be accessed at `http://localhost:8000/api/rentals/`.

## Contributing
Contributions are welcome! Please feel free to submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.