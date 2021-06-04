import React, { useState , useEffect } from "react";
import { createCategory , getCategories } from "../api/category";
import isEmpty from "validator/lib/isEmpty";
import { ErrorMessage, SuccessMessage } from "../helpers/message";
import { Loading } from "../helpers/loading";

const AdminDashboard = () => {

  const [categories, setCategories] = useState(null)
  const [category, setCategory] = useState("");
  const [errorMsg, setErrorMsg] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    
    loadCategories()
  }, [loading])


  const loadCategories = async () =>{
    await getCategories()
    .then(response =>{
      setCategories(response.data.categories)
      console.log(categories);
    })
    .catch(err =>{
      console.log("error found when fetch data" , err);
    })
  }

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

  const handleMessages = (e) => {
    setErrorMsg(false);
    setSuccessMsg(false);
  };

  return (
    <section>
      <div className="bg-dark text-white py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h1>
                <i className="fas fa-home"> Dashboard</i>
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-light my-2">
        <div className="container">
          <div className="row pb-3">
            <div className="col-md-4 my-1">
              <button
                className="btn btn-outline-info w-100"
                data-bs-toggle="modal"
                data-bs-target="#addCategoryModal"
              >
                <i className="fas fa-plus"> Add Category</i>
              </button>
            </div>
            <div className="col-md-4 my-1">
              <button
                className="btn btn-outline-warning w-100"
                data-bs-toggle="modal"
                data-bs-target="#addFoodModal"
              >
                <i className="fas fa-plus"> Add Food</i>
              </button>
            </div>
            <div className="col-md-4 my-1">
              <button className="btn btn-outline-success w-100">
                <i className="fas fa-money-check-alt"> View Orders</i>
              </button>
            </div>
          </div>
        </div>
      </div>
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
      <div id="addFoodModal" className="modal" onClick={handleMessages}>
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <form onSubmit={handleCategorySubmit}>
              <div className="modal-header bg-warning text-white">
                <h5 className="modal-title">Add Food</h5>
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
                    <div className="custom-file mb-2">
                      <input type="file" className="custom-file-input" />
                      {/* <lable className= "custom-file-label">choose file</lable> */}
                    </div>
                    <div className="form-group">
                      <label className="text-secondary">Name</label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                      <label className="text-secondary">Description</label>
                      <textarea className="form-control" rows="3"></textarea>
                    </div>
                    <div className="form-group">
                      <label className="text-secondary">Price</label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="form-group row">
                      <div className="form-group col-md-6">
                      <label className="text-secondary">Category</label>
                        <select className="form-select">
                          <option>Choose one...</option>
                       {categories && categories.map( c => (
                          <option key={c._id} value={c._id}>{c.category}</option>
                       ))}
                        </select>
                      </div>
                    <div className="form-group col-md-6">
                    <label className="text-secondary">Quantity</label>
                    <input type="number" className="form-control" min="0" />
                    </div>
                    </div>
                  </>
                )}
              </div>
              <div className="modal-footer">
                <button data-bs-dismiss="modal" className="btn btn-secondary">
                  Close
                </button>
                <button type="submit" className="btn btn-warning text-white">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
