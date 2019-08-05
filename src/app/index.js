import React from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from 'components/Header/index';
import Sidebar from 'containers/SideNav/index';
import Footer from 'components/Footer';
import Tour from '../components/Tour/index';
import {
  ABOVE_THE_HEADER,
  BELOW_THE_HEADER,
  COLLAPSED_DRAWER,
  FIXED_DRAWER,
  HORIZONTAL_NAVIGATION,
} from 'constants/ActionTypes';
import { isIOS, isMobile } from 'react-device-detect';
import asyncComponent from '../util/asyncComponent';
import TopNav from 'components/TopNav';
import ColorOption from 'containers/Customizer/ColorOption';
import {
  toast,
  ToastContainer,
} from 'react-toastify';


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    localStorage.getItem('user_role') === 'ROLE_ADMIN'
      ? <Component {...props} />
      : <Redirect to={'/app/404'} />
  )} />
)


class App extends React.Component {

  render() {
    const { match, drawerType, navigationStyle, horizontalNavPosition } = this.props;
    const drawerStyle = drawerType.includes(FIXED_DRAWER) ? 'fixed-drawer' : drawerType.includes(COLLAPSED_DRAWER) ? 'collapsible-drawer' : 'mini-drawer';

    //set default height and overflow for iOS mobile Safari 10+ support.
    if (isIOS && isMobile) {
      document.body.classList.add('ios-mobile-view-height')
    }
    else if (document.body.classList.contains('ios-mobile-view-height')) {
      document.body.classList.remove('ios-mobile-view-height')
    }

    return (
      <div className={`app-container ${drawerStyle}`}>
        {/*<Tour />*/}

        <Sidebar />
        <div className="app-main-container">
          <div
            className={`app-header ${navigationStyle === HORIZONTAL_NAVIGATION ? 'app-header-horizontal' : ''}`}>
            {(navigationStyle === HORIZONTAL_NAVIGATION && horizontalNavPosition === ABOVE_THE_HEADER) &&
              <TopNav styleName="app-top-header" />}
            <Header />
            {(navigationStyle === HORIZONTAL_NAVIGATION && horizontalNavPosition === BELOW_THE_HEADER) &&
              <TopNav />}
          </div>

          <main className="app-main-content-wrapper">
            <div className="app-main-content">
              <Switch>
                <Route path={`${match.url}/sample-page`} component={asyncComponent(() => import('./routes/SamplePage'))} />
                <Route path={`${match.url}/orders`} component={asyncComponent(() => import('./routes/Orders'))} />
                <Route path={`${match.url}/suppliers`} component={asyncComponent(() => import('./routes/Suppliers'))} />
                <Route path={`${match.url}/customers`} component={asyncComponent(() => import('./routes/Customers'))} />
                <Route path={`${match.url}/checks`} component={asyncComponent(() => import('./routes/Checks'))} />
                <Route path={`${match.url}/dashboard`} component={asyncComponent(() => import('./routes/Dashboard'))} />
                <Route path={`${match.url}/remises`} component={asyncComponent(() => import('./routes/Remises'))} />
                <Route path={`${match.url}/banks`} component={asyncComponent(() => import('./routes/Banks'))} />
                <PrivateRoute path={`${match.url}/users`} component={asyncComponent(() => import('./routes/Users'))}/>
                <Route path={`${match.url}/profile`} component={asyncComponent(() => import('./routes/Profile'))} />
                <Route path={`${match.url}/batch`} component={asyncComponent(() => import('./routes/Batch'))} />
                <Route path={`*`} component={asyncComponent(() => import('components/Error404'))} />
              </Switch>
            </div>
            <Footer />
            <ToastContainer position={toast.POSITION.TOP_RIGHT} />
          </main>
        </div>
        <ColorOption/>
      </div>
    );
  }
}


const mapStateToProps = ({ settings }) => {
  const { drawerType, navigationStyle, horizontalNavPosition } = settings;
  return { drawerType, navigationStyle, horizontalNavPosition }
};

export default withRouter(connect(mapStateToProps)(App));