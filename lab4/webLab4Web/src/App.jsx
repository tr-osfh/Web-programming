import React from "react";
import {Provider} from "react-redux";
import Home from "./pages/Home";
import Main from "./pages/Main";
import {store} from "./store";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {NavigationService} from "./service/NavigationService";

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Router basename="/webLab4">
                    <div>
                        <Route
                            render={({ history }) => {
                                NavigationService.setHistory(history);
                                return null;
                            }}
                        />
                        <Switch>
                            <Route path="/main" component={Main}></Route>
                            <Route path="/" component={Home}></Route>
                        </Switch>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;