import React from 'react'
import { Modal } from 'react-bootstrap'
export default class formInput extends React.Component {

    render() {
        const { changeHandler, checkedHandler, saveHandler, Model, List,ShowModal,cancelHandler,errors } = this.props
        return (
            <div>
                <Modal show={ShowModal} onHide={cancelHandler}>
                    <Modal.Header closeButton>
                        <Modal.Title>Form Input</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <div class="mb-3">
                    <label for="name" class="form-label">Name</label>
                    <input type="txt" class="form-control" id="name" value={Model.name} onChange={changeHandler('name')} />
                    <span className="error">{errors["name"]}</span>
                </div>
                <div class="mb-3">
                    <label for="name" class="form-label">Description</label>
                    <input type="txt" class="form-control" id="description" value={Model.description} onChange={changeHandler('description')} />
                    <span className="error">{errors["description"]}</span>
                </div>
                <label for="name" class="form-label">Category</label>
                <select class="form-control" value={Model.category_id} onChange={changeHandler('category_id')}>
                    <option selected hidden>Pilih Category</option>
                    {
                        List.map(data => {
                            return (
                                <option value={data._id}>{data.name}</option>
                            )
                        })
                    }
                </select>
                <span className="error">{errors["category_id"]}</span>
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