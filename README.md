
## Installation
```bash
    evental-supplies-reactjs-2004
    ├── docs
    └── installation.md
```

Install node modules with npm, open terminal in evental-supplies-reactjs-2004 directory

```bash
  npm install -f
```
    
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`VITE_API_URL = 'VITE_API_URL'`
`VITE_MAP_KEY = 'VITE_MAP_KEY'`

You can rename env.default to .env

## Run Locally

Clone the project

```bash
  git clone PROJECT_URL
```

Go to the project directory

```bash
  cd evental-supplies-reactjs-2004
```

Install dependencies

```bash
  npm install -f
```
Create .env.development by remaning default.env.development

`VITE_API_URL = 'VITE_API_URL'`
`VITE_MAP_KEY = 'VITE_MAP_KEY'`


> If there are any issues in connecting to backend you can directly paste your backend URL in Config file
```bash 
 evental-supplies-reactjs-2004
    ├── src
    ├── globals
    └── Config.js
```

Start the server

```bash
  npm run dev
```


## Deployment

To deploy this project run

```bash
  npm run deploy
```

## RUN PROJECT with DOCKER
 
```bash 
git clone PROJECT_URL
```

Rename `env.default` to `.env`

```bash
 npm install -f
```

### Follow these commands for RUN with docker

#### Build the docker images with no cache

```bash 
sudo docker-compose build --no-cache
```

### To install production ready containers

```bash
sudo docker-compose up -d --remove-orphans
```
Or
```bash
sudo docker-compose up
```
(for check run time logs)

Output : localhost : PORT_NUMBER

Note - for URL route > we need to add > nginx.conf file
