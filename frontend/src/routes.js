import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Login from './pages/login';
import Usuario from './pages/usuario';
import Admin from './pages/admin';
import Clamp from './pages/clamp';
import Leito from './pages/leito'

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login}/>
                <Route path="/usuario" exact component={Usuario}/>
                <Route path="/admin" exact component={Admin}/>
                <Route path="/clamp" exact component={Clamp}/>
                <Route path="/leito" exact component={Leito}/>
            </Switch>
        </BrowserRouter>
    );
}