import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  updateWarehouse,
  warehouseDetails,
} from "../../features/warehouseSlice";
import { useEffect, useState } from "react";

function Detail() {
  const [edit, setEdit] = useState(false);

  const dispatch = useDispatch();
  const { id } = useParams();
  const warehouses = useSelector((state) => state.warehouses);

  const [state, setState] = useState({
    city: "",
    code: "",
    name: "",
    space_available: "",
    type: "",
    cluster: "",
    is_registered: "",
    is_live: "",
  });

  // handle change
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = () => {
    dispatch(updateWarehouse({...state,id:id}));
    setEdit(false)
  };

  // filter warehouse by id;
  const CallDetailWarehouses = () => {
    dispatch(
      warehouseDetails({
        id: id,
      })
    );
  };

  useEffect(() => {
    CallDetailWarehouses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  return (
    <>
      <div className=" row detailBox">
        <h1>Warehouse Details</h1>
        {warehouses?.details &&
          warehouses?.details?.map((ware) => {
            return (
              <div className="col-lg-12 mt-3" key={ware.id}>
                <div className="card">
                  <div className="card-header d-flex justify-content-between align-items-center">
                    <div>id: {ware?.id}</div>
                    <div>
                      city :
                      {edit ? (
                        <input
                          type="text"
                          name={"city"}
                          value={state?.city}
                          onChange={(e) => handleChange(e)}
                        />
                      ) : (
                        ware?.city
                      )}
                    </div>
                    <div>
                      code :
                      {edit ? (
                        <input
                          type="text"
                          name="code"
                          value={state?.code}
                          onChange={(e) => handleChange(e)}
                        />
                      ) : (
                        ware?.code
                      )}
                    </div>
                  </div>
                  <div className="card-body">
                    <table className="table table-responsive-md">
                      <thead>
                        <tr>
                          <th scope="col">Name</th>
                          <th scope="col">space_available</th>
                          <th scope="col">Type</th>
                          <th scope="col">Cluster</th>
                          <th scope="col">is_registered</th>
                          <th scope="col">is_live</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">
                            {edit ? (
                              <input
                                type="text"
                                name="name"
                                value={state?.name}
                                onChange={(e) => handleChange(e)}
                              />
                            ) : (
                              ware?.name
                            )}
                          </th>
                          <td>
                            {edit ? (
                              <input
                                type="text"
                                name={"space_available"}
                                value={state?.space_available}
                                onChange={(e) => handleChange(e)}
                              />
                            ) : (
                              ware?.space_available
                            )}
                          </td>
                          <td>
                            {edit ? (
                              <input
                                type="text"
                                name={"type"}
                                value={state?.type}
                                onChange={(e) => handleChange(e)}
                              />
                            ) : (
                              ware?.type
                            )}
                          </td>
                          <td>
                            {edit ? (
                              <input
                                type="text"
                                name={"cluster"}
                                value={state?.cluster}
                                onChange={(e) => handleChange(e)}
                              />
                            ) : (
                              ware?.cluster
                            )}
                          </td>
                          <td>
                            {edit ? (
                              <input
                                type="text"
                                name={"is_registered"}
                                value={state?.is_registered}
                                onChange={(e) => handleChange(e)}
                              />
                            ) : ware?.is_registered ? (
                              "YES"
                            ) : (
                              "NO"
                            )}
                          </td>
                          <td>
                            {edit ? (
                              <input
                                type="text"
                                name={"is_live"}
                                value={state?.is_live}
                                onChange={(e) => handleChange(e)}
                              />
                            ) : ware?.is_live ? (
                              "YES"
                            ) : (
                              "NO"
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <button
                      onClick={() => {
                        setState({
                          city: ware?.city,
                          code: ware?.code,
                          name: ware?.name,
                          space_available: ware?.space_available,
                          type: ware?.type,
                          cluster: ware?.cluster,
                          is_registered: ware?.is_registered,
                          is_live: ware?.is_live,
                        });
                        setEdit(!edit);
                      }}
                      className="btn btn-primary btn-sm"
                    >
                      Edit Warehouse
                    </button>
                    {edit && (
                      <button
                        onClick={() => handleSubmit()}
                        className="mx-3 btn btn-info btn-sm"
                      >
                        Submit Warehouse
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default Detail;
