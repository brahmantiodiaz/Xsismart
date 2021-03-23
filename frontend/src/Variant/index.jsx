import React from 'react'
import categoryService from '../Service/categoryService'
import variantService from '../Service/variantService'
import VariantService from '../Service/variantService'
import FormInput from './forminput'

export default class index extends React.Component {
    VariantModel = {
        _id: "",
        name: "",
        description: "",
        category_id: "",
        active: false,
        create_by: "",
        create_at: "",
        update_by: "",
        update_at: "",
    }


    constructor() {
        super()
        this.state = {
            List: [],
            ListCategory: [],
            Model: this.VariantModel,
            mode: "",
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

        if (!fields["category_id"]) {
            formIsValid = false;
            errors["category_id"] = "Cannot be empty";
        }

        this.setState({ errors: errors });
        return formIsValid;
    }


    loadList = async () => {
        const respon = await variantService.getAll()
        const responCategory = await categoryService.getAll()
        if (respon.success) {
            this.setState({
                List: respon.result,
                ListCategory: responCategory.result
            })
        }
    }

    deleteHandler = async (id) => {
        const respon = await variantService.deleteData(id)
        if (respon.success) {
            alert('Success Delete Data')
            this.loadList()
        }
    }

    saveHandler = async () => {
        if (this.handleValidation()) {
            if (this.state.Mode == "edit") {
                const respon = await variantService.editData(this.state.Model)
                if (respon.success) {
                    alert("Success Update Data")
                    this.setState({
                        Model: this.VariantModel,
                        Mode: ""
                    })
                    this.loadList()
                }
            } else {
                const respon = await variantService.addData(this.state.Model)
                if (respon.success) {
                    alert("Success Save Data")
                    this.setState({
                        Model: this.VariantModel
                    })
                    this.loadList()
                }
            }
        } else {
            alert("Form has errors.")
        }

    }

    editHandler = async (id) => {
        alert("Edit data " + id)
        const respon = await variantService.getById(id)
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
            Model: this.VariantModel
        })
    }

    cancelHandler = () => {
        this.setState({
            ShowModal: false
        })
    }


    render() {
        const { List, Model, ShowModal,errors } = this.state
        return (
            <div class="container">
                {/* {JSON.stringify(this.state.Model)} */}
                <button class="btn btn-success" onClick={() => this.ModalHandler()}>Add</button>
                <table class="table table-dark table-striped">
                    <thead>
                        <tr>
                            <th scope="col">name</th>
                            <th scope="col">description</th>
                            <th scope="col">category name</th>
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
                                        <td>{data.category_name}</td>
                                        <td>{data.active.toString()}</td>
                                        <td>
                                            <button class="btn btn-primary " onClick={() => this.editHandler(data._id)}>Edit</button>
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
                    List={this.state.ListCategory}
                    ShowModal={ShowModal}
                    ModalHandler={this.ModalHandler}
                    cancelHandler={this.cancelHandler}
                    errors={errors}
                />
            </div>
        )
    }

}

