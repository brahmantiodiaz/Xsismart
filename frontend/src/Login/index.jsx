import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { config } from '../Configure/config'
import userService from '../Service/loginService'
export default class index extends React.Component {
  constructor() {
    super()
    this.state = {
      formdata: {
        email: '',
        password: '',
      },
      errors: {}
    }
  }

  changeHandler = field => ({ target: { value } }) => {
    this.setState({
      formdata: {
        ...this.state.formdata,
        [field]: value
      }
    })
  }

  onSignIn = async () => {
    if (this.handleValidation()) {
    const respon = await userService.cekUser(this.state.formdata)
    if (respon.success) {
      if (respon.result != undefined) {
        //setting session
        localStorage.setItem(config.username, respon.result.name)
        localStorage.setItem(config.userid, respon.result._id)
        localStorage.setItem(config.token, respon.result.token)
        console.log(respon.result.token)
        console.log(localStorage.getItem(config.token))
        // console.log(respon.result._id)
        window.location.href='/catalog'
      } else {
        alert("Data Not Match")
      }

    } else {
      alert('error ' + respon.result)
    }
  }
  }

  handleValidation() {
    let fields = this.state.formdata;
    let errors = {};
    let formIsValid = true;

    //Name
    if(typeof fields["email"] !== "undefined"){
      let lastAtPos = fields["email"].lastIndexOf('@');
      let lastDotPos = fields["email"].lastIndexOf('.');

      if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
         formIsValid = false;
         errors["email"] = "Email is not valid";
       }
  }

    if (!fields["email"]) {
      formIsValid = false;
      errors["email"] = "Cannot be empty";
    }

    //Description
    if (!fields["password"]) {
      formIsValid = false;
      errors["password"] = "Cannot be empty";
    }

    this.setState({ errors: errors });
    return formIsValid;
  }


  render() {
    const { errors } = this.state
    return (
      <div>

        <body class="hold-transition login-page">
          <div class="login-box">
            <div class="login-logo">
              <a href="/"><b>Xsis</b>Mart</a>
            </div>
            <div class="card">
              <div class="card-body login-card-body">
                <p class="login-box-msg">Sign in to start your session</p>

                <form >
                  <div class="input-group mb-3">
                    <input type="email" class="form-control" placeholder="Email" onChange={this.changeHandler('email')} />
                    
                    <div class="input-group-append">
                      <div class="input-group-text">
                        <span class="fas fa-envelope"></span>
                      </div>
                    </div>
                  </div>
                  <span className="error">{errors["email"]}</span>
                  <div class="input-group mb-3">
                    <input type="password" class="form-control" placeholder="Password" onChange={this.changeHandler('password')} />
                    <div class="input-group-append">
                      <div class="input-group-text">
                        <span class="fas fa-lock"></span>
                      </div>
                    </div>
                  </div>
                  <span className="error">{errors["password"]}</span>
                  <div class="row">
                    <div class="col-8">
                      <div class="icheck-primary">
                        <input type="checkbox" id="remember" />
                        <label for="remember">
                          Remember Me
              </label>
                      </div>
                    </div>
                    <div class="col-4">
                      <button type="button" class="btn btn-primary btn-block" onClick={this.onSignIn}>Sign In</button>
                    </div>
                  </div>
                </form>
                <p class="mb-1">
                  <a href="forgot-password.html">I forgot my password</a>
                </p>
                <p class="mb-0">
                  <a href="/register" class="text-center">Register a new membership</a>
                </p>
              </div>
            </div>
          </div>


        </body>

      </div>
    )
  }
}