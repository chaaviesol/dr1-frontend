export const INITIAL_STATE = {
  sales_id: "",
  order_type: "",
  contact_no: "",
  doctor_name: "",
  delivery_address: "",
  username: "",
  medicine_details: [
    {
      id: "",
      name: "",
      batch_no: "",
      category: [],
      timing: [],
      afterFd_beforeFd: "",
      takingQuantity: "",
      totalQuantity: "",
      hsn: "",
      mrp: "",
      selling_price: "",
    },
  ],
  total: "",
};

export const billingReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_STATE: {
      return {
        ...action.payload,
      };
    }
    case ACTIONS.UPDATE_FIELD: {
      return {
        ...state,
        [action.payload.field]: action.payload.value,
      };
    }
    case ACTIONS.UPDATE_PRODUCT: {
      const { field, value, rowIndex } = action.payload;
      console.log(action.payload);
      return {
        ...state,
        medicine_details: state.medicine_details.map((item, index) =>
          index === rowIndex ? { ...item, [field]: value } : item
        ),
      };
    }

    case ACTIONS.SELECT_TIMING: {
      const { field, value, rowIndex } = action.payload;
      console.log(action.payload);

      return {
        ...state,
        medicine_details: state.medicine_details.map((item, itemIndex) =>
          rowIndex === itemIndex
            ? {
                ...item,
                [field]: value,
              }
            : item
        ),
      };
    }

    case ACTIONS.ADD_NEW_ROW: {
      const isEmpty = state.medicine_details.some((ele) => !ele || !ele.name);
      if (!isEmpty) {
        return {
          ...state,
          medicine_details: [
            ...state.medicine_details,
            INITIAL_STATE.medicine_details[0],
          ],
        };
      }
      return state
    }
    case ACTIONS.CLICK_A_PRODUCT: {
      console.log("CLICK_A_PRODUCT action triggered"); // Debug
      const { item, rowIndex } = action.payload;
      console.log("Payload item:", item); // Debug

      const payload = {
        id: item.id,
        name: item.name,
        batch_no: "",
        category: item.category,
        timing: [],
        afterFd_beforeFd: "",
        takingQuantity: "",
        totalQuantity: "",
        hsn: item.hsn,
        mrp: item.mrp,
        selling_price: "",
      };

      return {
        ...state,
        medicine_details: state.medicine_details.map((currItem, index) =>
          index === rowIndex ? payload : currItem
        ),
      };
    }
    case ACTIONS.DELETE_A_PRODUCT: {
      const { rowIndex } = action.payload;
      return {
        ...state,
        medicine_details: state.medicine_details.filter(
          (currItem, index) => index !== rowIndex
        ),
      };
    }
    default: {
      return state;
    }
  }
};

export const ACTIONS = {
  SET_STATE: "SET_STATE",
  UPDATE_FIELD: "UPDATE_FIELD",
  ADD_NEW_ROW: "ADD_NEW_ROW",
  UPDATE_PRODUCT: "UPDATE_PRODUCT",
  SELECT_TIMING: "SELECT_TIMING",
  CLICK_A_PRODUCT: "CLICK_A_PRODUCT",
  DELETE_A_PRODUCT: "DELETE_A_PRODUCT",
};
