/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

function WarehouseList({ warehouses }) {
  return (
    <div className="row my-3 ">
      {warehouses?.map((ware) => {
        return (
          <div className="col-lg-4 mt-3" key={ware.id}>
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <div>id: {ware?.id}</div>
                <div>city :{ware?.city}</div>
                <div>code :{ware?.code}</div>
              </div>
              <div className="card-body">
                <h5 className="card-title">{ware?.name}</h5>
                <p className="card-text">cluster : {ware?.cluster}</p>

                <Link
                  to={`/detail/${ware.id}`}
                  className="btn btn-success btn-sm"
                >
                  go to warehouse
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default WarehouseList;
