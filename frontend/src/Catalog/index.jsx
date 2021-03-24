import React from 'react'
import CatalogForm from './catalogform'
import Photo from '../img/user3-128x128.jpg'
import productService from '../Service/productService'

export default class index extends React.Component {
    constructor() {
        super()
        this.state = {
            List: []
        }
    }
    loadList = async () => {
        const respon = await productService.getAlldata()
        if (respon.success) {
            this.setState({
                List: respon.result,
            })
        }
        console.log(this.state.List)
    }
    componentDidMount() {
        this.loadList()
    }

    render() {
        const { List } = this.state
        return (
            <div>
                <div class="col-sm-3 card card-widget widget-user">
                    <div class="widget-user-header bg-info">
                        <h3 class="widget-user-username">Alexander Pierce</h3>
                        <h5 class="widget-user-desc">Founder &amp; CEO</h5>
                    </div>
                    <div class="widget-user-image">
                        <img class="img-circle elevation-2" src={Photo} alt="User Avatar" />
                    </div>
                    <div class="card-footer">
                        <div class="row">
                            <div class="col-sm-4 border-right">
                                <div class="description-block">
                                    <button type="button" class="btn btn-primary">-</button>
                                </div>
                            </div>
                            <div class="col-sm-4 border-right">
                                <div class="description-block">
                                    <h5 class="description-header">0</h5>
                                </div>
                            </div>
                            <div class="col-sm-4 border-right">
                                <div class="description-block">
                                    <button type="button" class="btn btn-primary">+</button>
                                </div>

                            </div>

                        </div>

                    </div>
                </div>
            </div>

        )
    }


}