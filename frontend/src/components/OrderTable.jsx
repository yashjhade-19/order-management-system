import React from 'react';
import Button from 'react-bootstrap/Button';

import Table from 'react-bootstrap/Table';


import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const OrderTable = ({ orders }) => (
    <Table striped bordered hover responsive className="mt-4">
        <thead className="table-dark">
            <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Amount ($)</th>
                <th>Date</th>
                <th>Invoice</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {orders.map(order => (
                <tr key={order.orderId}>
                    <td>{order.orderId.substring(0, 8)}</td>
                    <td>{order.customerName}</td>
                    <td>{order.orderAmount.toFixed(2)}</td>
                    <td>{format(new Date(order.orderDate), 'MMM dd, yyyy HH:mm')}</td>
                    <td>
                        {order.invoiceFileUrl ? (
                            <a href={order.invoiceFileUrl} target="_blank" rel="noopener noreferrer">
                                View
                            </a>
                        ) : 'N/A'}
                    </td>
                    <td>
                        <Link to={`/orders/${order.orderId}`}>
                            <Button variant="outline-primary" size="sm">View Details</Button>
                        </Link>
                    </td>
                </tr>
            ))}
        </tbody>
    </Table>
);

export default OrderTable;