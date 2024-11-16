import React from 'react';
import '../App.css';

const Plate = ({ order }) => {
    return (
        <div className="plate">
            <h2>Your Plate</h2>
            <div
                className="plate-preview"
                style={{
                    gridTemplateColumns: `repeat(${Math.ceil(Math.sqrt(order.length))}, 1fr)`,
                    gridTemplateRows: `repeat(${Math.ceil(Math.sqrt(order.length))}, 1fr)`,
                }}
            >
                {order.map((item, index) => (
                    <div
                        key={index}
                        className="plate-item"
                        style={{
                            animationDelay: `${index * 0.2}s`,
                        }}
                    >
                        {item.item}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Plate;
