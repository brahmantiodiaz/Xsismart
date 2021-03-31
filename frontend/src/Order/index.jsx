import React from 'react'
import orderService from '../Service/orderService'
export default class index extends React.Component {
    constructor() {
        super()
        this.state = {
            ListHeader: [],
            ListDetails: []
        }
    }


    loadList = async () => {
        const respon = await orderService.getOrder()
        if (respon.success) {
            this.setState({
                ListHeader: respon.result
            })
        }
        console.log(respon)
        console.log(this.state.ListHeader)
    }


    componentDidMount() {
        this.loadList()
    }

    render() {
        const { ListHeader } = this.state
        return (
            <div>
                {
                    ListHeader.map(data => {
                        var detail = data.details
                        console.log(detail)
                        return (
                            <div >
                                <div class="card bg-dark">
                                    <div class="card-header">
                                        <h3 class="card-title">{data.no_invoice}</h3>

                                        <div class="card-tools">
                                            <button type="button" class="btn btn-tool" data-card-widget="collapse" ><i class="fas fa-minus"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="card-body bg-success">
                                        
                                    <table class="table">
                            <thead >
                                <tr>
                                    <th scope="col">name</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">qty</th>
                                    <th scope="col">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody class="tbody-light">
                                {
                                    detail.map(data => {
                                        return (
                                            <tr>
                                                <td >{data.nama}</td>
                                                <td >{data.price}</td>
                                                <td >{data.qty}</td>
                                                <td >{data.total}</td>
                                                
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>           
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}