import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './App';

class Application extends React.Component {
    render() {
        return <App />
    }
}

ReactDOM.render(<Application />, document.getElementById('root'));