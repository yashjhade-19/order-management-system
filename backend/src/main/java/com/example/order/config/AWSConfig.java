package com.example.order.config;

import com.amazonaws.auth.AWSCredentialsProvider;
import com.amazonaws.auth.DefaultAWSCredentialsProviderChain;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.sns.AmazonSNS;
import com.amazonaws.services.sns.AmazonSNSClientBuilder;
import org.socialsignin.spring.data.dynamodb.repository.config.EnableDynamoDBRepositories;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableDynamoDBRepositories(basePackages = "com.example.order.repository")
public class AWSConfig {

    private static final Regions REGION = Regions.AP_SOUTH_1;

    @Bean
    public AWSCredentialsProvider awsCredentialsProvider() {
        // Use the default provider chain that checks environment variables first
        return new DefaultAWSCredentialsProviderChain();
    }

    @Bean
    public AmazonDynamoDB amazonDynamoDB(AWSCredentialsProvider credentialsProvider) {
        return AmazonDynamoDBClientBuilder.standard()
                .withCredentials(credentialsProvider)
                .withRegion(REGION)
                .build();
    }

    @Bean
    public AmazonS3 amazonS3(AWSCredentialsProvider credentialsProvider) {
        return AmazonS3ClientBuilder.standard()
                .withCredentials(credentialsProvider)
                .withRegion(REGION)
                .build();
    }

    @Bean
    public AmazonSNS amazonSNS(AWSCredentialsProvider credentialsProvider) {
        return AmazonSNSClientBuilder.standard()
                .withCredentials(credentialsProvider)
                .withRegion(REGION)
                .build();
    }
}