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
        proxy_pass http://short-url-fe/;
    }

    location /url/ {
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
4. In the short-url-front directory edit the VITE_API_URL in `.env.production` to match your domain name.
   ```bash
   VITE_API_URL=${DOMAIN_NAME}  # your domain name
   ```

5. **Note**: For production environments, consider securing sensitive values (e.g., passwords) with Docker secrets.

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

## Endpoints
### **Short URL Service**
1. **Endpoint:** `POST /shorten`
   - **Description:** Generates a new Short URL for a given original URL.
   - **Request Body:**
     ```json
     {
       "originalUrl": "http://example.com"
     }
     ```
   - **Responses:**
     - **200:** Returns the generated Short URL.
     - **500:** Database error.

2. **Endpoint:** `GET /:shortUrl`
   - **Description:** Redirects to the original URL for a given Short URL and logs the access.
   - **URL Parameters:**
     - `shortUrl`: The short URL ID.
   - **Responses:**
     - **302:** Redirects to the original URL.
     - **404:** URL not found.
     - **500:** Database error.

---

### **QR Generate Service**
- **Endpoint:** `POST /qr/generate`
  - **Description:** Generates a QR code for the provided Short URL. If a QR code already exists for the URL, it returns the existing one; otherwise, it generates a new one.
  - **Request Body:**
    ```json
    {
      "shortUrl": "http://example.com/shortUrlId"
    }
    ```
  - **Responses:**
    - **200:** Returns the QR code as an image.
    - **404:** URL not found.
    - **500:** Server error.

---

### **Short URL Log Service**

1. **Endpoint:** `GET /log/totalClicked`  
   - **Description:** Retrieves the total count of all clicks on all Short URLs.  
   - **Responses:**  
     - **200:** Returns the total clicked count.  
     - **404:** Log not found.  
     - **500:** Database error.  

2. **Endpoint:** `GET /log/totalClicked/:shortUrl`  
   - **Description:** Retrieves the total click count for a specific Short URL.  
   - **URL Parameters:**  
     - `shortUrl`: The Short URL ID to retrieve click data for.  
   - **Responses:**  
     - **200:** Returns the total clicked count for the specific Short URL.  
     - **404:** Log not found.  
     - **500:** Database error.  

3. **Endpoint:** `GET /log/url`  
   - **Description:** Retrieves the complete list of all Short URLs.  
   - **Responses:**  
     - **200:** Returns a list of URLs.  
     - **500:** Database error.  

4. **Endpoint:** `GET /log/totalUrl`  
   - **Description:** Retrieves the total count of all stored Short URLs.  
   - **Responses:**  
     - **200:** Returns the total URL count.  
     - **500:** Database error.  

5. **Endpoint:** `GET /log/:shortUrl`  
   - **Description:** Retrieves all logs for a specific Short URL, including details like timestamps and user interactions.  
   - **URL Parameters:**  
     - `shortUrl`: The Short URL ID to retrieve logs for.  
   - **Responses:**  
     - **200:** Returns the logs for the specified Short URL.  
     - **404:** Log not found.  
     - **500:** Database error.  

---
