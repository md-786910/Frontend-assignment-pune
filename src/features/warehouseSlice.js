import { createSlice } from "@reduxjs/toolkit";

// Import the JSON data from the data folder
import warehousesData from "../json/warehouse.json";

const warehouseSlice = createSlice({
  name: "warehouses",
  initialState: {
    warehouses: warehousesData,
    filerData: warehousesData,
    details: [],
    filters: { city: "", cluster: "", spaceAvailableLimit: "" },
  },
  reducers: {
    // filter for city,cluster,space
    applyFilters: (state, action) => {
      console.log(action);
      if (action.payload.spaceAvailableLimit) {
        if (action.payload.spaceAvailableLimit === "all") {
          state.warehouses = warehousesData;
        }
        state.warehouses = warehousesData.filter((warehouse) => {
          if (action.payload.spaceAvailableLimit === "low") {
            return warehouse.space_available <= 100;
          } else if (action.payload.spaceAvailableLimit === "medium") {
            return (
              warehouse.space_available > 100 &&
              warehouse.space_available <= 1000
            );
          } else if (action.payload.spaceAvailableLimit === "high") {
            return warehouse.space_available > 1000;
          }
          return warehouse;
        });
      } else {
        state.warehouses = warehousesData?.filter(
          (warehouse) =>
            warehouse.city === action.payload.city ||
            warehouse.cluster === action.payload.cluster
        );
      }
    },

    // searchWarehouses by name
    searchWarehouses: (state, action) => {
      if (action.payload.search !== "") {
        state.warehouses = warehousesData.filter((warehouse) =>
          warehouse.name
            .toLowerCase()
            .includes(action.payload.search.toLowerCase())
        );
      } else {
        state.warehouses = warehousesData;
      }
    },

    // update warehouse
    updateWarehouse: (state, action) => {
      const updatedWarehouse = action.payload;
      const index = warehousesData.find(
        (warehouse) => warehouse.id===parseInt(updatedWarehouse.id));
      if (index) {
        state.warehouses[index.id] = updatedWarehouse;
        state.details[0] = updatedWarehouse
      }
    },


    // details
    warehouseDetails: (state, action) => {
   
      state.details = warehousesData?.filter(
        (warehouse) => warehouse.id === parseInt(action.payload.id)
      );
    },
  },
});

export const {
  applyFilters,
  selectWarehouse,
  updateWarehouse,
  warehouseDetails,
  searchWarehouses,
} = warehouseSlice.actions;

export default warehouseSlice.reducer;
