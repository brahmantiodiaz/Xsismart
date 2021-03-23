import React from 'react'

export default class increment extends React.Component{
    constructor(){
        super()
        this.state = {
            angka1 : 30,
            angka2 : 50
        }
    }

    addIncFunction = () => {
        const {angka1,angka2} = this.state
        const {hasiloi} = this.props
        this.setState ({
            angka1 : angka1 + hasiloi,
            angka2 : angka2 + hasiloi
        })
    }
    render(){
    const {hasiloi, incrementFunction} = this.props
    const {angka1,angka2}=this.state
    return (
        <div>
            <h2>Component Increment</h2>
            <p>Hasil Props = {hasiloi} </p>
            <button onClick={incrementFunction}>increment</button>
            <p>Angka 1 = {angka1}</p>
            <p>Angka 2 = {angka2} </p>
            <button onClick={this.addIncFunction}>tambahinc</button>
        </div>
    )
}

}