import React from 'react';

const Summary = ({ order, submitOrder, removeItem }) => {
    return (
        <div className="summary">
            <h2>Order Summary</h2>
            <ul>
                {order.map((item, index) => (
                    <li key={index}>
                        {item.item} - {JSON.stringify(item)}{' '}
                        <button
                            onClick={() => removeItem(index)}
                            className="remove-button"
                        >
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
            <button onClick={submitOrder} className="submit-button">
                Place Order
            </button>
        </div>
    );
};

export default Summary;
