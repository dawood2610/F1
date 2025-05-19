pipeline {
  agent any

  environment {
    COMPOSE_PROJECT_NAME = "f1raceci"
    COMPOSE_FILE = "docker-compose.yml"
  }

  stages {
    stage('Clone Repository') {
      steps {
        git 'https://github.com/dawood2610/F1.git'
      }
    }

    stage('Build and Run Containers') {
      steps {
        sh 'docker-compose -p $COMPOSE_PROJECT_NAME -f $COMPOSE_FILE up --build -d'
      }
    }

    stage('Check Running Containers') {
      steps {
        sh 'docker ps'
      }
    }
  }

  post {
    always {
      echo "Pipeline finished."
    }
  }
}

