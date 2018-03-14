import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './css/style.css'
import App from './components/App';
import StorePicker from './components/StorePicker';
import NotFound from './components/NotFound';

// stateless functional component
const Root = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={StorePicker} />

                {/* a React ez alapján legenerál egy storeId paramétert! */}
                <Route exact path="/store/:storeId" component={App} />
                
                <Route component={NotFound} />
            </Switch>
        </Router>
    )
}

// hova renderelődjön és mi
render(<Root />, document.getElementById('root'));