# Short-URL

## Deployment Setup Guide

### Step 1: Clone the Repository

```bash
git clone https://github.com/Pumrapee/Short-URL.git
cd Short-URL
```

### Step 2: Set Up Environment Variables

1. In the root directory, create a file named `project-env.sh`.
2. Add the following environment variables to `project-env.sh` (adjust values as needed):
   ```bash
   export MYSQL_HOST='mysql-db'
   export MYSQL_USER='root'
   export MYSQL_PASSWORD='mysql'
   export MYSQL_DATABASE='short_url_db'
   export DOMAIN_NAME=''                    # Your domain name
   export TZ=UTC
   ```
3. In the api-gateway directory edit the server_name in `default.conf` to match your domain name.

   ```bash
   server {
   listen 80 default_server;
   server_name domain_name;  # Your domain name

   location / {
       proxy_pass http://short-url-service:3000/url/;
   }

   location /qr/ {
       proxy_pass http://qr-generate-service:3001/qr/;
   }

   location /log/ {
       proxy_pass http://short-url-log-service:3002/log/;
   }

   error_page   500 502 503 504  /50x.html;
   location = /50x.html {
       root   /usr/share/nginx/html;
   }
   }
   ```

4. **Note**: For production environments, consider securing sensitive values (e.g., passwords) with Docker secrets.

### Step 3: Build and Start the Docker Containers

1. Run the following command to build and start the containers:

   ```bash
   docker-compose up --build -d
   ```

2. Docker Compose will now build and start each service:
   - `api-gateway`: Nginx container acting as the API gateway.
   - `short-url-service`, `qr-generate-service`, and `log-service`: Node.js-based microservices.
   - `mysql-db`: MySQL database container initialized with any scripts in `short-url-database/scripts`.

---
