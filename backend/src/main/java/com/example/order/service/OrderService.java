package com.example.order.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.sns.AmazonSNS;
import com.example.order.model.Order;
import com.example.order.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final AmazonS3 s3Client;
    private final AmazonSNS snsClient;

    @Value("${aws.s3.bucket}")
    private String bucketName;

    @Value("${aws.sns.topicArn}")
    private String snsTopicArn;

    public Order createOrder(Order order, MultipartFile invoiceFile) throws IOException {
        // Generate ID and date
        order.generateIdAndDate();

        // Upload invoice to S3
        if(invoiceFile != null && !invoiceFile.isEmpty()) {
            String fileName = "invoice-" + order.getOrderId() + ".pdf";
            order.setInvoiceFileUrl(uploadToS3(fileName, invoiceFile));
        }

        // Save to DynamoDB
        Order savedOrder = orderRepository.save(order);

        // Send SNS notification
        sendOrderNotification(savedOrder);

        return savedOrder;
    }

    private String uploadToS3(String fileName, MultipartFile file) throws IOException {
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(file.getSize());
        s3Client.putObject(bucketName, fileName, file.getInputStream(), metadata);
        return s3Client.getUrl(bucketName, fileName).toString();
    }

    private void sendOrderNotification(Order order) {
        String message = String.format(
                "New Order Created!\nID: %s\nCustomer: %s\nAmount: $%.2f\nDate: %s",
                order.getOrderId(),
                order.getCustomerName(),
                order.getOrderAmount(),
                order.getOrderDate()
        );
        snsClient.publish(snsTopicArn, message);
    }

    public List<Order> getAllOrders() {
        return (List<Order>) orderRepository.findAll();
    }

    public Optional<Order> getOrderById(String id) {
        return orderRepository.findById(id);
    }
}