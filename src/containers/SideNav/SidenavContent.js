import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import IntlMessages from 'util/IntlMessages';
import CustomScrollbars from 'util/CustomScrollbars';


class SidenavContent extends Component {
  componentDidMount() {
    const { history } = this.props;
    const that = this;
    const pathname = `${history.location.pathname}`;// get current path

    const menuLi = document.getElementsByClassName('menu');
    for (let i = 0; i < menuLi.length; i++) {
      menuLi[i].onclick = function (event) {
        for (let j = 0; j < menuLi.length; j++) {
          const parentLi = that.closest(this, 'li');
          if (menuLi[j] !== this && (parentLi === null || !parentLi.classList.contains('open'))) {
            menuLi[j].classList.remove('open')
          }
        }
        this.classList.toggle('open');
      }
    }

    const activeLi = document.querySelector('a[href="' + pathname + '"]');// select current a element
    try {
      const activeNav = this.closest(activeLi, 'ul'); // select closest ul
      if (activeNav.classList.contains('sub-menu')) {
        this.closest(activeNav, 'li').classList.add('open');
      } else {
        this.closest(activeLi, 'li').classList.add('open');
      }
    } catch (error) {

    }
  }

  componentWillReceiveProps(nextProps) {
    const { history } = nextProps;
    const pathname = `${history.location.pathname}`;// get current path

    const activeLi = document.querySelector('a[href="' + pathname + '"]');// select current a element
    try {
      const activeNav = this.closest(activeLi, 'ul'); // select closest ul
      if (activeNav.classList.contains('sub-menu')) {
        this.closest(activeNav, 'li').classList.add('open');
      } else {
        this.closest(activeLi, 'li').classList.add('open');
      }
    } catch (error) {

    }
  }

  closest(el, selector) {
    try {
      let matchesFn;
      // find vendor prefix
      ['matches', 'webkitMatchesSelector', 'mozMatchesSelector', 'msMatchesSelector', 'oMatchesSelector'].some(function (fn) {
        if (typeof document.body[fn] == 'function') {
          matchesFn = fn;
          return true;
        }
        return false;
      });

      let parent;

      // traverse parents
      while (el) {
        parent = el.parentElement;
        if (parent && parent[matchesFn](selector)) {
          return parent;
        }
        el = parent;
      }
    } catch (e) {

    }

    return null;
  }

