import logo from './logo.svg';
import './App.css';
import LoginPage from './pages/LoginPage/loginPage';
import RegisterPage from './pages/RegisterPage/registerPage';
import HomePage from './pages/HomePage/homePage';
import ResetPasswordPage from './pages/ResetPasswordPage/ResetPasswordPage';
import UserProfilePage from './pages/UserProfilePage/userProfilePage';
import NavBar from './components/NavBar';
import { Switch, Route, Router } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';

function App() {
  return (
    <div className="App">
      <div className="navbarHeader">
        <NavBar/>
      </div>
      <div>
      <Switch>
          <Route exact path='/' component = {HomePage}/>
          <Route path='/login' component = {LoginPage}/>
          <Route path='/register' component = {RegisterPage}/>
          <Route path='/setting' component={ResetPasswordPage}/>
          <Route path='/profile/:userId' component={UserProfilePage}/>
      </Switch>
      </div>
    </div>
  );
}

export default App;
