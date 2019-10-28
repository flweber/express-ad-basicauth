pipeline {
    agent { docker { image 'node:10-alpine' } }
    stages {
        stage('build') {
          steps {
            sh 'npm install --save-dev'
          }
        }
        stage('test') {
            steps {
                sh 'node -v && npm --version'
                sh 'npm test'
            }
        }
    }
}