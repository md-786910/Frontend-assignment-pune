import { useSelector, useDispatch } from "react-redux";
import WareHouseList from "./warehouseList";
import { applyFilters, searchWarehouses } from "../../features/warehouseSlice";
function HomePage() {
  const dispatch = useDispatch();
  let cities = [];
  let cluster = [];

  // uniques city
  const uniqueCities = new Set();
  // uniques cluster
  const uniqueClusters = new Set();

  // warehouse
  const warehouses = useSelector((state) => state.warehouses);
  const filterData = useSelector((state) => state.warehouses);
  const filters = useSelector((state) => state.filters);

  // hanle filters
  const handleFiltersChange = (e) => {
    const { name, value } = e.target;
    dispatch(
      applyFilters({
        ...filters,
        [name]: value,
      })
    );
  };
  // handle searchbar
  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    console.log(searchValue);
    dispatch(
      searchWarehouses({
        search: searchValue,
      })
    );
  };
  // cities
  filterData.filerData.forEach((item) => {
    if (!uniqueCities.has(item.city)) {
      uniqueCities.add(item.city);
      cities.push(item);
    }
  });
  // cluster
  filterData.filerData.forEach((item) => {
    if (!uniqueClusters.has(item.cluster)) {
      uniqueClusters.add(item.cluster);
      cluster.push(item);
    }
  });
  return (
    <div>
      <h1>Warehouse Search</h1>
      <div className="mt-3">
        <input
          type="text"
          placeholder="Search Warehouse"
          name="search"
          onChange={handleSearchChange}
        />
        <select
          name="city"
          value={filters?.city}
          onChange={handleFiltersChange}
        >
          <option disabled selected>
            All Cities
          </option>
          {cities?.map((opt) => {
            return (
              <option
                value={opt.city}
                key={opt.id}
                name={opt.city}
                id={opt.city}
              >
                {opt.city}
              </option>
            );
          })}
        </select>
        <select
          name="cluster"
          value={filters?.cluster}
          onChange={handleFiltersChange}
        >
          <option disabled selected>
            All Clusters
          </option>
          {cluster?.map((opt) => {
            return (
              <option
                value={opt.cluster}
                key={opt.id}
                name={opt.cluster}
                id={opt.cluster}
              >
                {opt.cluster}
              </option>
            );
          })}
        </select>
        <select
          name="spaceAvailableLimit"
          value={filters?.spaceAvailableLimit}
          onChange={handleFiltersChange}
        >
          <option value="all" disabled selected>
            All Space Available
          </option>
          <option value="low">Low Space Available</option>
          <option value="medium">Medium Space Available</option>
          <option value="high">High Space Available</option>
        </select>
      </div>
      <WareHouseList warehouses={warehouses?.warehouses} />
    </div>
  );
}

export default HomePage;
