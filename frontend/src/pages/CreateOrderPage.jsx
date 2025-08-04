import React from 'react';

import Container from 'react-bootstrap/Container';


import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import CreateOrderForm from '../components/CreateOrderForm';
import { createOrder } from '../services/OrderService';

const CreateOrderPage = () => {
    const navigate = useNavigate();

    const handleSubmit = async (formData, file) => {
        await createOrder(formData, file);
        navigate('/');
    };

    return (
        <>
            <PageHeader />
            <Container>
                <h2 className="mb-4">Create New Order</h2>
                <CreateOrderForm onSubmit={handleSubmit} />
            </Container>
        </>
    );
};

export default CreateOrderPage;