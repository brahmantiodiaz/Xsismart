import React from 'react'
import IndexLatihan from './latihan'
import Test from './latihan/test'
import IndexCategory from './Category/index'
import IndexVariant from './Variant/index'
import IndexProduct from './Product/index'
import Header from './Layout/header'
import Sidebar from './Layout/sidebar'
import IndexCatalog from './Catalog/index'
import IndexOrder from './Order/index'
import Login from './Login/index'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

class Wellcome extends React.Component {
    render() {
        return (
            <div >
                <div class="wrapper">
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
                                <Route path="/myorder">
                                    <IndexOrder />
                                </Route>
                                <Route path="/Home">
                                    <IndexLatihan />
                                </Route>
                            </Switch>
                            </div>
                            </section>
                        </div>

                </div>
            </div>

        )
    }
}
export default Wellcome
