import React from 'react'
import Counting from './counting'
import productService from '../Service/productService'
import Checkout from './checkout'
import orderService from '../Service/orderService'

export default class index extends React.Component {
    Model = {
        payment: "",
        total:0
    }

    constructor() {
        super()
        this.state = {
            List: [],
            ListCart:[],
            ListPayment:[],
            TotalProduct:0,
            EstimatePrice:0,
            ShowModal:false,
            Model:this.Model
        }
    }

    loadList = async () => {
        const respon = await productService.getAlldata()
        const responPayment = await orderService.getPay()
        if (respon.success) {
            this.setState({
                List: respon.result,
                ListPayment:responPayment.result
            })
        }
        console.log(this.state.ListPayment)
    }

    incrementTotal = ()=>{
        this.setState({
            TotalProduct:this.state.TotalProduct+1
        })
    }

    
    deccrementTotal = ()=>{
        if (this.state.TotalProduct!=0) {
        this.setState({
            TotalProduct:this.state.TotalProduct-1
        })   
        }
    }

    incrementPrice = (price)=>{
        
        this.setState({
            EstimatePrice : this.state.EstimatePrice +price,
            Model: {
                ...this.state.Model,
                ["total"]: this.state.EstimatePrice +price
            }
        })
    }

    decrementPrice = (price)=>{
        if (this.state.EstimatePrice!=0) {
            this.setState({
                EstimatePrice : this.state.EstimatePrice -price,
                Model: {
                    ...this.state.Model,
                    ["total"]: this.state.EstimatePrice -price
                }
            })    
        }
    }


    componentDidMount() {
        this.loadList()
    }

    ModalHandler = () => {
        this.setState({
            ShowModal: true,
            // Model: this.VariantModel
        })
    }

    cancelHandler = () => {
        this.setState({
            ShowModal: false
        })
    }

    changeHandler = field => ({ target: { value } }) => {
        this.setState({
            Model: {
                ...this.state.Model,
                [field]: value
            }
        })
    }

    resetHandler = () => {
        // window.location='catalog'
        window.location.reload()
    }
    
    orderHandler = async () => {
        let data = {
            "header":this.state.Model,
            "details":this.state.ListCart
        }
        const respon = await orderService.addData(data)
        if (respon.success) {
            alert("Payment Will Be Process")
            this.resetHandler()
        }
    }


    render() {
        const { List,TotalProduct,EstimatePrice,ListCart,ShowModal,ListPayment,Model } = this.state
        return (
            <div>
                {/* {JSON.stringify(this.state.Model)} */}
                <div class = "row">
                <div class="col-md-4 col-sm-6 col-12">
            <div class="info-box">
              <span class="info-box-icon bg-info"><i class="fas fa-shopping-basket"></i></span>

              <div class="info-box-content">
                <span class="info-box-text">Total Product</span>
                <span class="info-box-number">{TotalProduct}</span>
              </div>
            </div>
          </div>
          <div class="col-md-4 col-sm-6 col-12">
            <div class="info-box">
              <span class="info-box-icon bg-success"><i class="fas fa-money-bill-wave"></i></span>

              <div class="info-box-content">
                <span class="info-box-text">Estimate Price</span>
                <span class="info-box-number">Rp.{EstimatePrice}</span>
              </div>
            </div>
          </div>
          <div class="col-md-4 col-sm-6 col-12">
            <div class="info-box bg-warning">
              <span class="info-box-icon bg-danger" onClick={this.ModalHandler}><i class="fas fa-shopping-cart"></i></span>
              <div class="info-box-content">
                <span class="info-box-text font-weight-bold">Checkout</span>
                <span class="info-box-number"></span>
              </div>
            </div>
          </div>
          
          </div>
                <div class="row">
                    {
                        List.map(data => {
                            return (
                             <Counting data={data}
                             incrementTotal={this.incrementTotal}
                             decrementTotal={this.deccrementTotal}
                             incrementPrice={this.incrementPrice}
                             decrementPrice={this.decrementPrice}
                             ListCart={ListCart}
                             />   
                            )
                        })
                    }
                </div>
                <Checkout ShowModal={ShowModal}
                cancelHandler={this.cancelHandler}
                ListCart={ListCart}
                EstimatePrice={EstimatePrice}
                TotalProduct={TotalProduct}
                orderHandler={this.orderHandler}
                changeHandler={this.changeHandler}
                Model={Model}
                ListPayment={ListPayment}
                />
            </div>
        )
    }


}