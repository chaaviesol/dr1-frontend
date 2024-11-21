export const INITIAL_STATE = {
  sales_id: "",
  contact_no: "",
  doctor_name: "",
  delivery_address: "",
  user_name: "",
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
      const { field, value, id } = action.payload;
      console.log(action.payload);
      return {
        ...state,
        medicine_details: state.medicine_details.map((item) =>
          item.id === id ? { ...item, [field]: value } : item
        ),
      };
    }

    case ACTIONS.SELECT_TIMING: {
      const { field, value, id } = action.payload;
      console.log(action.payload);

      return {
        ...state,
        medicine_details: state.medicine_details.map((item) =>
          item.id === id
            ? {
                ...item,
                [field]:value
              }
            : item
        ),
      };
    }

    case ACTIONS.ADD_NEW_ROW: {
      return {
        ...state,
        medicine_details: [
          ...state.medicine_details,
          INITIAL_STATE.medicine_details[0],
        ],
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
};
