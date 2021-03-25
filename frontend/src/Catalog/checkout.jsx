import React from 'react'
import { Modal } from 'react-bootstrap'
export default class checkout extends React.Component {
    constructor() {
        super()
        this.state = {
            date: new Date().toLocaleString()
        }
    }
    render() {
        const { ShowModal, cancelHandler, ListCart, EstimatePrice, TotalProduct, orderHandler, changeHandler, ListPayment,Model } = this.props
        const { date } = this.state
        return (
            <div>
                <Modal show={ShowModal} onHide={cancelHandler}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Cart
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div class="row">
                            <div class="col-12">
                                <h5>
                                    <i class="fas fa-globe"></i> Xsismart, Inc.
                                        <small class="float-right">Date: {date}</small>
                                </h5>

                            </div>
                        </div>
                        <div class="col-12 table-responsive">
                            <table class="table table-striped">
                                <thead>
                                    <tr>

                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Qty</th>
                                        <th>Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        ListCart.map(data => {
                                            return (
                                                <tr>

                                                    <td >{data.nama}</td>
                                                    <td>{data.price}</td>
                                                    <td>{data.qty}</td>
                                                    <td>{data.total}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div class="row">
                            <div class="col-6">
                                <p class="lead">Payment Methods:</p>
                                <select class="form-control" value={Model.payment} onChange={changeHandler('payment')}>
                                    <option selected hidden>Payment</option>
                                    {
                                        ListPayment.map(data => {
                                            return (
                                                <option value={data._id}>{data.name}</option>
                                            )
                                        })
                                    }
                                </select>
                                <p class="text-muted well well-sm shadow-none" >
                                </p>
                            </div>
                            <div class="col-6">
                                <p class="lead">Amount</p>

                                <div class="table-responsive">
                                    <table class="table">
                                        <tbody><tr>
                                            <th class="font-width-50">Total Item:</th>
                                            <td>{TotalProduct}</td>
                                        </tr>
                                            <tr>
                                                <th>Total:</th>
                                                <td>{EstimatePrice}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="button" class="btn btn-primary" onClick={orderHandler}>Checkout</button>
                        <button type="button" class="btn btn-default" onClick={cancelHandler}>Cancel</button>
                    </Modal.Footer>
                </Modal>

            </div>
        )
    }
}