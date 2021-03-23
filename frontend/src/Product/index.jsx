import React from 'react'
import variantService from '../Service/variantService'
import ProductService from '../Service/productService'
import FormInput from './formInput'
import categoryService from '../Service/categoryService'
import productService from '../Service/productService'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'

export default class index extends React.Component {
    ProductModel = {
        _id: "",
        name: "",
        price: 0,
        stock: 0,
        description: "",
        variant_id: "",
        image: "",
        active: false,
        create_by: "",
        create_at: "",
        update_by: "",
        update_at: "",
        category_id: ""
    }

    constructor() {
        super()
        this.state = {
            List: [],
            ListCategory: [],
            ListVariant: [],
            Model: this.ProductModel,
            ShowModal: false,
            errors: {},
            filter: {
                search: '',
                order: '',
                page: '1',
                pagesize: '5'
            },
            TotalPage:0
        }
    }

    loadList = async () => {
        const respon = await ProductService.getAll(this.state.filter)
        const responCategory = await categoryService.getAll()
        const responCount = await ProductService.countData()
        if (respon.success) {
            let count = responCount.result.count
            this.setState({
                List: respon.result,
                ListCategory: responCategory.result,
                TotalPage:Math.ceil(count/this.state.filter.pagesize)
            })
        }
        console.log(this.state.TotalPage)
    }


    getVariant = async (id) => {
        const respon = await variantService.getByCategoryId(id)
        if (respon.success) {
            this.setState({
                ListVariant: respon.result
            })
        }
        console.log(this.state.ListVariant)
    }

    componentDidMount() {
        this.loadList()
    }
    changeHandler = field => ({ target: { value } }) => {
        if (field == "category_id") {
            this.getVariant(value)
        }

        this.setState({
            Model: {
                ...this.state.Model,
                [field]: value
            }
        })
        // if (id!="") {
        //     this.categoryHandler()
        // }

    }

    filterHandler = field => ({ target: { value } }) => {
        this.setState({
            filter: {
                ...this.state.filter,
                [field]: value
            }
        })
    }

    pageSizeHandler = (size) => {
        this.setState({
            filter: {
                ...this.state.filter,
                ["pagesize"]: size
            }
        }, () => this.loadList())
        console.log(this.state.filter)
    }

