export const initialState = {
  basket: [],
  userData: [],
  productList: null,
  gasRateData: null,
  gasDeliveryRateData: null,
  totalCount: 0,
  payStatus: false,
  totalCharge: 0,
  itemAdded: false,
  showPopup: false,
};

const reducer = (state, action) => {
  // console.log(action);
  switch (action.type) {
    // Basket Operation
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item],
      };

    case "Update_Basket_Qty":
      // console.log(action.item);
      const index = state.basket.findIndex(
        (basketItem) => basketItem.itemId === action.item.itemId
      );

      let newBasketCopy = [...state.basket];

      if (index >= 0) {
        newBasketCopy[index].Qty = action.item.updateQty;
      } else {
        newBasketCopy.push(action.item);
      }

      return {
        ...state,
        basket: newBasketCopy,
      };

    case "EMPTY_BASKET":
      return {
        ...state,
        basket: [],
      };

    case "REMOVE_FROM_BASKET":
      //filtered to exclude the product with the itemId that matches the action itemId.
      const newBasket = state.basket.filter(
        (basketItem) => basketItem.itemId !== action.itemId
      );
      //update the basket to exclude the removed product.
      return {
        ...state,
        basket: newBasket,
      };

    //gasRate operation
    case "SET_GAS_RATE":
      return {
        ...state,
        gasRateData: { ...state.gasRateData, ...action.gasRateData },
      };

    // gasDeliveryRate operation
    case "SET_DELIVERY_RATE":
      return {
        ...state,
        gasDeliveryRateData: {
          ...state.gasDeliveryRateData,
          ...action.gasDeliveryRateData,
        },
      };

    //productList operation
    case "SET_PRODUCT_LIST":
      return {
        ...state,
        productList: { ...action.productList },
      };

    case "SET_USER":
      return {
        ...state,
        userData: { ...action.userData },
      };

    case "SET_TOTAL_COUNT":
      return {
        ...state,
        totalCount: action.totalCount,
      };

    case "SET_ITEM_ADDED":
      return {
        ...state,
        itemAdded: action.itemAdded,
      };

    case "SET_PAY_STATUS":
      return {
        ...state,
        payStatus: action.payStatus,
      };

    case "SET_SHOW_POPUP":
      return {
        ...state,
        showPopup: action.showPopup,
      };

    case "SET_TOTAL_CHARGE":
      return {
        ...state,
        totalCharge: action.totalCharge,
      };

    default:
      return state;
  }
};

export default reducer;
