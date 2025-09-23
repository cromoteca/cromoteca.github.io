---
title: "Docker Production Best Practices"
description: "Essential Docker practices for production deployments, including security, performance optimization, and container orchestration strategies."
category: "technical"
date: "December 23, 2024"
readTime: 12
---

# Docker Production Best Practices

Moving Docker containers from development to production requires careful consideration of security, performance, and operational concerns. This comprehensive guide covers the essential practices for running Docker containers successfully in production environments.

## Dockerfile Optimization

A well-optimized Dockerfile is the foundation of efficient production containers:

### 1. Multi-stage Builds

Reduce image size and improve security by separating build and runtime environments:

```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copy source and build
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine AS production
WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Copy built application
COPY --from=builder --chown=nextjs:nodejs /app/dist ./dist
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./

# Switch to non-root user
USER nextjs

EXPOSE 3000
CMD ["node", "dist/server.js"]
```

### 2. Layer Optimization

Minimize image size and improve build cache efficiency:

```dockerfile
# Bad: Installs packages every time source changes
COPY . .
RUN npm install

# Good: Cache package installation layer
COPY package*.json ./
RUN npm ci --only=production
COPY . .

# Even better: Use .dockerignore
# .dockerignore file:
node_modules
npm-debug.log
.git
.env
*.md
tests/
```

### 3. Security Hardening

```dockerfile
FROM node:18-alpine

# Update packages and remove package manager
RUN apk update && apk upgrade && \
    apk add --no-cache dumb-init && \
    rm -rf /var/cache/apk/*

# Create dedicated user
RUN addgroup -g 1001 -S appgroup && \
    adduser -S appuser -u 1001 -G appgroup

WORKDIR /app

# Set proper permissions
COPY --chown=appuser:appgroup . .

# Switch to non-root user
USER appuser

# Use dumb-init for proper signal handling
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "server.js"]
```

## Container Security

Security should be built into every layer of your container infrastructure:

### 1. Image Security Scanning

```bash
# Scan images for vulnerabilities
docker scout cves my-app:latest

# Using Trivy for comprehensive scanning
trivy image my-app:latest

# Integrate into CI/CD pipeline
- name: Run Trivy vulnerability scanner
  uses: aquasecurity/trivy-action@master
  with:
    image-ref: 'my-app:${{ github.sha }}'
    format: 'sarif'
    output: 'trivy-results.sarif'
```

### 2. Runtime Security

```bash
# Run with restricted capabilities
docker run --rm \
  --cap-drop=ALL \
  --cap-add=NET_BIND_SERVICE \
  --read-only \
  --tmpfs /tmp \
  --tmpfs /var/run \
  my-app:latest

# Use security profiles
docker run --rm \
  --security-opt=no-new-privileges:true \
  --security-opt=seccomp=seccomp-profile.json \
  my-app:latest
```

> ⚠️ **Security Warning**: Never run containers as root in production. Always create and use dedicated users with minimal privileges.

## Resource Management

Proper resource allocation prevents containers from consuming excessive system resources:

### 1. Memory and CPU Limits

```bash
# Set resource limits
docker run -d \
  --name my-app \
  --memory="512m" \
  --memory-swap="1g" \
  --cpus="1.5" \
  --restart=unless-stopped \
  my-app:latest

# Docker Compose example
version: '3.8'
services:
  app:
    image: my-app:latest
    deploy:
      resources:
        limits:
          memory: 512M
          cpus: '1.5'
        reservations:
          memory: 256M
          cpus: '0.5'
    restart: unless-stopped
```

### 2. Health Checks

```dockerfile
# In Dockerfile
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1
```

```yaml
# In Docker Compose
version: '3.8'
services:
  app:
    image: my-app:latest
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 60s
```

## Logging and Monitoring

Comprehensive logging and monitoring are crucial for production operations:

### 1. Structured Logging

```javascript
// Application logging (Node.js example)
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

// Log with context
logger.info('User login', {
  userId: 12345,
  ip: req.ip,
  userAgent: req.get('User-Agent')
});
```

### 2. Container Monitoring

```bash
# Docker stats for resource monitoring
docker stats --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.NetIO}}"
```

```yaml
# Using Prometheus with cAdvisor
version: '3.8'
services:
  cadvisor:
    image: gcr.io/cadvisor/cadvisor:latest
    ports:
      - "8080:8080"
    volumes:
      - /:/rootfs:ro
      - /var/run:/var/run:ro
      - /sys:/sys:ro
      - /var/lib/docker/:/var/lib/docker:ro
      - /dev/disk/:/dev/disk:ro

  prometheus:
    image: prom/prometheus:latest
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
```

