import React from 'react';

import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';

import base from '../base';
import PropTypes from 'prop-types';
import sampleFishes from '../sample-fishes';


class App extends React.Component {

    constructor() {
        super(); // ez inicializálja a this-t az App componentre

        // emiatt használható ezekben a metódusokban a this
        this.addFish = this.addFish.bind(this);
        this.updateFish = this.updateFish.bind(this);
        this.removeFish = this.removeFish.bind(this);
        this.removeFromOrder = this.removeFromOrder.bind(this);
        this.loadSamples = this.loadSamples.bind(this);
        this.addToOrder = this.addToOrder.bind(this);

        // get initial state
        // we only sync fishes to FireBase
        this.state = {
            fishes: {},
            order: {}
        };
    }


    // sync fishes with FireBase DB
    // update order state from LocalStorage
    componentWillMount() {
        // runs before <App> is rendered

        // a storeId-t a React Router generálta
        // ref: a binding későbbi eltávolítása miatt kell
        this.ref = base.syncState(`${this.props.match.params.storeId}/fishes`,
            {
                context: this,
                state: 'fishes'
            });

        // check if there is any order in localStorage
        const localStorageRef = localStorage.getItem(`order-${this.props.match.params.storeId}`);

        if (localStorageRef) {
            // update our App components's order state
            this.setState({
                order: JSON.parse(localStorageRef)
            });
        }
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    componentWillUpdate(nextProps, nextState) {
        console.log('Something changed.')
        console.log({ nextProps, nextState });

        localStorage.setItem(`order-${this.props.match.params.storeId}`, JSON.stringify(nextState.order));
    }


    addFish(fish) {
        // update state

        // get the actual state
        const fishes = { ...this.state.fishes };  // ...: spread.  copies the existing state into fishes
        // this.state.fishes.fish1 = fish; ezt nem lehet

        // add in our new fish
        const timestamp = Date.now();       // ms since January 1970
        fishes[`fish-${timestamp}`] = fish;

        // set state
        this.setState({
            fishes: fishes
        });
        // fishes state is updated to this fishes object
    }


    updateFish(key, updatedFish) {
        const fishes = { ...this.state.fishes };
        fishes[key] = updatedFish;
        this.setState({ fishes });
    }


    removeFish(key) {
        const fishes = { ...this.state.fishes };
        fishes[key] = null;     // a FireBase miatt így kell törölni
        this.setState({ fishes });
    }


    loadSamples() {
        this.setState({
            fishes: sampleFishes
        });
    }

    addToOrder(key) {
        // copy state
        const order = { ...this.state.order }; // spread

        // update or add the new number of fish ordered
        order[key] = order[key] + 1 || 1;

        // update state
        this.setState({
            order: order
        });
    }

    removeFromOrder(key) {
        const order = { ...this.state.order };
        delete order[key];      // az order nincs a Firebase-hez kötve
        this.setState({ order });
    }


    // Object.keys(this.state.fishes)           array of all the keys
    // .map                                     visszaad egy array-t (a key alapján)
    // map(key => <Fish key={key} .../>         a paraméter keyt adjuk be keynek
    // details=this.state.fishes[key]:          goes through all the fishes, azaz mindent lekérünk a details propsba    

    // át kell adnunk a Fish componentnek a key-t, hogy tudja, mit adjon hozzá az orderhez
    // key is for React, do not touch
    // we can use index as the key   
    render() {
        return (
            <div className="catch-of-the-day">

                <div className="menu">
                    { /* tagline: props */}
                    <Header tagline="Fresh Seafood Market" />
                    <ul className="list-of-fishes">
                        {
                            Object
                                .keys(this.state.fishes)
                                .map(
                                key =>
                                    <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />
                                )
                        }
                    </ul>
                </div>

                { /* fishes, order DATA: state */}
                <Order
                    fishes={this.state.fishes}
                    order={this.state.order}
                    match={this.props.match}
                    removeFromOrder={this.props.removeFromOrder}
                />

                { /* addFish, loadSamples METHODS: props */}
                <Inventory
                    addFish={this.addFish}
                    loadSamples={this.loadSamples}
                    fishes={this.state.fishes}
                    updateFish={this.updateFish}
                    removeFish={this.removeFish}
                />

            </div>
        )
    }
}

App.propTypes = {
    match: PropTypes.object.isRequired
}

export default App;