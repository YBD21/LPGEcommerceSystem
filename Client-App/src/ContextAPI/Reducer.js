export const initialState = {
  basket: [],
  user: "",
  totalCount: 0,
};

const reducer = (state, action) => {
  // console.log(action);
  switch (action.type) {
    case "ADD_TO_BASKET":
      // ...state.basket,action.item
      //  {quantity : action.item.quantity}
      return {
        ...state,
        basket: [...state.basket, action.item],
      };
    case "Update_Basket":
      return {
        ...state,
        basket: [{ ...state.item }, action.item],
      };
    case "EMPTY_BASKET":
      return {
        ...state,
        basket: [],
      };

    case "REMOVE_FROM_BASKET":
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      let newBasket = [...state.basket];

      if (index >= 0) {
        newBasket.splice(index, 1);
      }

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
