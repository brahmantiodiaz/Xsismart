import React from 'react'
import productService from '../Service/productService'
export default class Header extends React.Component {


  onLogout = () => {

    //setting session
    localStorage.clear()
    // console.log(respon.result.name)
    // console.log(respon.result._id)
    window.location = '/'

  }
  
  loadList = async () => {
    const respon = await productService.getAlldata()
    if (respon.success==false) {
      this.onLogout()  
      alert('session exp')
        
    }
}


  componentDidMount() {
    this.interval = setInterval(() => this.loadList(), 3605);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {

    return (
      <div>
        <nav class="main-header navbar navbar-expand navbar-white navbar-light">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" data-widget="pushmenu" href="#"><i class="fas fa-bars"></i></a>
            </li>
            <li class="nav-item d-none d-sm-inline-block">
              <a href="/home" class="nav-link">Home</a>
            </li>
            <li class="nav-item d-none d-sm-inline-block">
              <a href="https://github.com/brahmantiodiaz" class="nav-link">Contact</a>
            </li>
            {/* <li class="nav-item d-none d-sm-inline-block float-right">
              <a class="nav-link" onClick={this.onLogout}>logout</a>
            </li> */}
          </ul>
          <ul class="navbar-nav ml-auto">
            <li class="nav-item d-none d-sm-inline-block ">
              <a class="nav-link" onClick={this.onLogout}>logout</a>
            </li>
          </ul>
        </nav>
      </div>
    )
  }
}