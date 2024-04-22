pipeline {
  agent any

  environment {
    TELEGRAM_TOKEN = credentials("Telegram-Token")
    TELEGRAM_ID = credentials("Telegram-ID")

    GIT_COMMIT_MESSAGE = sh(returnStdout: true, script: "git log -n 1 --format=%s ${GIT_COMMIT}").trim()
    GIT_COMMIT_SHORT = sh(returnStdout: true, script: "git rev-parse --short ${GIT_COMMIT}").trim()

    BUILD_READY = "${JOB_NAME}에서 새로운 커밋 감지. ${GIT_BRANCH} 브랜치의 ${GIT_COMMIT_MESSAGE}(${GIT_COMMIT_SHORT}) 커밋에 대한 빌드를 준비중입니다."
    BUILD_START = "${GIT_BRANCH} 브랜치의 ${GIT_COMMIT_MESSAGE}(${GIT_COMMIT_SHORT}) 커밋에 대한 빌드를 시작합니다."
    BUILD_PUSH = "${GIT_BRANCH} 브랜치의 ${GIT_COMMIT_MESSAGE}(${GIT_COMMIT_SHORT}) 커밋에 대한 빌드를 푸시합니다."

    BUILD_SUCCESS = "${JOB_NAME}의 새로운 빌드를 정상적으로 완료하였습니다."
    BUILD_FAILURE = "${JOB_NAME}의 새로운 빌드를 실패하였습니다."
  }

  stages {
    stage("Set") {
      steps {
        script {
          DOCKERHUB_CREDENTIAL = "Docker-Hub"
          DOCKER_IMAGE_NAME = "byhs-api"
          DOCKER_IMAGE_STORAGE = "dohun0310"
          DOCKER_IMAGE_TAG = "latest"

          sh "curl --location --request POST 'https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage' --form text='${BUILD_READY}' --form chat_id='${TELEGRAM_ID}'"
        }
      }
    }

    stage("Build") {
      steps {
        script {
          docker.build("${DOCKER_IMAGE_STORAGE}/${DOCKER_IMAGE_NAME}")

          sh "curl --location --request POST 'https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage' --form text='${BUILD_START}' --form chat_id='${TELEGRAM_ID}'"
        }
      }
    }

    stage("Push") {
      steps {
        script {
          docker.withRegistry("https://index.docker.io/v1/", DOCKERHUB_CREDENTIAL) {
            docker.image("${DOCKER_IMAGE_STORAGE}/${DOCKER_IMAGE_NAME}").push("${DOCKER_IMAGE_TAG}")

            sh "curl --location --request POST 'https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage' --form text='${BUILD_PUSH}' --form chat_id='${TELEGRAM_ID}'"
          }
        }
      }
    }
  }

  post {
    success {
      script{
        sh "curl --location --request POST 'https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage' --form text='${BUILD_SUCCESS}' --form chat_id='${TELEGRAM_ID}'"
      }
    }

    failure {
      script{
        sh "curl --location --request POST 'https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage' --form text='${BUILD_FAILURE}' --form chat_id='${TELEGRAM_ID}'"
      }
    }
  }
}