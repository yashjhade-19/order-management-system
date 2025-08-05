# order-management-system
Full Stack Project - React + Spring Boot + AWS

# Order Management System

**Live Demo:**  
- Frontend: https://order-ui.netlify.app  
- Backend API: https://order-service-kf89.onrender.com  

## Features
- Create orders with PDF invoice uploads
- View all orders in dashboard
- Order details with invoice download
- SNS notifications for new orders

## Technology Stack
- **Frontend**: React.js, Bootstrap
- **Backend**: Spring Boot (Java 17)
- **Database**: AWS DynamoDB
- **Storage**: AWS S3
- **Notifications**: AWS SNS
- **CI/CD**: GitHub Actions
- **Deployment**: Render (Backend), Netlify (Frontend)

## AWS Setup
1. Create IAM user with permissions:
   - `AmazonDynamoDBFullAccess`
   - `AmazonS3FullAccess`
   - `AmazonSNSFullAccess`
2. Create resources:
   ```bash
   # DynamoDB
   aws dynamodb create-table --table-name Orders \
     --attribute-definitions AttributeName=orderId,AttributeType=S \
     --key-schema AttributeName=orderId,KeyType=HASH \
     --billing-mode PAY_PER_REQUEST --region ap-south-1
   
   # S3 Bucket
   aws s3 mb s3://your-bucket-name --region ap-south-1
   
   # SNS Topic
   aws sns create-topic --name order-notifications --region ap-south-1


Run Locally

#Backend
bash
cd backend
export AWS_ACCESS_KEY_ID=your_key
export AWS_SECRET_ACCESS_KEY=your_secret
export AWS_REGION=ap-south-1
export AWS_S3_BUCKET=your-bucket
export AWS_SNS_TOPIC_ARN=your-topic-arn
mvn spring-boot:run


#Frontend
bash
cd frontend
npm install
npm start


#API Documentation
Access Swagger UI at:
https://order-service-kf89.onrender.com/swagger-ui.html

#CI/CD Pipeline
Automatic backend deployment to Render on Git push
Manual frontend deployment to Netlify



This README includes:
1. Live demo links
2. Key features
3. Technology stack
4. AWS setup instructions
5. Local run commands
6. API documentation info
7. CI/CD explanation
8. Repository structure


