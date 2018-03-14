import React from 'react';
import PropTypes from 'prop-types';

import { getFunName } from '../helpers';

class StorePicker extends React.Component {

    /*
    constructor() {
        super();
        this.goToStore = this.goToStore.bind(this);
    }
    */

    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    }

    goToStore(event) {
        event.preventDefault(); // no reload
        console.log('you changed the URL');
        console.log(this.props);

        // grab the text from the box
        const storeId = this.storeInput.value;
        console.log('Store ID: ' + storeId);

        // redirect
        // this.context.router.transitionTo('/store/${storeId}');
        this.props.history.push(`/store/${storeId}`);

    }

    render() {

        // const { match, location, history } = this.props

        return (
            <form className="store-selector" onSubmit={(e) => this.goToStore(e)}>
                <h2>Please Enter a Store</h2>

                <input type="text" required
                    placeholder="Store Name"
                    defaultValue={getFunName()}
                    ref={(input) => { this.storeInput = input }} />

                <button type="submit">Visit Store</button>
            </form>
        )

    }

}


export default StorePicker;