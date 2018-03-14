import React from 'react';
import PropTypes from 'prop-types';

class AddFishForm extends React.Component {

    createFish(event) {
        // a form submitja hívja
        event.preventDefault(); 
        console.log('gonna make some fish.');
        const fish = {
            name: this.name.value,
            price: this.price.value,
            status: this.status.value,
            desc: this.desc.value,
            image: this.image.value
            // ref callback to store a reference to a DOM node
        } 
        
        // App-ból jön a metódus propsként (Inventoryn át)
        this.props.addFish(fish);
        this.fishForm.reset();
    }

    render() {
        return (
            <form ref={(input) => this.fishForm = input} className="fish-edit" onSubmit={(e) => this.createFish(e)} >

                <input ref={(input) => this.name = input} type="text" placeholder="Fish Name"/>
                <input ref={(input) => this.price = input} type="text" placeholder="Fish Price"/>

                <select ref={(input) => this.status = input}>
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold Out!</option>
                </select>

                <textarea ref={(input) => this.desc = input} placeholder="Fish Desc"/>
                <input ref={(input) => this.image = input} type="text" placeholder="Fish Image"/>

                <button type="submit">+ Add Item</button>

            </form>
        )
    }
}

AddFishForm.propTypes = {
    addFish: PropTypes.func.isRequired 
}

export default AddFishForm;