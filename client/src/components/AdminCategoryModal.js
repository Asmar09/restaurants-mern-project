import React, { useState } from "react";
import isEmpty from "validator/lib/isEmpty";
import { ErrorMessage, SuccessMessage } from "../helpers/message";
import { Loading } from "../helpers/loading";
import { createCategory } from "../api/category";

const AdminCategoryModal = () => {
  const [category, setCategory] = useState("");
  const [errorMsg, setErrorMsg] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleMessages = (e) => {
    setErrorMsg(false);
    setSuccessMsg(false);
  };

  const handleCategory = (e) => {
    setErrorMsg(false);
    setSuccessMsg(false);
    setCategory(e.target.value);
  };

  const handleCategorySubmit = (e) => {
    e.preventDefault();

    if (isEmpty(category)) {
      setErrorMsg("Please select Category");
    } else {
      const data = { category };
      setLoading(true);
      createCategory(data)
        .then((response) => {
          setLoading(false);
          setSuccessMsg(response.data.successMessage);
          setCategory("");

          setTimeout(() => {
            setSuccessMsg(false);
            setCategory("");
          }, 3000);
        })
        .catch((err) => {
          setLoading(false);
          setErrorMsg(err.response.data.errorMessage);
        });
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
              <div>{errorMsg !== false ? ErrorMessage(errorMsg) : null}</div>
              <div>
                {successMsg !== false ? SuccessMessage(successMsg) : null}
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
