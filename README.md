# Phuc An Website – Docker Compose Setup

The project consists of 3 main parts:

- **Server (Backend)**: Python (Flask/FastAPI) located in the `Server/` directory, running on port `3000`
- **Admin Interface**: Admin dashboard UI, located in the `client-admin/`directory, running on port `3001`
- **Customer Interface**: Customer-facing UI, located in the `client-customer/`directory, running on port `3002`

Deployed using `Docker Compose`, ensuring easy installation, management, and scalability.

---

## How to Start the System

### 1. Requirements
#### Clone the project
```bash
git clone https://github.com/minhquan1627/Project_MernStack.git
cd minhquan1627/Project_MernStack
```
#### Install Docker
- Make sure Docker Desktop is installed (https://www.docker.com/products/docker-desktop/)
- Supports Windows, macOS, or Linux

### 2. Steps to run

1. **Open Terminal / CMD / PowerShell in the root directory of the project**
2. **Run the following command to start the whole system**

```bash
docker compose up --build
```
Note: The first time you run it, Docker will take a few minutes to pull images and build containers.

### 3. Environment Configuration
Open the .env file inside the Server/ directory if you need to configure database or internal settings:
```env
DB_USER=minhquan1627
DB_PASS=minhquan1627
DB_SERVER=cluster0.pmpo0.mongodb.net
DB_NAME=Database

# 👉 Dùng để build URI tự động trong code:
# mongodb+srv://<DB_USER>:<DB_PASS>@<DB_SERVER>/<DB_NAME>?retryWrites=true&w=majority
```

### 4.  Build & Run in Production

```bash
docker-compose build
docker-compose up -d
```

### 5. Access the Website

| Service          | Access URL                                     |
| ---------------- | ---------------------------------------------- |
| Backend API      | [http://localhost:3000](http://localhost:3000) |
| Customer Website | [http://localhost:3002](http://localhost:3002) |
| Admin Website    | [http://localhost:3001](http://localhost:3001) |

## Real-world Production Deployment
### Choosing the API URL
Based on the environment:

| Scenario                            | Environment Variable                            |
| ----------------------------------- | ----------------------------------------------- |
| Running with local `docker-compose` | `REACT_APP_API_BASE_URL=http://backend:3000`    |
| Running with domain + Nginx + SSL   | `REACT_APP_API_BASE_URL=https://api.domain.com` |

#### Example using real domain:
Assuming you’ve pointed:

https://admin.yourdomain.com → cổng 3001 (client-admin)

https://www.yourdomain.com → cổng 3002 (client-customer)

https://api.yourdomain.com → cổng 3000 (backend)

```env
REACT_APP_API_BASE_URL=https://api.yourdomain.com
```
After updating the .env, rebuild the frontend:
```bash
# Trong thư mục client-customer
docker-compose build client-customer
```




