import React, { useState } from "react";
import isEmpty from "validator/lib/isEmpty";
import { ErrorMessage, SuccessMessage } from "../helpers/message";
import { Loading } from "../helpers/loading";


import {useSelector , useDispatch} from 'react-redux';
import {clearMessages} from '../redux/actions/messageAction';
import {createCategories} from '../redux/actions/categoryAction';

const AdminCategoryModal = () => {

  const {successMsg , errorMsg} = useSelector(state => state.messages)
  const {loading} = useSelector(state => state.loading)
  const [category, setCategory] = useState("");
  const dispatch = useDispatch()
  const [clientErrorMsg , setClientErrorMsg] = useState('')

  const handleMessages = (e) => {
      dispatch(clearMessages())
  };

  const handleCategory = (e) => {
    dispatch(clearMessages())
    setClientErrorMsg('')
    setCategory(e.target.value);
  };

  const handleCategorySubmit = (e) => {
    e.preventDefault();

    if (isEmpty(category)) {
      setClientErrorMsg("Please select Category");
    } else {
      const data = { category };
        dispatch(createCategories(data))
        setCategory('')
    }
  };

  return (
    <div id="addCategoryModal" className="modal" onClick={handleMessages}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <form onSubmit={handleCategorySubmit}>
            <div className="modal-header bg-info text-white">
              <h5 className="modal-title">Add Category</h5>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body my-2">
              <div>{errorMsg !== '' ? ErrorMessage(errorMsg) : null}</div>
              <div>{clientErrorMsg !== '' ? ErrorMessage(clientErrorMsg) : null}</div>
              <div>
                {successMsg !== '' ? SuccessMessage(successMsg) : null}
              </div>
              {loading !== false ? (
                <div className="text-center"> {Loading()} </div>
              ) : (
                <>
                  <label className="text-secondary">Category</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={handleCategory}
                    name="category"
                    value={category}
                  />
                </>
              )}
            </div>
            <div className="modal-footer">
              <button data-bs-dismiss="modal" className="btn btn-secondary">
                Close
              </button>
              <button type="submit" className="btn btn-info">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminCategoryModal;
