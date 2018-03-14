import React from 'react';
import AddFishForm from './AddFishForm'

import PropTypes from 'prop-types';

class Inventory extends React.Component {

    constructor() {
        super();
        this.renderInventory = this.renderInventory.bind(this);
    }

    handleChange(e, key) {
        const fish = this.props.fishes[key];
        console.log(fish);

        // take a copy of that fish and update it with a new data
        const updatedFish = {
            ...fish,    // spread
            [e.tartget.name]: e.target.value        // miért [ ]???
            // overwrites what has changed
        }

        // console.log(e.target.name, e.target.value);

        // átadni az App updateFish()-nek az updatedFish-t
        this.props.updateFish(key, updatedFish);
    }


    // input - defaultValue: ha nem akarjuk változtatni. 
    // a React nem szereti, ha egy state egy az egyben kint van egy input fielden, mint value
    // nem akar input state-et a HTML-ben - szinkronban akarja tartani a state-et - az application state-ből kell, hogy jöjjön a state
    // => onChange kezelése, ott kell a state-et frissíteni!!!
    renderInventory(key) {
        const fish = this.props.fishes[key];
        return (
            <div className="fish-edit" key={key}>
                <input type="text" name="name" value={fish.name} placeholder="Fish Name" onChange={(e) => this.handleChange(e, key)} />
                <input type="text" name="price" value={fish.price} placeholder="Fish Price" onChange={(e) => this.handleChange(e, key)}/>

                <select type="text" name="status" value={fish.status} placeholder="Fish Status" onChange={(e) => this.handleChange(e, key)}>
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold Out!</option>
                </select>

                <textarea type="text" name="desc" value={fish.desc} placeholder="Fish Desc" onChange={(e) => this.handleChange(e, key)}/>
                <input type="text" name="image" value={fish.image} placeholder="Fish Image" onChange={(e) => this.handleChange(e, key)}/>

                <button onClick={() => this.props.removeFish(key)}>Remove Fish</button>
            </div>
        )
    }


    render() {
        return (
            <div>
                <h2>Inventory</h2>

                {/* iterate */}
                {Object.keys(this.props.fishes).map(this.renderInventory)}

                {/* App-ból jön Propsként a két metódus */}
                <AddFishForm addFish={this.props.addFish} />

                <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
            </div>

        )
    }
}

Inventory.propTypes = {
    fishes: PropTypes.object.isRequired,
    updateFish: PropTypes.func.isRequired,
    removeFish: PropTypes.func.isRequired,
    addFish: PropTypes.func.isRequired,
    loadSamples: PropTypes.func.isRequired
}

export default Inventory;