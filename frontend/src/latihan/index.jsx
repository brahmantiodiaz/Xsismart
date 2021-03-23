import React from 'react'
import Increment from './increment'
export default class index extends React.Component{
    constructor(){
        super()
        this.state = {
            value1 : 50,
            value2 : 20,
            hasil : 0,
            hasil2 : 0
        }
    }
    plusFunction = () => {
        const {value1, value2,hasil,hasil2} = this.state
        this.setState({
            hasil : value1+value2,
            hasil2 : hasil
        })
    }
    minusFunction = () => {
        const {value1, value2,hasil,hasil2} = this.state
        this.setState({
            hasil : value1-value2,
            hasil2: hasil
        })
    }
    incrementFunction = () => {
        const {hasil2} = this.state
        this.setState({
            hasil2 : hasil2+1
        })
    }
    render(){
        const { value1, value2, hasil,hasil2 } = this.state
        return (
            <div>
            <h2> MET DATANG GAESS </h2>
            {/* <p> Calculate</p>
            <p>value 1 = {value1}</p>
            <p>value 2 = {value2} </p>
            <button onClick={this.plusFunction}>Plus</button>
            <button onClick={this.minusFunction}>Minus</button>
            <p>hasil = {hasil} </p>
            <Increment hasiloi={hasil2} 
                        incrementFunction = {this.incrementFunction}/>
             */}
            </div>            
        )
    }
}