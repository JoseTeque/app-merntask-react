import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './componentes/auth/Login';
import NuevaCuenta from './componentes/auth/NuevaCuenta';
import Proyectos from './componentes/proyectos/Proyectos';
import RutasPrivadas from './componentes/rutas/RutasPrivadas';

import ProyectoState from './context/proyectos/proyectoState';
import TareaState from './context/tareas/tareaState';
import AlertaState from './context/alertas/alertaState';
import AuthState from './context/autenticacion/authState';
import TokenAuth from './config/token'; 

// REVISAR SI TENEMOS UN TOKEN
const token = localStorage.getItem('token');
if(token){
  TokenAuth(token);
}

function App() {

  console.log(process.env.REACT_APP_BACKEND_URL);
  
  return (
    <ProyectoState>
      <TareaState>
        <AlertaState>
          <AuthState>
            <Router>
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/nueva-cuenta" component={NuevaCuenta} />
                <RutasPrivadas exact path="/proyectos" component={Proyectos} />
              </Switch>
            </Router>
          </AuthState>
        </AlertaState>
      </TareaState>
   </ProyectoState>
  );
}

export default App;