    editHandler = async (id) => {
        alert("Edit data " + id)
        const respon = await productService.getById(id)
        this.setState({
            Mode: "edit",
            ShowModal: true
        })
        if (respon.success) {
            this.setState({
                Model: respon.result
            })
            this.getVariant(this.state.Model.category_id)
        }
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
            // Model: this.VariantModel
        })
    }

    cancelHandler = () => {
        this.setState({
            ShowModal: false
        })
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

        if (!fields["price"]) {
            formIsValid = false;
            errors["price"] = "Cannot be empty";
        }

        if (!fields["stock"]) {
            formIsValid = false;
            errors["stock"] = "Cannot be empty";
        }

        if (!fields["variant_id"]) {
            formIsValid = false;
            errors["variant_id"] = "Cannot be empty";
        }

        this.setState({ errors: errors });
        return formIsValid;
    }

    saveHandler = async () => {
        if (this.handleValidation()) {
            if (this.state.Mode == "edit") {
                const respon = await ProductService.editData(this.state.Model)
                if (respon.success) {
                    alert("Success Update Data")
                    this.setState({
                        Model: this.ProductModel,
                        Mode: "",
                        ShowModal: false
                    })
                    this.loadList()
                }
            } else {
                const respon = await ProductService.addData(this.state.Model)
                if (respon.success) {
                    alert("Success Save Data")
                    this.setState({
                        Model: this.ProductModel,
                        ShowModal: false
                    })
                    this.loadList()
                }
            }
        } else {
            alert("Form has errors.")
        }

    }

    deleteHandler = async (id) => {
        const respon = await productService.deleteData(id)
        if (respon.success) {
            alert('Success Delete Data')
            this.loadList()
        }
    }

    changePageHandler = (number) => {
        this.setState({
            filter: {
                ...this.state.filter,
                ["page"]: number
            }
        }, () => this.loadList())
    }

    renderPagination(){
        let item = []
        for (let number = 1; number <= this.state.TotalPage; number++) {
            item.push(
                <PaginationItem key={number} active={number===this.state.filter}>
                <PaginationLink onClick={() => this.changePageHandler(number)}>
                    {number}                    
                    </PaginationLink>    
                </PaginationItem>
            )
            
        }
        return (
            <Pagination>
                {item}
            </Pagination>
        )
    }

    sortHandler = () =>{
        let sort = ''
        sort = this.state.filter.order == '' ? '1':'-1'
        sort = this.state.filter.order == '-1' ? '1':'-1'
        
        this.setState({
          filter : {
              ...this.state.filter,
              ['order']:sort
          }  
        },()=>this.loadList())
        console.log(this.state.filter)
    }

    render() {
        const { List, Model, ListCategory, ListVariant } = this.state
        return (
            <div class="container">
                {JSON.stringify(this.state.Model)}

                <button class="btn btn-success" onClick={() => this.ModalHandler()}>Add</button>
                {JSON.stringify(this.state.filter)}
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Product Table</h3>
                        <div class="card-tools">
                            <div class="input-group input-group-sm" >
                                <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="true">
                                    Show Data
                                    </button>
                                <ul class="dropdown-menu">
                                    <li><a href="#" onClick={() => this.pageSizeHandler('5')} className="dropdown-item">5</a></li>
                                    <li><a href="#" onClick={() => this.pageSizeHandler('10')} className="dropdown-item">10</a></li>
                                    <li><a href="#" onClick={() => this.pageSizeHandler('20')} className="dropdown-item">20</a></li>
                                    <li><a href="#" onClick={() => this.pageSizeHandler('30')} className="dropdown-item">30</a></li>
                                </ul>
                                <input type="text" name="table_search" class="form-control float-right" placeholder="Search" onChange={this.filterHandler('search')} />
                                <div class="input-group-append">
                                    <button type="submit" class="btn btn-default" onClick={this.loadList}><i class="fas fa-search"></i></button>
                                    <button type="submit" class="btn btn-default" onClick={this.sortHandler}><i class="fas fa-sort"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-body table-responsive p-0 text-dark">
                        <table class="table table-striped">
                            <thead class="thead-light" >
                                <tr>
                                    <th scope="col">name
                                    <button type="submit" class="btn btn-default-outline" onClick={this.sortHandler}><i class="fas fa-sort"></i></button>
                                    </th>
                                    <th scope="col">description</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Stock</th>
                                    <th scope="col">Variant</th>
                                    <th scope="col">Category</th>
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
                                                <td>{data.price}</td>
                                                <td>{data.stock}</td>
                                                <td>{data.variant_name}</td>
                                                <td>{data.category_name}</td>
                                                <td>{data.active.toString()}</td>
                                                <td>
                                                    <button class="btn btn-primary fas fa-edit" onClick={() => this.editHandler(data._id)} ></button>
                                                    <button class="btn btn-danger fas fa-trash-alt" onClick={() => this.deleteHandler(data._id)}></button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                        <div className= "float-right">
                        {this.renderPagination()}
                        </div>
                    </div>
                    <FormInput
                        ShowModal={this.state.ShowModal}
                        cancelHandler={this.cancelHandler}
                        changeHandler={this.changeHandler}
                        checkedHandler={this.checkedHandler}
                        categoryHandler={this.categoryHandler}
                        Model={Model}
                        ListCategory={ListCategory}
                        ListVariant={ListVariant}
                        saveHandler={this.saveHandler}
                        errors={this.state.errors}

                    />
                </div>
            </div>
        )
    }
}