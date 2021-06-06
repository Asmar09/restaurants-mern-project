import React from "react";

const AdminActionButtons = () => {
  return (
    <div>
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
    </div>
  );
};

export default AdminActionButtons;
