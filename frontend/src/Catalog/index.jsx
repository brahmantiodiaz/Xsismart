import React from 'react'
import Counting from './counting'
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
                <div class = "row">
                <div class="col-md-4 col-sm-6 col-12">
            <div class="info-box">
              <span class="info-box-icon bg-info"><i class="fas fa-shopping-basket"></i></span>

              <div class="info-box-content">
                <span class="info-box-text">Total Product</span>
                <span class="info-box-number">0</span>
              </div>
            </div>
          </div>
          <div class="col-md-4 col-sm-6 col-12">
            <div class="info-box">
              <span class="info-box-icon bg-info"><i class="fas fa-money-bill-wave"></i></span>

              <div class="info-box-content">
                <span class="info-box-text">Estimate Price</span>
                <span class="info-box-number">0</span>
              </div>
            </div>
          </div>
          <div class="col-md-4 col-sm-6 col-12">
            <div class="info-box bg-warning">
              <span class="info-box-icon bg-danger"><i class="fas fa-shopping-cart"></i></span>

              <div class="info-box-content">
                <span class="info-box-text">Checkout</span>
                <span class="info-box-number">0</span>
              </div>
            </div>
          </div>
          
          </div>
                <div class="row">
                    {
                        List.map(data => {
                            return (
                             <Counting data={data}/>   
                            )
                        })
                    }
                </div>
                
            </div>
        )
    }


}