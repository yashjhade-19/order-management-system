import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import Container from 'react-bootstrap/Container';


import PageHeader from '../components/PageHeader';
import OrderDetail from '../components/OrderDetail';
import { getOrderById } from '../services/OrderService';

const OrderDetailPage = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await getOrderById(id);
                setOrder(response.data);
            } catch (error) {
                console.error('Error fetching order:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrder();
    }, [id]);

    return (
        <>
            <PageHeader />
            <Container>
                <Button variant="outline-secondary" className="mb-3" onClick={() => window.history.back()}>
                    &larr; Back to Dashboard
                </Button>
                <OrderDetail order={order} isLoading={isLoading} />
            </Container>
        </>
    );
};

export default OrderDetailPage;