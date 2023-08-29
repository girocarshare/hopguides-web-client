import './App.css';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import ReportPage from './pages/ReportPage.jsx';
import PreviousReportPage from './pages/PreviousReportPage.jsx';
import HomePage from './pages/HomePage.jsx';
import BusinessPartnersPage from './pages/BusinessPartnersPage.jsx';
import InsertDataPage from './pages/InsertDataPage.jsx';
import PageNotFound from './pages/PageNotFound.jsx';
import { ProtectedRoute } from './router/ProtectedRouter.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage';
import SetPasswordPage from './pages/SetPasswordPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ConfirmationPage from './pages/ConfirmationPage';
import QRCodesPage from './pages/QRCodesPage';
import TermsAndConditionsPage from './pages/TermsAndConditionsPage';
import UnauthorizedPage from './pages/UnauthorizedPage.jsx';
import LandingPage from './pages/LandingPage.jsx';
import UpdatedToursPage from './pages/UpdatedToursPage.jsx';
import TeaserTourPage from './pages/TeaserTourPage.jsx';
import WelcomePage from './pages/WelcomePage.jsx';
import ChatbotPage from './pages/ChatbotPage.jsx';
import TourPage from './pages/TourPage.jsx'

function App() {
  return (
    <Router>
      <Switch>
        
      <Route path="/chatbot" component={ChatbotPage} />
      <Route path="/welcome" component={WelcomePage} />
      <Route path="/tour/:id" component={TourPage} />
        <Route path="/unauthorized" component={UnauthorizedPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/teasertour" component={TeaserTourPage} />
        <Route path="/confirmation/:bookingId/:pointId" component={ConfirmationPage} />
        <Route path="/qrcodes/:tourId" component={QRCodesPage} />
        <Route path="/termsAndConditions/:id" component={TermsAndConditionsPage} />
        <Route path="/insertdata" component={InsertDataPage} />
        <Route path="/ui" component={LandingPage} />
        <Route path="/setPassword/:email" component={SetPasswordPage} />
        <Route path="/report/:id" component={ReportPage} />
        <Route path="/previousReports/:id" component={PreviousReportPage} />
        <Route path="/forgotPassword" component={ForgotPasswordPage} />
        <Route path="/404" component={PageNotFound} />
        <Route path="/login" component={LoginPage} />
        <Route path="/businesspartners" component={BusinessPartnersPage} />
        <Route path="/" component={HomePage} />
        <Redirect to="/404" />
      </Switch>
    </Router>
  );
}

export default App;
