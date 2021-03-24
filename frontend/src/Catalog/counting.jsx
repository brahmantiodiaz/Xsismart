import React from 'react'
import Photo from '../img/user3-128x128.jpg'

export default class catalogForm extends React.Component {
    constructor(){
        super()
        this.state = {
            count:0
        }
    }
    incrementFunction = () => {
        const {count} = this.state
        this.setState({
            count : count+1
        })
    }

    decrementFunction = () => {
        const {count} = this.state
        if (count!=0) {
        this.setState({
            count : count-1
        })   
        }
    }

    render() {
        const {data}=this.props
        const {count}=this.state
        return (
                <div class="col-sm-3 card card-widget widget-user">
                    <div class="widget-user-header bg-info">
                        <h3 class="widget-user-username">{data.description}</h3>
                        <h5 class="widget-user-desc">{data.price}</h5>
                    </div>
                    <div class="widget-user-image">
                        <img class="img-circle elevation-2" src={Photo} alt="User Avatar" />
                    </div>
                    <div class="card-footer">
                        <div class="row">
                            <div class="col-sm-4 border-right">
                                <div class="description-block">
                                    <button type="button" class="btn btn-primary" onClick={this.decrementFunction}>-</button>
                                </div>
                            </div>
                            <div class="col-sm-4 border-right">
                                <div class="description-block">
                                    <h5 class="description-header">{count}</h5>
                                </div>
                            </div>
                            <div class="col-sm-4 border-right">
                                <div class="description-block">
                                    <button type="button" class="btn btn-primary" onClick={this.incrementFunction}>+</button>
                                </div>

                            </div>

                        </div>

                    </div>
                </div>
        )
    }
}