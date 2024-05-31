import React from 'react';

export default function UserManagement() {
  document.title = "User Management"
  return (
    <>
      <h1 className="page-header">
        User Management <small>Manage users here...</small>
      </h1>

      <div className="mb-sm-4 mb-3 d-sm-flex">
        
      </div>
      <div className="card">
        <ul className="nav nav-tabs nav-tabs-v2 px-4" role="tablist">
          <li className="nav-item me-3" role="presentation">
            <a  className="nav-link px-2 active" data-bs-toggle="tab" aria-selected="true" role="tab">All</a>
          </li>
          <li className="nav-item me-3" role="presentation">
            <a  className="nav-link px-2" data-bs-toggle="tab" aria-selected="false" role="tab" tabIndex="-1">Active</a>
          </li>
          <li className="nav-item me-3" role="presentation">
            <a  className="nav-link px-2" data-bs-toggle="tab" aria-selected="false" role="tab" tabIndex="-1">Inactive</a>
          </li>
          <li className="nav-item me-3" role="presentation">
            <a className="nav-link px-2" data-bs-toggle="tab" aria-selected="false" role="tab" tabIndex="-1">Pending</a>
          </li>
        </ul>
        <div className="tab-content p-4">
          <div className="tab-pane fade active show" id="allTab" role="tabpanel">
            <div className="input-group mb-4">
              <div className="flex-fill position-relative">
                <div className="input-group">
                  <div className="input-group-text position-absolute top-0 bottom-0 bg-none border-0 pe-0" style={{ zIndex: 1020 }}>
                    <i className="fa fa-search opacity-5"></i>
                  </div>
                  <input type="text" className="form-control ps-35px" placeholder="Search accounts" />
                </div>
              </div>
            </div>

            <div className="table-responsive">
              <table className="table table-hover text-nowrap">
                <thead>
                  <tr>
                    <th className="pt-0 pb-2"></th>
                    <th className="pt-0 pb-2">Username</th>
                    <th className="pt-0 pb-2">Name</th>
                    <th className="pt-0 pb-2">Status</th>
                    <th className="pt-0 pb-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="w-10px align-middle">
                      <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="product1" />
                        <label className="form-check-label" htmlFor="product1"></label>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="w-50px h-50px bg-inverse bg-opacity-25 d-flex align-items-center justify-content-center">
                          <img alt="" className="mw-100 mh-100" src="assets/img/product/product-6.jpg" />
                        </div>
                        <div className="ms-3">
                          <a href="page_product_details.html" className="text-inverse text-opacity-75 text-decoration-none">Force Majeure White T Shirt</a>
                        </div>
                      </div>
                    </td>
                    <td className="align-middle">83 in stock for 3 variants</td>
                    <td className="align-middle">Cotton</td>
                    <td className="align-middle">Force Majeure</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="d-md-flex align-items-center">
              <div className="me-md-auto text-md-left text-center mb-2 mb-md-0">
                Showing 1 to 10 of 57 entries
              </div>
              <ul className="pagination mb-0 justify-content-center">
                <li className="page-item disabled"><a className="page-link">Previous</a></li>
                <li className="page-item"><a className="page-link" href="#">1</a></li>
                <li className="page-item active"><a className="page-link" href="#">2</a></li>
                <li className="page-item"><a className="page-link" href="#">3</a></li>
                <li className="page-item"><a className="page-link" href="#">4</a></li>
                <li className="page-item"><a className="page-link" href="#">5</a></li>
                <li className="page-item"><a className="page-link" href="#">6</a></li>
                <li className="page-item"><a className="page-link" href="#">Next</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="card-arrow">
          <div className="card-arrow-top-left"></div>
          <div className="card-arrow-top-right"></div>
          <div className="card-arrow-bottom-left"></div>
          <div className="card-arrow-bottom-right"></div>
        </div>
      </div>
    </>
  );
}
