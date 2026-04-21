# Test App

## Description
A Node.js Express API for a task management system.

## Getting Started

### Prerequisites
- Node.js (v12 or higher)
- MongoDB

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/test-app.git
   cd test-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example` and fill in your configuration.

### Running the Application
```bash
npm start
```

### Running with Docker
```bash
docker-compose up
```

### API Endpoints
- `POST /api/tasks` - Create a new task
- `GET /api/tasks` - Retrieve all tasks
- `GET /api/tasks/:id` - Retrieve a task by ID
- `PUT /api/tasks/:id` - Update a task by ID
- `DELETE /api/tasks/:id` - Delete a task by ID
