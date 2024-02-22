pipeline {
  agent any

  stages {
    stage("Set") {
      steps {
        script {
          DOCKERHUB_CREDENTIAL = "Docker-Hub"
          DOCKER_IMAGE_NAME = "byhs-api"
          DOCKER_IMAGE_STORAGE = "dohun0310"
          DOCKER_IMAGE_TAG = "latest"
        }
      }
    }

    stage("Build") {
      steps {
        script {
          docker.build("${DOCKER_IMAGE_STORAGE}/${DOCKER_IMAGE_NAME}")
        }
      }
    }

    stage("Push") {
      steps {
        script {
          docker.withRegistry("https://index.docker.io/v1/", DOCKERHUB_CREDENTIAL) {
            docker.image("${DOCKER_IMAGE_STORAGE}/${DOCKER_IMAGE_NAME}").push("${DOCKER_IMAGE_TAG}")
          }
        }
      }
    }
  }
}