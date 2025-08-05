import axios from 'axios';

// 👇 This will now use the value from .env file
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

export const createOrder = async (orderData, file) => {
    const formData = new FormData();
    formData.append('customerName', orderData.customerName);
    formData.append('orderAmount', orderData.orderAmount);
    if (file) formData.append('invoiceFile', file);

    return axios.post(`${API_BASE_URL}/orders`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
};

export const getAllOrders = () => axios.get(`${API_BASE_URL}/orders`);
export const getOrderById = (id) => axios.get(`${API_BASE_URL}/orders/${id}`);
