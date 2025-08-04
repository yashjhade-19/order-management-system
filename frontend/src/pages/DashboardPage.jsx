import React, { useEffect, useState } from 'react';

import Container from 'react-bootstrap/Container';


import { toast } from 'react-toastify';
import PageHeader from '../components/PageHeader';
import OrderTable from '../components/OrderTable';
import { getAllOrders } from '../services/OrderService';

const DashboardPage = () => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await getAllOrders();
                setOrders(response.data);
            } catch (error) {
                toast.error('Failed to load orders');
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrders();
    }, []);

    return (
        <>
            <PageHeader />
            <Container>
                <h2 className="mb-4">Order Dashboard</h2>

                {isLoading ? (
                    <div className="d-flex justify-content-center mt-5">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : orders.length === 0 ? (
                    <div className="text-center py-5">
                        <h4>No orders found</h4>
                        <p>Create your first order using the button above</p>
                    </div>
                ) : (
                    <OrderTable orders={orders} />
                )}
            </Container>
        </>
    );
};

export default DashboardPage;