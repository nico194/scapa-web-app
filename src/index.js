import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Home from './pages/home/Home';
import SignIn from './pages/signIn/SignIn';
import SignUp from './pages/signUp/SignUp';

const App = () => {
    return(
        <BrowserRouter>
            <React.Fragment>
                <Route path="/" exact component={Home}/>
                <Route path="/signin" component={SignIn}/>
                <Route path="/signup" component={SignUp}/>
            </React.Fragment>
        </BrowserRouter>
    )
}

ReactDOM.render(<App/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
