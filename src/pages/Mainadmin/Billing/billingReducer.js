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
      product_type: "",
      every: "",
      interval: "",
      discount: 0,
      medicine_unit: "",
      total: 0,
    },
  ],
  total: "",
};

//  function to calculate total while typing on quantity field
const calculateTotalWhileQty = (item, value) => {
  let baseTotal =
    item?.unit_of_measurement !== null
      ? item?.unit_of_measurement === "strip"
        ? (value * item.selling_price) / item.medicine_unit
        : value * item.selling_price
      : value * item.selling_price;
  console.log(baseTotal);
  if (item.discount) {
    baseTotal = baseTotal - (baseTotal * item.discount) / 100; // Apply percentage discount
  }

  return baseTotal;
};
//call when typing on discount field
const calculateTotalWhileDiscount = (item, value) => {
  let baseTotal =
    item?.unit_of_measurement !== null
      ? item?.unit_of_measurement === "strip"
        ? (item.totalQuantity * item.selling_price) / item.medicine_unit
        : item.totalQuantity * item.selling_price
      : item.totalQuantity * item.selling_price;
  if (value) {
    baseTotal = baseTotal - (baseTotal * value) / 100; // Apply percentage discount
  }

  return baseTotal;
};

export const billingReducer = (state, action) => {
  switch (action.type) {
    //setting the payload as state
    case ACTIONS.SET_STATE: {
      return {
        ...action.payload,
      };
    }
    //update fields,not the table
    case ACTIONS.UPDATE_FIELD: {
      return {
        ...state,
        [action.payload.field]: action.payload.value,
      };
    }
    //update all table columns except frquency,qty,discount
    case ACTIONS.UPDATE_PRODUCT: {
      const { field, value, rowIndex } = action.payload;
      return {
        ...state,
        medicine_details: state.medicine_details.map((item, index) =>
          index === rowIndex
            ? {
                ...item,
                [field]: value,
              }
            : item
        ),
      };
    }
    //it will only call when typing on quantity or discount
    case ACTIONS.UPDATE_PRODUCT_QTY_OR_DISCOUNT: {
      const { field, value, rowIndex } = action.payload;
      return {
        ...state,
        medicine_details: state.medicine_details.map((item, index) =>
          index === rowIndex
            ? {
                ...item,
                [field]: value,
                total:
                  field === "totalQuantity"
                    ? calculateTotalWhileQty(item, value) //value will be typing quantity
                    : calculateTotalWhileDiscount(item, value), //value will be typing discount
              }
            : item
        ),
      };
    }
    //update Frequency column
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
      return state;
    }
    //call when clicking a product from the products list box
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
        totalQuantity: 1,
        hsn: item.hsn,
        mrp: item.mrp,
        selling_price: item.selling_price,
        product_type: item?.product_type,
        every: "",
        interval: "",
        medicine_unit: item?.medicine_unit,
        unit_of_measurement: item?.unit_of_measurement,
        discount: 0,
        total:
          item?.unit_of_measurement !== null
            ? item?.unit_of_measurement === "strip"
              ? (1 * item.selling_price) / item.medicine_unit
              : 1 * item.selling_price
            : 1 * item.selling_price,
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
  UPDATE_PRODUCT_QTY_OR_DISCOUNT: "UPDATE_PRODUCT_QTY_OR_DISCOUNT",
  SELECT_TIMING: "SELECT_TIMING",
  CLICK_A_PRODUCT: "CLICK_A_PRODUCT",
  DELETE_A_PRODUCT: "DELETE_A_PRODUCT",
};
