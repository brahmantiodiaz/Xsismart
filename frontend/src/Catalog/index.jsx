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