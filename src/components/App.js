
import React from 'react';
import Homepage from './homepage'
import ViewTasks from './viewTasks'
import { BrowserRouter as Router,Route,Switch} from 'react-router-dom';

class App extends React.Component{
  render(){
    return(
      <Router >
        <Switch>
          <Route exact path={"/"} component={Homepage} />
          <Route path={"/tasks/:id"} component={ViewTasks} />
          </Switch>                 

        </Router>
      )
  }
}

export default App; 