import React from 'react'
import { formatPrice } from '../helpers';
import PropTypes from 'prop-types';

class Fish extends React.Component {
    render() {

        // emiatt nem kell kiírni a this.props-ot. ES6 syntax
        const { details, index } = this.props;

        const isAvailable = details.status === 'available';
        const buttonText = isAvailable ? 'Add to Order' : 'Sold Out!';

        return (
            <li className="menu-fish">
                <img src={details.image} alt={details.name} />
                <h3 className="fish-name">
                    {details.name}
                    <span classame="price">{ formatPrice(details.price) }</span>
                </h3>
                <p>{details.desc}</p>
                <button onClick={() => this.props.addToOrder(index)} disabled={!isAvailable}>{buttonText}</button>
            </li>
        )
    }
}

Fish.propTypes = {
    details: PropTypes.object.isRequired,
    index: PropTypes.string.isRequired,
    addToOrder: PropTypes.func.isRequired
};

export default Fish;