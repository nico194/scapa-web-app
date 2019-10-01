import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.css';
import * as serviceWorker from './serviceWorker';
import store from './redux/store';
import Home from './pages/home/Home';
import SignIn from './pages/signIn/SignIn';
import SignUp from './pages/signUp/SignUp';
import CategoriesPage from './pages/categories/CategoriesPage';
import PictogramsPage from './pages/pictograms/PictogramsPage';
import PatientsPage from './pages/patients/PatientsPage';
import PatientPage from './pages/patient/PatientPage';
import RoutinesPage from './pages/routines/RoutinesPage';

const App = () => {
    return(
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/signin" component={SignIn}/>
                    <Route path="/signup" component={SignUp}/>
                    <Route path="/categories" component={CategoriesPage} />
                    <Route path="/pictograms" component={PictogramsPage} />
                    <Route path="/patients/:id" component={PatientPage} />
                    <Route path="/patients" component={PatientsPage} />
                    <Route path="/routines" component={RoutinesPage} />
                </Switch>
            </BrowserRouter>
        </Provider>
    )
}

ReactDOM.render(<App/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
