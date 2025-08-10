# url-shortener-lab02

## Overview
A URL shortening service built with Node.js, Express, MongoDB, and enhanced with Nginx Layer 7 load balancing capabilities.

## Architecture
```
Internet → Nginx Load Balancer (Port 80) → Node.js App (Port 3000) → MongoDB
```

## Features
- ✅ URL shortening and redirection
- ✅ Visit tracking and analytics
- ✅ Nginx Layer 7 load balancing
- ✅ Rate limiting and security headers
- ✅ Gzip compression
- ✅ Health checks
- ✅ Comprehensive logging
- ✅ Docker containerization

## Quick Start

1. Clone the repository

```bash
git clone https://github.com/poridhioss/url-shortener-lab02.git
```

2. Install dependencies

```bash
cd url-shortener-lab02
npm install
```

3. Create a `.env` file and set the environment variables

```bash
PORT=3000
MONGO_URI=mongodb://localhost:27017/url_shortener
BASE_URL=http://localhost
```

4. Run the project with load balancer

```bash
docker-compose up --build -d
```

Check the containers:

```bash
docker ps -a
```

## Load Balancer Configuration

### Nginx Features
- **Layer 7 Load Balancing**: Application-level load balancing
- **Rate Limiting**: 
  - API endpoints: 10 requests/second with 20 burst
  - Redirect endpoints: 100 requests/second with 50 burst
- **Security Headers**: XSS protection, frame options, content type options
- **Gzip Compression**: Optimized for JSON and text responses
- **Health Checks**: Built-in health monitoring
- **Logging**: Access and error logs with custom format

### Service Architecture
```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Nginx (80)   │───▶│  Node.js (3000)  │───▶│   MongoDB      │
│  Load Balancer │    │   URL Service    │    │   Database      │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

### Port Mapping
- **External Access**: Port 80 (Nginx)
- **Internal App**: Port 3000 (Node.js)
- **Database**: Port 27017 (MongoDB)

## API Endpoints

### Create Short URL
```bash
curl -X POST http://localhost/urls \
  -H "Content-Type: application/json" \
  -d '{"longUrl": "https://www.google.com"}' | jq
```

### Redirect to Original URL
```bash
curl -X GET http://localhost/<shortUrlId>
```

### Health Check
```bash
curl http://localhost/health
```

## Testing

### Basic Functionality
```bash
# Test health endpoint
curl http://localhost/health

# Create short URL
curl -X POST http://localhost/urls \
  -H "Content-Type: application/json" \
  -d '{"longUrl": "https://www.google.com"}'

# Test redirect
curl -I http://localhost/<shortUrlId>
```

### Load Balancer Features
```bash
# Test rate limiting
for i in {1..15}; do
  curl -X POST http://localhost/urls \
    -H "Content-Type: application/json" \
    -d '{"longUrl": "https://example.com"}'
done

# Test health monitoring
docker-compose ps
```

### Run Complete Test Suite
```bash
./test-load-balancer.sh
```

## Monitoring and Logs

### Container Logs
```bash
# Nginx logs
docker-compose logs nginx

# Application logs
docker-compose logs app

# Database logs
docker-compose logs mongodb
```

### Nginx Logs
```bash
# Access logs
docker exec -it url-shortener-lab02-nginx-1 cat /var/log/nginx/access.log

# Error logs
docker exec -it url-shortener-lab02-nginx-1 cat /var/log/nginx/error.log
```

## Configuration

### Nginx Configuration
The Nginx configuration is located in `nginx/nginx.conf` and includes:
- Upstream backend configuration
- Rate limiting zones
- Security headers
- Gzip compression
- Custom logging format
- Health check endpoint

### Environment Variables
- `PORT`: Application port (default: 3000)
- `MONGO_URI`: MongoDB connection string
- `BASE_URL`: Base URL for short URLs

## Scaling

### Horizontal Scaling
To scale the application horizontally:

1. Modify `docker-compose.yml`:
```yaml
app:
  deploy:
    replicas: 3
```

2. Update Nginx upstream in `nginx/nginx.conf`:
```nginx
upstream url_shortener_backend {
    server app:3000;
    server app2:3000;
    server app3:3000;
}
```


