import React from 'react'
import categoryService from '../Service/categoryService'
import CategoryService from '../Service/categoryService'
import FormInput from './formInput'
import './category.css'
export default class index extends React.Component {

    CategoryModel = {
        _id: "",
        name: "",
        description: "",
        active: false,
        create_by: "",
        create_at: "",
        update_by: "",
        update_at: ""
    }

    constructor() {
        super()
        this.state = {
            List: [],
            Model: this.CategoryModel,
            Mode: "",
            ShowModal: false,
            errors: {}

        }
    }

    handleValidation() {
        let fields = this.state.Model;
        let errors = {};
        let formIsValid = true;

        //Name
        if (!fields["name"]) {
            formIsValid = false;
            errors["name"] = "Cannot be empty";
        }

        //Description
        if (!fields["description"]) {
            formIsValid = false;
            errors["description"] = "Cannot be empty";
        }

        this.setState({ errors: errors });
        return formIsValid;
    }


    loadList = async () => {
        const respon = await CategoryService.getAll()
        if (respon.success) {
            this.setState({
                List: respon.result
            })
        }
    }

    saveHandler = async () => {
        if (this.handleValidation()) {
            if (this.state.Mode == "edit") {
                const respon = await categoryService.editData(this.state.Model)
                if (respon.success) {
                    alert("Success Update Data")
                    this.setState({
                        Model: this.CategoryModel
                    })
                }
            } else {
                const respon = await CategoryService.addData(this.state.Model)
                if (respon.success) {
                    alert("Success Save Data")
                    this.setState({
                        Model: this.CategoryModel
                    })
                    this.loadList()
                }
            }
        } else {
            alert("Form has errors.")
        }
    }

    deleteHandler = async (id) => {
        const respon = await categoryService.deleteData(id)
        if (respon.success) {
            alert('Success Delete Data')
            this.loadList()
        }
    }


    editHandler = async (id) => {
        alert("Lagi Edit")
        const respon = await categoryService.getById(id)
        this.setState({
            Mode: "edit",
            ShowModal: true
        })
        if (respon.success) {
            this.setState({
                Model: respon.result
            })
        }
    }


    componentDidMount() {
        this.loadList()
    }

    changeHandler = field => ({ target: { value } }) => {
        //debug on change 
        // console.log(field)
        // console.log(value)
        this.setState({
            Model: {
                ...this.state.Model,
                [field]: value
            }
        })
    }
    checkedHandler = field => ({ target: { checked } }) => {
        this.setState({
            Model: {
                ...this.state.Model,
                [field]: checked
            }
        })
    }

    ModalHandler = () => {
        this.setState({
            ShowModal: true,
            Model: this.CategoryModel
        })
    }

    cancelHandler = () => {
        this.setState({
            ShowModal: false
        })
    }

    render() {
        const { List, Model,errors } = this.state
        return (
            <div class="container">
                {/* {JSON.stringify(this.state.Model)} */}
                <button class="btn btn-success" onClick={() => this.ModalHandler()}>Add</button>
                <table class="table table-dark table-striped">
                    <thead>
                        <tr>
                            <th scope="col">name</th>
                            <th scope="col">description</th>
                            <th scope="col">active</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            List.map(data => {
                                return (
                                    <tr>
                                        <td >{data.name}</td>
                                        <td>{data.description}</td>
                                        <td>{data.active.toString()}</td>
                                        <td>
                                            <button class="btn btn-primary" onClick={() => this.editHandler(data._id)}>Edit</button>
                                            <button class="btn btn-danger" onClick={() => this.deleteHandler(data._id)}>Delete</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <FormInput changeHandler={this.changeHandler}
                    checkedHandler={this.checkedHandler}
                    saveHandler={this.saveHandler}
                    Model={Model}
                    ShowModal={this.state.ShowModal}
                    cancelHandler={this.cancelHandler}
                    errors={errors}
                />
            </div>
        )
    }
}