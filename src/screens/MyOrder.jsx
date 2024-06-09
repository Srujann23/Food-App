import React, { useEffect, useState } from 'react';

export default function MyOrder() {
    const [orderData, setOrderData] = useState([]);

    const fetchMyOrder = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/myOrderData", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: localStorage.getItem('userEmail')
                })
            });

            if (!response.ok) {
                throw new Error('Failed to fetch order data');
            }

            const data = await response.json();
            setOrderData(data.orderData.order_data);
        } catch (error) {
            console.error('Error fetching order data:', error);
        }
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    return (
        <div className="container mt-5">
            <div className="row">
                {orderData.map((orderGroup, index) => (
                    <div key={index} className="col-12">
                        <h5 className="mt-3">Order Date: {orderGroup[0].order_date}</h5>
                        <hr />
                        {orderGroup.slice(1).map((item, itemIndex) => (
                            <div key={itemIndex} className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
                                <div className="card-body">
                                    <h5 className="card-title">{item.name}</h5>
                                    <div className="container w-100 p-0" style={{ height: "38px" }}>
                                        <span className="m-1">Quantity: {item.qty}</span>
                                        <span className="m-1">Size: {item.size}</span>
                                        <div className="d-inline ms-2 h-100 w-20 fs-5">
                                            ₹{item.price}/-
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
