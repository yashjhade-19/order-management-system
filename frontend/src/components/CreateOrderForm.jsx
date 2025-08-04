import React, { useState } from 'react';
// CORRECTED IMPORTS:
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

import { toast } from 'react-toastify';

const CreateOrderForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        customerName: '',
        orderAmount: '',
    });
    const [invoiceFile, setInvoiceFile] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setInvoiceFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await onSubmit(formData, invoiceFile);
            setFormData({ customerName: '', orderAmount: '' });
            setInvoiceFile(null);
            e.target.reset();
            toast.success('Order created successfully!');
        } catch (error) {
            toast.error('Failed to create order');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Card className="p-4 shadow-sm">
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Customer Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="customerName"
                        value={formData.customerName}
                        onChange={handleChange}
                        required
                        placeholder="Enter customer name"
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Order Amount ($)</Form.Label>
                    <Form.Control
                        type="number"
                        name="orderAmount"
                        value={formData.orderAmount}
                        onChange={handleChange}
                        min="0.01"
                        step="0.01"
                        required
                        placeholder="Enter amount"
                    />
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Label>Invoice (PDF only)</Form.Label>
                    <Form.Control
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                    />
                    <Form.Text muted>Optional - Max file size: 5MB</Form.Text>
                </Form.Group>

                <Button
                    variant="primary"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-100"
                >
                    {isSubmitting ? 'Creating Order...' : 'Create Order'}
                </Button>
            </Form>
        </Card>
    );
};

export default CreateOrderForm;