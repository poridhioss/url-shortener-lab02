# url-shortener-lab02

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
BASE_URL=http://localhost:3000
```

4. Run the project

```bash
docker-compose up --build -d
```

Check the containers:

```bash
docker ps -a
```

5. Test the project

POST request to create a short URL  

```bash
curl -X POST http://localhost:3000/urls -H "Content-Type: application/json" -d '{"longUrl": "https://www.google.com"}' | jq
```

> Make sure to install `jq` to parse the JSON response.

```bash
sudo apt update
sudo apt install jq -y
```

GET request to redirect to the long URL

```bash
curl -X GET http://localhost:3000/urls/<shortUrlId>
```






