import React from 'react'
import Test from './latihan/test'
import {config} from './Configure/config'
import Login from './Login/index'
import Wellcome from './Wellcome'
import Register from './Login/register'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


class App extends React.Component {    
    render() {
        return (
            <div >
                <div class="wrapper">
                    <Router>
                            <Switch>
                            {!localStorage.getItem(config.token)?
                            <>
                                <Route path="/register" component={Register} />
                                <Route exact path="/" component={Login} />
                            </>
                            :
                            <>
                                {/* <Route exact path="/register" component={Register} /> */}
                                <Route exact path="/" component={Test} />
                                <Wellcome />
                            </>
                            }
                                {/* <Route path="/register">
                                    <Register />
                                </Route> 
                                <Route exact path="/" component={Login} />
                                    <Wellcome /> */}
                            </Switch>
                    </Router>

                </div>
            </div>

        )
    }
}
export default App