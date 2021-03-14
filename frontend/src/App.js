import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Survey from './components/Survey'
import NotFound from './components/NotFound'


function App() {
  return (
    <div className="container">
      <Router>
        <Switch>
          <Route exact path='/:id' component={Survey} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