## Container Orchestration

For production deployments, container orchestration is essential:

### Kubernetes Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
      - name: my-app
        image: my-app:v1.2.3
        ports:
        - containerPort: 3000
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        env:
        - name: NODE_ENV
          value: "production"
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: db-secret
              key: url
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5
```

## CI/CD Pipeline Integration

Automate your container builds and deployments:

```yaml
# GitHub Actions example
name: Build and Deploy
on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4

    - name: Set up Docker Buildx
      uses: docker/setup-buildx-action@v3

    - name: Login to Container Registry
      uses: docker/login-action@v3
      with:
        registry: ghcr.io
        username: ${{ github.actor }}
        password: ${{ secrets.GITHUB_TOKEN }}

    - name: Build and push
      uses: docker/build-push-action@v5
      with:
        context: .
        push: true
        tags: |
          ghcr.io/${{ github.repository }}:latest
          ghcr.io/${{ github.repository }}:${{ github.sha }}
        cache-from: type=gha
        cache-to: type=gha,mode=max

    - name: Deploy to production
      run: |
        kubectl set image deployment/my-app \
          my-app=ghcr.io/${{ github.repository }}:${{ github.sha }}
```

> 💡 **Pro Tip**: Use semantic versioning for your container tags and never use `latest` in production. It makes rollbacks much easier and deployments more predictable.

## Backup and Disaster Recovery

Plan for data persistence and disaster scenarios:

### 1. Volume Management

```bash
# Named volumes for persistent data
docker volume create app-data

docker run -d \
  --name my-app \
  --mount source=app-data,target=/app/data \
  my-app:latest

# Backup volumes
docker run --rm \
  --mount source=app-data,target=/data \
  --mount type=bind,source=$(pwd)/backup,target=/backup \
  alpine tar czf /backup/app-data-$(date +%Y%m%d).tar.gz -C /data .
```

### 2. Blue-Green Deployments

```bash
#!/bin/bash
# Blue-green deployment script
NEW_VERSION=$1
CURRENT=$(docker ps --filter "name=my-app-blue" --format "{{.Names}}" | head -1)

if [[ $CURRENT == "my-app-blue" ]]; then
    NEW_COLOR="green"
    OLD_COLOR="blue"
else
    NEW_COLOR="blue"
    OLD_COLOR="green"
fi

# Deploy new version
docker run -d --name "my-app-$NEW_COLOR" \
  -p 8080:3000 \
  "my-app:$NEW_VERSION"

# Health check
sleep 30
if curl -f http://localhost:8080/health; then
    # Switch traffic (update load balancer/proxy)
    update_load_balancer "my-app-$NEW_COLOR"

    # Stop old version
    docker stop "my-app-$OLD_COLOR"
    docker rm "my-app-$OLD_COLOR"

    echo "Deployment successful!"
else
    echo "Health check failed, rolling back..."
    docker stop "my-app-$NEW_COLOR"
    docker rm "my-app-$NEW_COLOR"
    exit 1
fi
```

## Performance Optimization

Optimize containers for production performance:

### 1. Image Layer Caching

```dockerfile
# Use BuildKit for advanced caching
export DOCKER_BUILDKIT=1

# Cache mounts for package managers
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./

# Cache npm packages across builds
RUN --mount=type=cache,target=/root/.npm \
    npm ci --only=production

COPY . .
RUN npm run build
```

### 2. Runtime Optimization

```dockerfile
# Use init system for proper signal handling
FROM node:18-alpine
RUN apk add --no-cache tini
ENTRYPOINT ["/sbin/tini", "--"]

# Optimize Node.js for containers
ENV NODE_ENV=production
ENV NODE_OPTIONS="--max-old-space-size=512"

# Use PM2 for clustering
RUN npm install -g pm2
CMD ["pm2-runtime", "start", "ecosystem.config.js"]
```

## Conclusion

Production Docker deployments require attention to security, performance, monitoring, and operational concerns. Start with these practices and gradually add more sophisticated patterns as your infrastructure grows. Remember to:

- Always use specific image tags in production
- Implement comprehensive monitoring and alerting
- Regularly update base images and scan for vulnerabilities
- Test your disaster recovery procedures
- Document your deployment processes

With these practices in place, you'll have a robust, secure, and scalable container infrastructure ready for production workloads.