import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import Spinner from 'react-bootstrap/Spinner';

import { format } from 'date-fns';

const OrderDetail = ({ order, isLoading }) => {
    if (isLoading) {
        return (
            <div className="d-flex justify-content-center mt-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }

    if (!order) return <p className="text-center mt-5">Order not found</p>;

    return (
        <Card className="shadow-sm">
            <Card.Header className="bg-dark text-white">
                <h5>Order Details</h5>
            </Card.Header>
            <Card.Body>
                <div className="row mb-3">
                    <div className="col-md-4 fw-bold">Order ID:</div>
                    <div className="col-md-8">{order.orderId}</div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-4 fw-bold">Customer:</div>
                    <div className="col-md-8">{order.customerName}</div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-4 fw-bold">Amount:</div>
                    <div className="col-md-8">${order.orderAmount.toFixed(2)}</div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-4 fw-bold">Date:</div>
                    <div className="col-md-8">
                        {format(new Date(order.orderDate), 'MMM dd, yyyy HH:mm:ss')}
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-4 fw-bold">Invoice:</div>
                    <div className="col-md-8">
                        {order.invoiceFileUrl ? (
                            <Button
                                variant="outline-success"
                                href={order.invoiceFileUrl}
                                target="_blank"
                            >
                                Download Invoice
                            </Button>
                        ) : 'No invoice available'}
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
};

export default OrderDetail;