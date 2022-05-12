import logo from './logo.svg';
import './App.css';
import LoginPage from './pages/LoginPage/loginPage';
import RegisterPage from './pages/RegisterPage/registerPage';
import HomePage from './pages/HomePage/homePage';
import ResetPasswordPage from './pages/ResetPasswordPage/ResetPasswordPage';
import UserProfilePage from './pages/UserProfilePage/userProfilePage';
import C2CPage from './pages/C2CPage/C2CPage';
import ExchangePage from './pages/ExchangePage/ExchangePage';
import WalletPage from './pages/WalletPage/WalletPage';
import SettingPage from './pages/SettingPage/SettingPage';
import IdentityVerificationPage from './pages/IdentityVerificationPage/IdentityVerificationPage';
import NavBar from './components/NavBar';
import MarketPage from './pages/MarketPage/MarketPage';
import MarginPage from './pages/MarginPage/MarginPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import TransferInPage from './pages/TransferInPage/TransferInPage';
import WithdrawPage from './pages/WithDrawPage/WithDrawPage';
import CreateOrder from './components/C2C/CreateOrder';
import AlgoWalletPage from './pages/AlgoWalletPage/AlgoWalletPage';
import { Switch, Route, Router } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import BuyOrder from './components/C2C/BuyOrder';
import UserOrder from './components/UserOrder/UserOrder';

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
          <Route path='/profile/:userId' component={UserProfilePage}/>
          <Route path='/C2C' component={C2CPage}/>
          <Route path='/Exchange' component={ExchangePage}/>
          <Route path='/Wallet' component={WalletPage}/>
          <Route path='/Setting' component={SettingPage}/>
          <Route path='/IdentityVerification' component={IdentityVerificationPage}/>
          <Route path='/Market' component={MarketPage}/>
          <Route path='/Margin' component={MarginPage}/>
          <Route path='/Dashboard' component={DashboardPage}/>
          <Route path='/Transfer In' component={TransferInPage}/>
          <Route path='/Withdraw' component={WithdrawPage}/>
          <Route path='/CreateOrder' component={CreateOrder}/>
          <Route path='/BuyOrder' component={BuyOrder}/>
          <Route path='/UserOrder' component={UserOrder}/>
          <Route path='/AlgoWallet' component={AlgoWalletPage}/>
      </Switch>
      </div>
    </div>
  );
}

export default App;
