package com.example.order.repository;

import com.example.order.model.Order;
import org.socialsignin.spring.data.dynamodb.repository.EnableScan;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

@EnableScan
public interface OrderRepository extends CrudRepository<Order, String> {
    List<Order> findAll();
}