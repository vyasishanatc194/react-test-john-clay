import React ,  { Fragment } from 'react';
import { Router, Route,  Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import history from './services/BrowserHistory';
import { store } from './services/Redux';
import HomeContainer from './containers/HomeContainer'
import Modal from "./containers/ModalContainer";
class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Fragment>
          <Router history={history}>
            <Switch>
              <Route exact path="/" component={HomeContainer} />
              <Route exact path="/modal/:countryId"  component={Modal} />
              {/* <Route render={() => <Redirect to="/" />} /> */}

            </Switch>
          </Router>
        </Fragment>
      </Provider>
    );
  }
}

export default App;
