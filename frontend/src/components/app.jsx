import React from 'react';
import { Switch } from 'react-router-dom';
import MainPage from './main/main_page';
import NavBar from './nav/nav_bar_container';

const App = props => (
  <>
    <NavBar />
    <Switch>
      <MainPage exact path ="/" />
    </Switch>
  </>
)


export default App;