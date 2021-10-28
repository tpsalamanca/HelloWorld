import React from 'react'

import { useAuth0 } from "@auth0/auth0-react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  
} from "react-router-dom";


import App1 from './app1';
import App2 from './App2';
import App4 from './App4';




import { LoginButton } from './login';
import { LogoutButton } from './logout';

import { Profile } from './Profile';


function App() {

  const { isAuthenticated } = useAuth0();
  

  return (


    
    <div>

<Router>



<div>
{/* NAVIGATION */}
<nav className="light-green darken-4">
<div className="container">
<div className="nav-wrapper">
 <a href="#" className="brand-logo">HelloWorld</a>
 <ul id="nav-mobile" className="right hide-on-med-and-down">
<li><a href=""><Link to="/venta">VENTAS</Link></a></li>
<li><a href=""><Link to="/productos">PRODUCTOS </Link></a></li>
<li><a href=""><Link to= "/usuarios">USUARIOS</Link></a></li>
</ul>

</div>
</div>
</nav>
</div>




<div>

 <Switch>
         <Route path="/venta" exact>
      
      <App1 />
      
       </Route>
       <Route path="/productos" exact>
      
      <App2 />
      
       </Route>
       <Route path="/usuarios" exact>
    
      <App4 />
       
       </Route>
    

         </Switch>

        </div>

         
        <div class="row">
    <div class="col s12 m6">
      <div class="card blue-grey darken-1">
        <div class="card-content white-text">
          <span class="card-title">Bienvenido!</span>
          <p> los mejores productos estan en nuestra tienda registrate y se parte del proceso HelloWorld.</p>
        </div>

        <div class="card-action">
          <a href="#"> <LoginButton /> </a>
        </div>

      </div>
    </div>
  </div>
      

     
  <div class="row">
    <div class="col s5 m2">
      <div class="card blue-grey darken-1">
        <div class="card-content white-text">
          <span class="card-title">Perfil</span>
          <p> <Profile /> </p>
        </div>
        <div class="card-action">
          <a href="#"> <LogoutButton /> </a>
        
        </div>
      </div>
    </div>
  </div>
            
  </Router>
    </div>

  

    
    
  )
}

export default App

