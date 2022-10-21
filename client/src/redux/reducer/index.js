const initialState = {
  allCows:[],
  allCowsSearch:[],
};

export default function RootReducer(state = initialState, action) {
  switch (action.type) {
    case "ALL_COWS":
      console.log(action.payload, "payload en reducer");
      return {
        ...state,
        allCows: [...action.payload],
        allCowsSearch: [],
      };
    case "UPDATE_COW":
      return {
        ...state,
        allCows: action.payload,
        allCowsSearch: [],
      };
    case "CREATE_COW":
      return {
        ...state,
        allCows: [...state.allCows, action.payload],
      };
    case "DELETE_COW":
      if (state.allCowsSearch.length) {
        let filterArray = state.allCowsSearch.filter(
          (e) => e._id !== action.idDelete
        );

        return {
          ...state,
          allCows: action.payload,
          allCowsSearch: [...filterArray],
        };
      } else {
        return {
          ...state,
          allCows: action.payload,
        };
      }
    case "SEARCH_COWS":
      return {
        ...state,
        allCowsSearch: action.payload,
      };
    case "RESET_SEARCH_COW":
      return {
        ...state,
        allCowsSearch: [],
      };
    default:
      return state;
  }
}
