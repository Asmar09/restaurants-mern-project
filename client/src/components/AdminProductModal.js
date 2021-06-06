import React,{useState, useEffect} from 'react';
import { ErrorMessage, SuccessMessage } from "../helpers/message";
import { Loading } from "../helpers/loading";
import {getCategories } from "../api/category";
import { createProduct } from "../api/product";
import isEmpty from "validator/lib/isEmpty";

const AdminProductModal = () => {

    const [categories, setCategories] = useState(null);
    const [errorMsg, setErrorMsg] = useState(false);
    const [successMsg, setSuccessMsg] = useState(false);
    const [loading, setLoading] = useState(false);
    const [productData, setProductData] = useState({
      productImage: null,
      productName: "",
      productDesc: "",
      productPrice: "",
      productCategory: "",
      productQty: "",
    });
    const {
        productImage,
        productName,
        productDesc,
        productPrice,
        productCategory,
        productQty,
      } = productData;
    
      useEffect(() => {
        loadCategories();
      }, [loading]);
    
      const loadCategories = async () => {
        await getCategories()
          .then((response) => {
            setCategories(response.data.categories);
            console.log(categories);
          })
          .catch((err) => {
            console.log("error found when fetch data", err);
          });
      };
    
      const handleMessages = (e) => {
        setErrorMsg(false);
        setSuccessMsg(false);
      };
    
      const handleProductImage = (e) => {
        console.log(e.target.files[0]);
        setProductData({
          ...productData,
          [e.target.name]: e.target.files[0],
        });
      };
    
      const handleProductChange = (e) => {
        setProductData({
          ...productData,
          [e.target.name]: e.target.value,
        });
      };
    
      const handleProductSubmit = (e) => {
        e.preventDefault();
        if (productImage === null) {
          setErrorMsg("Please Select an Image");
        } else if (
          isEmpty(productName) ||
          isEmpty(productPrice) ||
          isEmpty(productDesc)
        ) {
          setErrorMsg("All fields are required");
        } else if (isEmpty(productCategory)) {
          setErrorMsg("Please Select  Category");
        } else if (isEmpty(productQty)) {
          setErrorMsg("Please Select Quantity");
        } else {
          let formData = new FormData();
          formData.append("productImage", productImage);
          formData.append("productName", productName);
          formData.append("productDesc", productDesc);
          formData.append("productCategory", productCategory);
          formData.append("productPrice", productPrice);
          formData.append("productQty", productQty);
          setLoading(true)
          createProduct(formData)
            .then((response) => {
          setLoading(false)
              setProductData({
                productImage: null,
                productName: "",
                productDesc: "",
                productPrice: "",
                productCategory: "",
                productQty: "",
              });
    
              setSuccessMsg(response.data.successMessage);
            })
            .catch((err) => {
          setLoading(false)
              console.log(err);
              setErrorMsg(err.response.data.errorMessage);
            });
        }
      };
    
    return (

        <div id="addFoodModal" className="modal" onClick={handleMessages}>
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <form onSubmit={handleProductSubmit}>
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
                      <input
                        type="file"
                        className="custom-file-input"
                        name="productImage"
                        defaulValue={productImage}
                        onChange={handleProductImage}
                      />
                      {/* <lable className= "custom-file-label">choose file</lable> */}
                    </div>
                    <div className="form-group">
                      <label className="text-secondary">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="productName"
                        defaultValue={productName}
                        onChange={handleProductChange}
                      />
                    </div>
                    <div className="form-group">
                      <label className="text-secondary">Description</label>
                      <textarea
                        className="form-control"
                        rows="3"
                        name="productDesc"
                        defaultValue={productDesc}
                        onChange={handleProductChange}
                      ></textarea>
                    </div>
                    <div className="form-group">
                      <label className="text-secondary">Price</label>
                      <input
                        type="text"
                        className="form-control"
                        name="productPrice"
                        defaultValue={productPrice}
                        onChange={handleProductChange}
                      />
                    </div>
                    <div className="form-group row">
                      <div className="form-group col-md-6">
                        <label className="text-secondary">Category</label>
                        <select
                          className="form-select"
                          name="productCategory"
                          onChange={handleProductChange}
                        >
                          <option value="">Choose one...</option>
                          {categories &&
                            categories.map((c) => (
                              <option key={c._id} value={c._id}>
                                {c.category}
                              </option>
                            ))}
                        </select>
                      </div>
                      <div className="form-group col-md-6">
                        <label className="text-secondary">Quantity</label>
                        <input
                          type="number"
                          className="form-control"
                          min="0"
                          name="productQty"
                          defaultValue={productQty}
                          onChange={handleProductChange}
                        />
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
    )
}

export default AdminProductModal
