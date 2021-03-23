import React from 'react'
import IndexLatihan from './latihan/'
import IndexCategory from './Category/index'
import IndexVariant from './Variant/index'
import IndexProduct from './Product/index'
import Header from './Layout/header'
import Sidebar from './Layout/sidebar'
import IndexCatalog from './Catalog/index'
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
                    {/* <h3>Hello From App Component</h3> */}
                    {/* <IndexCategory /> */}
                    {/* <IndexVariant /> */}
                    <Router>
                        <Header />
                        <Sidebar />
                        <div class="content-wrapper">
                            <section class = "content">
                            <div class = "container-fluid">
                            <Switch>
                                <Route path="/category">
                                    <IndexCategory />
                                </Route>
                                <Route path="/variant">
                                    <IndexVariant />
                                </Route>
                                <Route path="/product">
                                    <IndexProduct />
                                </Route>
                                <Route path="/catalog">
                                    <IndexCatalog />
                                </Route>
                                <Route path="/">
                                    <IndexLatihan />
                                </Route>
                            </Switch>
                            </div>
                            </section>
                        </div>
                    </Router>

                </div>
            </div>

        )
    }
}
export default App