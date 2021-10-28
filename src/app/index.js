import React, { Component } from 'react';
import { render } from 'react-dom';
import { Auth0Provider } from '@auth0/auth0-react';



import App from './App';

render(
<Auth0Provider domain= "dev-0snr9hqp.us.auth0.com" clientId= "zh6tTZNYrsRyH3z8aNefk8PapuHi4b5L" redirectUri= {window.location.origin}>

<App/>

</Auth0Provider>,
    
    document.getElementById('app'));

