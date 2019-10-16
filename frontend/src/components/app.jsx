import React from 'react';
import { Switch } from 'react-router-dom';
import MainPage from './main/main_page';
import NavBar from './nav/nav_bar_container';
import { AuthRoute, ProtectedRoute } from '../utils/route_utils';
import LoginContainer from './session/login_container';
import RegisterContainer from './session/register_container';
import QuestionPage from './question/question_page_container';
import Modal from './modals/modal_container';




const App = props => (
  <>
    <Modal />
    <NavBar />
    <Switch>
      <MainPage exact path ="/" />
      <ProtectedRoute path="/topic/:topicId/questions" component={QuestionPage} />
      <AuthRoute path='/login' component={LoginContainer} />
      <AuthRoute path="/register" component={RegisterContainer} />
    </Switch>
  </>
)


export default App;