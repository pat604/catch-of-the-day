import React from 'react';

import { formatPrice } from '../helpers';
import PropTypes from 'prop-types';

class Order extends React.Component {

    constructor() {
        super();
        this.renderOrder = this.renderOrder.bind(this);
    }

    renderOrder(key) {
        const fish = this.props.fishes[key];
        const count = this.props.order[key];

        const removeButton = <button onClick={() => this.props.removeFromOrder(key)}></button>

        if (!fish || fish.status === 'unavailable') {
            return <li key={key}>Sorry, {fish ? fish.name : 'fish'} is no longer available.
                {removeButton}
            </li>
        }

        return (
            <li key={key}>
                <span>{count}lbs {fish.name} {removeButton}</span>
                <span className="price">{formatPrice(count * fish.price)}</span>
            </li>
        )
    }


    render() {
        // Object.keys(this.props.order)    array of all the keys
        const orderIds = Object.keys(this.props.order);

        // reduce(): iterates over an array and returns sth from it - a prevTotalt (a korábbi prevTotal és a key alapján)
        // two parameters: needs a starting value (0)
        const total = orderIds.reduce((prevTotal, key) => {
            const fish = this.props.fishes[key];    // get the fish
            const count = this.props.order[key];
            const isAvailable = fish && fish.status === 'available';
            if (isAvailable) {
                return prevTotal + (count * fish.price || 0)
            }
            return prevTotal;

        }, 0);

        return (
            <div className="order-wrap">
                <h2>Your Order</h2>
                <ul className="order">

                    {orderIds.map(this.renderOrder)}

                    <li className="total">
                        <strong>Total: </strong>
                        {formatPrice(total)}
                    </li>
                </ul>


            </div>
        )
    }
}

Order.propTyes = {
    fishes: PropTypes.object.isRequired,
    order: PropTypes.object.isRequired,
    removeFromOrder: PropTypes.func.isRequired
}

export default Order;