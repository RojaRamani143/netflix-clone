# CineTelugu 🎬

A polished, Netflix-inspired **Telugu movie discovery demo** built with Flask, HTML, CSS and JavaScript for Docker, Jenkins and EC2 practice.

> Fan-made learning project, not affiliated with Netflix or any streaming service. This demo does **not** host movies or licensed trailers. Poster artwork is original CSS gradient typography, not official movie posters. Movie metadata is illustrative.

## Features

- Responsive dark streaming-style homepage and featured movie hero
- 12 Telugu movie discovery cards, with original CSS poster artwork
- Search by title, genre or description
- Genre filtering, movie detail pop-up
- Add/remove favorites; watchlist persists in browser localStorage
- REST API: `/api/movies`; health check: `/health`
- Dockerfile, Docker Compose and Jenkinsfile included

## Project structure

```
CineTelugu/
├── static/
│   ├── script.js
│   └── style.css
├── templates/
│   └── index.html
├── app.py
├── requirements.txt
├── Dockerfile
├── docker-compose.yml
├── Jenkinsfile
├── .dockerignore
└── README.md
```

## Run with Docker on EC2

```bash
cd CineTelugu
docker build -t cinetelugu:v1 .
docker run -d --name cinetelugu-app -p 9091:5000 cinetelugu:v1
docker ps
curl http://localhost:9091/health
```

Visit `http://YOUR_EC2_PUBLIC_IP:9091` and allow inbound TCP port **9091** from your own IP in the EC2 security group. If the container name already exists, run `docker rm -f cinetelugu-app` before the new `docker run`.

## Docker Compose alternative

```bash
docker compose up -d --build
docker compose ps
docker compose logs -f
```

Do not run the standalone `docker run` and Compose on port 9091 simultaneously.

## Run without Docker

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python app.py
```

Then visit `http://localhost:5000`.

## Jenkins practice

1. Upload this project to **your own GitHub repository**.
2. Create a Jenkins **Pipeline** job, select **Pipeline script from SCM**, choose Git, provide your repo URL, branch `*/main`, and script path `Jenkinsfile`.
3. Make sure Docker and `curl` are installed and the Jenkins service account has authorized Docker access.
4. Run **Build Now**. The pipeline checks out the repository, builds the image, recreates the container, and tests `/health`.
5. Open `http://YOUR_EC2_PUBLIC_IP:9091`.

If you prefer to paste a Pipeline script directly into Jenkins instead of using SCM, replace `checkout scm` with a `git branch: 'main', url: 'YOUR_GITHUB_REPOSITORY_URL'` step.

## Notes

- This is a **discovery UI**, not a real streaming platform. The Play Preview button displays a demo notification.
- All movie content is sample metadata for learning; ratings are illustrative and not live data.
- Google Fonts are loaded from the internet; the site falls back to system fonts offline.
