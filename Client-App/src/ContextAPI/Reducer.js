export const initialState = {
  basket: [],
  user: null,
  totalCount: 0,
};

const reducer = (state, action) => {
  // console.log(action);
  switch (action.type) {
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

    case "SET_USER":
      return {
        ...state,
        user: { ...state.user, ...action.user },
      };

    case "SET_TOTAL_COUNT":
      return {
        ...state,
        totalCount: action.totalCount,
      };

    default:
      return state;
  }
};

export default reducer;
