import React from 'react'
import userService from '../Service/loginService'
export default class register extends React.Component {
  userModel = {
    name: "",
    email: "",
    password: "",
    address: "",
    retype_pass: ""
  }
  constructor() {
    super()
    this.state = {
      Model: this.userModel,
      errors: {}
    }
  }

  changeHandler = field => ({ target: { value } }) => {
    this.setState({
      Model: {
        ...this.state.Model,
        [field]: value
      }
    })
  }

  saveHandler = async () => {
    let respon = await userService.getEmail(this.state.Model.email)
    var email = {}
    if (respon.success) {
      email = respon.result
    }
    if (this.handleValidation(email)) {
      const respon = await userService.addData(this.state.Model)
      console.log(respon)
      if (respon.success) {
        alert("Success Register")
        window.location = '/'
      }
    }
  }


  


  handleValidation(cekemail) {
    let fields = this.state.Model;
    let errors = {};
    let formIsValid = true;

    if (cekemail != undefined) {
      formIsValid = false;
      errors["Email_NotReady"] = "Email Already Use";
    }

    //Name
    if (!fields["email"]) {
      formIsValid = false;
      errors["email"] = "Cannot be empty";
    }
    if(typeof fields["email"] !== "undefined"){
      let lastAtPos = fields["email"].lastIndexOf('@');
      let lastDotPos = fields["email"].lastIndexOf('.');

      if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
         formIsValid = false;
         errors["email"] = "Email is not valid";
       }
  }  

    //Description
    if (!fields["password"]) {
      formIsValid = false;
      errors["password"] = "Cannot be empty";
    }


    if(typeof fields["password"] !== "undefined"){
      if(!fields["password"].match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)){
         formIsValid = false;
         errors["password"] = "Minimum six characters, at least one letter and one number";
      }        
   }



    if(typeof fields["name"] !== "undefined"){
      if(!fields["name"].match(/^[a-zA-Z" "]+$/)){
         formIsValid = false;
         errors["name"] = "Only letters";
      }        
   }

   
    if (!fields["name"]) {
      formIsValid = false;
      errors["name"] = "Cannot be empty";
    }

    if (!fields["address"]) {
      formIsValid = false;
      errors["address"] = "Cannot be empty";
    }


    if (!fields["retype_pass"]) {
      formIsValid = false;
      errors["retype_pass"] = "Cannot be empty";
    }


    if (fields["retype_pass"]!=fields["password"]) {
      formIsValid = false;
      errors["match"] = "Password not match";
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  render() {
    const { errors } = this.state
    return (
      <div>
        {/* {JSON.stringify(this.state.Model)} */}
        <body class="hold-transition register-page">
          <div class="register-box">
            <div class="register-logo">
              <a href="/"><b>Xsis</b>Mart</a>
            </div>

            <div class="card">
              <div class="card-body register-card-body">
                <p class="login-box-msg">Register a new membership</p>


                <div class="input-group mb-3">
                  <input type="text" class="form-control" placeholder="Full name" onChange={this.changeHandler('name')} />
                  <div class="input-group-append">
                    <div class="input-group-text">
                      <span class="fas fa-user"></span>
                    </div>
                  </div>
                </div>
                <span className="error">{errors["name"]}</span>
                <div class="input-group mb-3">
                  <input type="email" class="form-control" placeholder="Email" onChange={this.changeHandler('email')} />
                  <div class="input-group-append">
                    <div class="input-group-text">
                      <span class="fas fa-envelope"></span>
                    </div>
                  </div>
                </div>
                <span className="error">{errors["email"]}</span>
                <span className="error">{errors["Email_NotReady"]}</span>
                <div class="input-group mb-3">
                  <input type="txt" class="form-control" placeholder="Address" onChange={this.changeHandler('address')} />
                  <div class="input-group-append">
                    <div class="input-group-text">
                      <span class="fas fa-map-marker-alt"></span>
                    </div>
                  </div>
                </div>
                <span className="error">{errors["address"]}</span>
                <div class="input-group mb-3">
                  <input type="password" class="form-control" placeholder="Password" onChange={this.changeHandler('password')} />
                  <div class="input-group-append">
                    <div class="input-group-text">
                      <span class="fas fa-lock"></span>
                    </div>
                  </div>
                </div>
                <span className="error">{errors["password"]}</span>
                <div class="input-group mb-3">
                  <input type="password" class="form-control" placeholder="Retype password" onChange={this.changeHandler('retype_pass')} />
                  <div class="input-group-append">
                    <div class="input-group-text">
                      <span class="fas fa-lock"></span>
                    </div>
                  </div>
                </div>
                <span className="error">{errors["retype_pass"]}</span>
                <span className="error">{errors["match"]}</span>
                <div class="row">
                  <div class="col-8">
                    <div class="icheck-primary">
                      <input type="checkbox" id="agreeTerms" name="terms" value="agree" />
                      <label for="agreeTerms">
                        I agree to the <a href="#">terms</a>
                      </label>
                    </div>
                  </div>
                  <div class="col-4">
                    <button type="button" class="btn btn-primary btn-block" onClick={this.saveHandler}>Register</button>
                  </div>
                </div>

                <a href="/" class="text-center">I already have a membership</a>
              </div>
            </div>
          </div>
        </body>

      </div>
    )
  }
}