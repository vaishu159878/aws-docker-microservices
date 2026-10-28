# Microservices Deployment on AWS using Docker & NGINX

## About the Project

In this project, I am learning how to deploy multiple microservices using Docker, Docker Compose, and NGINX.

I created two simple Node.js applications: User Service and Order Service. Both services run in separate Docker containers, and NGINX works as a reverse proxy to send requests to the correct service.

I first set up and tested everything locally on my Windows machine. My next step is to deploy the same project on AWS EC2.

## Architecture

```text
             Browser / Client
                    |
                    v
              NGINX (Port 80)
                    |
          +---------+---------+
          |                   |
          v                   v
     /users/ route        /orders/ route
          |                   |
          v                   v
     User Service        Order Service
      Port 3001            Port 3002
```

For local testing, I use port `8080` on my computer, which maps to port `80` inside the NGINX container.

## Technologies Used

- AWS EC2 (deployment planned)
- Ubuntu (planned for EC2)
- Docker
- Docker Compose
- NGINX
- Node.js
- Git and GitHub
- PowerShell

## Project Structure

```text
aws-docker-microservices/
├── user-service/
│   ├── app.js
│   └── Dockerfile
├── order-service/
│   ├── app.js
│   └── Dockerfile
├── nginx/
│   └── default.conf
├── docs/
├── docker-compose.yml
├── .gitignore
└── README.md
```

## What I Have Done

### 1. Created Two Microservices

I created two simple Node.js applications.

- User Service runs on port `3001`.
- Order Service runs on port `3002`.

Both applications return a JSON response when a request reaches them.

### 2. Created Docker Images

I wrote a Dockerfile for each service and built the images using Docker Compose.

I used the Node.js Alpine image and configured both containers to run as a non-root user.

### 3. Configured NGINX

I configured NGINX to route requests to the correct service.

- `/users/` routes requests to User Service.
- `/orders/` routes requests to Order Service.
- `/health` returns a simple health response from NGINX.

### 4. Used Docker Compose

I created a `docker-compose.yml` file to run all three containers together.

Docker Compose creates a network for the services, so NGINX can communicate with the application containers using their service names.

I did not publish ports `3001` and `3002` on my computer. Requests go through NGINX.

## How to Run the Project

### Prerequisites

- Git installed
- Docker Desktop installed and running
- Docker Compose available

### Step 1: Clone the Repository

```bash
git clone https://github.com/vaishu159878/aws-docker-microservices.git
cd aws-docker-microservices
```

### Step 2: Build and Start Containers

```bash
docker compose up -d --build
```

### Step 3: Check Containers

```bash
docker compose ps
```

### Step 4: Test the Application

I configured port `8080` for local testing.

Test the NGINX health endpoint:

```powershell
curl.exe http://localhost:8080/health
```

Test User Service:

```powershell
curl.exe http://localhost:8080/users/
```

Test Order Service:

```powershell
curl.exe http://localhost:8080/orders/
```

Expected responses:

**Health check**

```text
NGINX is healthy
```

**User Service**

```json
{
  "service": "user-service",
  "message": "User Service is running successfully"
}
```

**Order Service**

```json
{
  "service": "order-service",
  "message": "Order Service is running successfully"
}
```

I also tested these endpoints from inside the NGINX container and received the expected responses.

## Problems I Faced

### Port 80 Was Already in Use

When I started the containers, Docker showed that port `80` was already allocated.

I changed the local port mapping from `80:80` to `8080:80` and started the containers again.

### NGINX Configuration Error

NGINX initially failed to start because the configuration file contained an invisible UTF-8 BOM character at the beginning.

I checked the container logs, identified the error, rewrote the file using UTF-8 without BOM, and validated the configuration using:

```bash
docker compose run --rm --no-deps nginx nginx -t
```

After fixing the file, NGINX started successfully.

These issues helped me practise reading Docker logs, identifying configuration errors, and troubleshooting containers.

## Current Status

- [x] Created User Service
- [x] Created Order Service
- [x] Built Docker images
- [x] Configured NGINX reverse proxy
- [x] Created Docker Compose configuration
- [x] Fixed the NGINX configuration error
- [x] Verified the health and service routes from inside NGINX
- [ ] Complete local endpoint testing from Windows
- [ ] Deploy the project on AWS EC2
- [ ] Configure AWS Security Groups
- [ ] Test the deployed application
- [ ] Add deployment screenshots
- [ ] Add CI/CD and monitoring

## What I Learned

While working on this project, I practised:

- Building Docker images using Dockerfiles
- Running multiple containers using Docker Compose
- Configuring NGINX as a reverse proxy
- Understanding communication between containers
- Checking container logs and