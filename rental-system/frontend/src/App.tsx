import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RentalList from './components/RentalList';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <h1>Rental System</h1>
        <Switch>
          <Route path="/" exact component={RentalList} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;