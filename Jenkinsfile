pipeline {
    agent { label 'docker-agent-1' }

    properties([
        pipelineTriggers([
            githubPush()
        ])
    ])
  
    environment {
        SONAR_URL = "http://192.168.1.101:9000"
        // Ensure this ID matches the credential ID you created in Jenkins
        SONAR_TOKEN = credentials('sonarqube-token')
        APP_NAME = "todo-app"
    }

    stages {
        stage('SonarQube Scan') {
            steps {
                script {
                    sh """
                    docker run --rm \
                      --volumes-from jenkins-agent-1 \
                      -w ${WORKSPACE} \
                      -e SONAR_HOST_URL=${SONAR_URL} \
                      -e SONAR_TOKEN=${SONAR_TOKEN} \
                      sonarsource/sonar-scanner-cli \
                      -Dsonar.projectKey=${APP_NAME}-${BRANCH_NAME} \
                      -Dsonar.sources=src
                    """
                }
            }
        }

        stage('Build & Deploy (Main Only)') {
            when {
                branch 'master'
            }
            steps {
                sh "docker build -t ${APP_NAME}:latest ."
                sh "docker rm -f ${APP_NAME}-container || true"
                sh "docker run -d --name ${APP_NAME}-container -p 8081:80 ${APP_NAME}:latest"
            }
        }
        
        stage('Build Test (Other Branches)') {
            when {
                not { branch 'master' }
            }
            steps {
                echo "Testing build for branch ${BRANCH_NAME}..."
                sh "docker build -t ${APP_NAME}:${BRANCH_NAME} ."
                // We don't deploy non-main branches to port 8081 to avoid conflicts
                sh "docker rmi ${APP_NAME}:${BRANCH_NAME}"
            }
        }
    }
}
