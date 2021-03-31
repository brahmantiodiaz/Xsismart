import React from 'react'
import { Modal } from 'react-bootstrap'
import { ProgressBar } from 'react-bootstrap'
export default class formInput extends React.Component {
    render() {
        const { changeHandler, checkedHandler, saveHandler, Model, ShowModal, cancelHandler, errors, imageHandler,
            ListVariant, ListCategory, uploadHandler, imgname, progress } = this.props
        return (
            <div>
                <Modal show={ShowModal} onHide={cancelHandler}>
                    <Modal.Header closeButton>
                        <Modal.Title>Form Input</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div class="mb-3">
                            <label for="name" class="form-label">Name</label>
                            <input type="txt" class="form-control" placeholder="Name" id="name" value={Model.name} onChange={changeHandler('name')} />
                            <span className="error">{errors["name"]}</span>
                        </div>
                        <div class="mb-3">
                            <label for="description" class="form-label">Description</label>
                            <input type="txt" class="form-control" id="description" value={Model.description} onChange={changeHandler('description')} />
                            <span className="error">{errors["description"]}</span>
                        </div>
                        <div class="mb-3">
                            <label for="price" class="form-label">Price</label>
                            <input type="number" class="form-control" id="price" value={Model.price} onChange={changeHandler('price')} />
                            <span className="error">{errors["price"]}</span>
                        </div>
                        <div class="mb-3">
                            <label for="stock" class="form-label">stok</label>
                            <input type="number" class="form-control" id="stock" value={Model.stock} onChange={changeHandler('stock')} />
                            <span className="error">{errors["stock"]}</span>
                        </div>

                        <label for="category" class="form-label">Category</label>
                        <select class="form-control" value={Model.category_id} onChange={changeHandler('category_id')}>
                            <option selected hidden>Pilih Category</option>
                            {
                                ListCategory.map(data => {
                                    return (
                                        <option value={data._id}>{data.name}</option>
                                    )
                                })
                            }
                        </select>
                        {/* <span className="error">{errors["category_id"]}</span> */}
                        <label for="variant" class="form-label">Variant</label>
                        <select class="form-control" value={Model.variant_id} onChange={changeHandler('variant_id')}>
                            <option selected hidden>Pilih Variant</option>
                            {
                                ListVariant.map(test => {
                                    return (
                                        <option value={test._id}>{test.name}</option>
                                    )
                                })
                            }
                        </select>
                        <span className="error">{errors["variant_id"]}</span>
                        <div class="form-group">
                            <label for="exampleInputFile">File input</label>
                            <div class="input-group">
                                <div class="custom-file">
                                    <input type="file" class="custom-file-input" id="file" onChange={imageHandler} />
                                    <label class="custom-file-label" for="exampleInputFile">{imgname}</label>
                                </div>
                                <div class="input-group-append">
                                    <button type="button" id="" onClick={uploadHandler}>Upload</button>

                                </div>
                            </div>
                        </div>
                        {/* <progress value={progress} max ="100"/> */}
                        <ProgressBar now={progress} label={`${progress}%`} />
                        <span className="error">{errors["image"]}</span>
                        <div class="mb-3 form-check">
                            <input type="checkbox" class="form-check-input" id="active" checked={Model.active} onChange={checkedHandler('active')} />
                            <label class="form-check-label" for="active">Active</label>

                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <button type="button" class="btn btn-primary" onClick={saveHandler}>Submit</button>
                        <button type="button" class="btn btn-default" onClick={cancelHandler}>Cancel</button>
                    </Modal.Footer>
                </Modal>

            </div>
        )
    }
}