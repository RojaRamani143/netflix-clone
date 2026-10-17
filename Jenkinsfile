// Configure this Pipeline job as "Pipeline script from SCM" and point it to your own GitHub repository.
pipeline {
    agent any
    environment {
        IMAGE = 'cinetelugu:v1'
        CONTAINER = 'cinetelugu-app'
    }
    stages {
        stage('Checkout') {
            steps { checkout scm }
        }
        stage('Build Docker Image') {
            steps { sh 'docker build -t "$IMAGE" .' }
        }
        stage('Deploy') {
            steps {
                sh '''
                    docker rm -f "$CONTAINER" || true
                    docker run -d --name "$CONTAINER" --restart unless-stopped -p 9091:5000 "$IMAGE"
                '''
            }
        }
        stage('Smoke Test') {
            steps { sh 'sleep 3; curl --fail --silent --show-error http://localhost:9091/health' }
        }
    }
}