  render() {
    return (
      <CustomScrollbars className=" scrollbar">
        <ul className="nav-menu">

          <li className="nav-header">
            <IntlMessages id="sidebar.main" />
          </li>

          <li className="menu">
            <Button>
              <i className="zmdi zmdi-view-dashboard zmdi-hc-fw" />
              <span className="nav-text">
                <IntlMessages id="sidebar.dashboard" />
              </span>
            </Button>
            <ul className="sub-menu">
              <li>
                <NavLink className="prepend-icon" to="/app/dashboard/reporting1">
                  <span className="nav-text"><IntlMessages id="pages.dashboard.reporting1" /></span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/dashboard/reporting2">
                  <span className="nav-text"><IntlMessages id="pages.dashboard.reporting2" /></span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/dashboard/reporting3">
                  <span className="nav-text"><IntlMessages id="pages.dashboard.reporting3" /></span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/dashboard/reporting4">
                  <span className="nav-text"><IntlMessages id="pages.dashboard.reporting4" /></span>
                </NavLink>
              </li>
            </ul>
          </li>

          <li className="nav-header">
            <IntlMessages id="sidebar.management" />
          </li>

          <li className="menu">
            <Button>
              <i className="zmdi zmdi-view-dashboard zmdi-hc-fw" />
              <span className="nav-text">
                <IntlMessages id="sidebar.suppliers" />
              </span>
            </Button>
            <ul className="sub-menu">
              <li>
                <NavLink className="prepend-icon" to="/app/suppliers/lists">
                  <span className="nav-text"><IntlMessages id="pages.listSuppliers" /></span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/suppliers/create">
                  <span className="nav-text"><IntlMessages id="pages.addSuppliers" /></span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/suppliers/import">
                  <span className="nav-text"><IntlMessages id="pages.importSuppliers" /></span>
                </NavLink>
              </li>
            </ul>
          </li>

          <li className="menu">
            <Button>
              <i className="zmdi zmdi-view-dashboard zmdi-hc-fw" />
              <span className="nav-text">
                <IntlMessages id="sidebar.customers" />
              </span>
            </Button>
            <ul className="sub-menu">
              <li>
                <NavLink className="prepend-icon" to="/app/customers/lists">
                  <span className="nav-text"><IntlMessages id="pages.listCustomers" /></span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/customers/create">
                  <span className="nav-text"><IntlMessages id="pages.addCustomers" /></span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/customers/import">
                  <span className="nav-text"><IntlMessages id="pages.importCustomers" /></span>
                </NavLink>
              </li>
            </ul>
          </li>

          <li className="menu">
            <Button>
              <i className="zmdi zmdi-view-dashboard zmdi-hc-fw" />
              <span className="nav-text">
                <IntlMessages id="sidebar.remises" />
              </span>
            </Button>
            <ul className="sub-menu">
              <li>
                <NavLink className="prepend-icon" to="/app/checks/lists">
                  <span className="nav-text"><IntlMessages id="pages.listChecks" /></span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/remises">
                  <span className="nav-text"><IntlMessages id="pages.listRemises" /></span>
                </NavLink>
              </li>
            </ul>
          </li>

          <li className="menu">
            <Button>
              <i className="zmdi zmdi-view-dashboard zmdi-hc-fw" />
              <span className="nav-text">
                <IntlMessages id="sidebar.emis" />
              </span>
            </Button>
            <ul className="sub-menu">
              <li>
                <NavLink className="prepend-icon" to="/app/listEmis">
                  <span className="nav-text"><IntlMessages id="pages.listEmis" /></span>
                </NavLink>
              </li>
            </ul>
          </li>

          <li className="menu">
            <Button>
              <i className="zmdi zmdi-view-dashboard zmdi-hc-fw" />
              <span className="nav-text">
                <IntlMessages id="sidebar.orders" />
              </span>
            </Button>
            <ul className="sub-menu">
              <li>
                <NavLink className="prepend-icon" to="/app/orders">
                  <span className="nav-text"><IntlMessages id="pages.listOrders" /></span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/addOrders">
                  <span className="nav-text"><IntlMessages id="pages.addOrders" /></span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/updateOrders">
                  <span className="nav-text"><IntlMessages id="pages.updateOrders" /></span>
                </NavLink>
              </li>

            </ul>
          </li>


          <li className="menu">
            <Button>
              <i className="zmdi zmdi-view-dashboard zmdi-hc-fw" />
              <span className="nav-text">
                <IntlMessages id="sidebar.bank" />
              </span>
            </Button>
            <ul className="sub-menu">
              <li>
                <NavLink className="prepend-icon" to="/app/banks/lists">
                  <span className="nav-text"><IntlMessages id="pages.listBank" /></span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/banks/create">
                  <span className="nav-text"><IntlMessages id="pages.addBank" /></span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/banks/import">
                  <span className="nav-text"><IntlMessages id="pages.importBank" /></span>
                </NavLink>
              </li>
            </ul>
          </li>

          { localStorage.getItem('user_role') === "ROLE_ADMIN" &&
          <li className="menu">
            <Button>
              <i className="zmdi zmdi-view-dashboard zmdi-hc-fw" />
              <span className="nav-text">
                <IntlMessages id="sidebar.users" />
              </span>
            </Button>
            <ul className="sub-menu">
              <li>
                <NavLink className="prepend-icon" to="/app/users/lists">
                  <span className="nav-text"><IntlMessages id="pages.listUsers" /></span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/users/create">
                  <span className="nav-text"><IntlMessages id="pages.addUsers" /></span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/users/import">
                  <span className="nav-text"><IntlMessages id="pages.importUsers" /></span>
                </NavLink>
              </li>
            </ul>
          </li>
          }


          <li className="nav-header">
            <IntlMessages id="sidebar.administration" />
          </li>

          <li className="menu">
            <Button>
              <i className="zmdi zmdi-view-dashboard zmdi-hc-fw" />
              <span className="nav-text">
                <IntlMessages id="sidebar.batch" />
              </span>
            </Button>
            <ul className="sub-menu">
              {/* <li>
                <NavLink className="prepend-icon" to="/app/batch">
                  <span className="nav-text"><IntlMessages id="pages.batch" /></span>
                </NavLink>
              </li> */}
            </ul>
          </li>

        </ul>
      </CustomScrollbars>
    );
  }
}

export default withRouter(SidenavContent);
