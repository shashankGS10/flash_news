import { AnyAction } from 'redux';

const initialState = {
  headlines: [],
  pinned: [],
};

const newsReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case 'SET_HEADLINES':
      return {
        ...state,
        headlines: action.payload,
      };
    case 'SET_PINNED':
      return {
        ...state,
        pinned: action.payload,
      };
    case 'DELETE_NEWS_ITEM':
      // Assuming you want to delete from `headlines` or `pinned`
      return {
        ...state,
        headlines: state.headlines.filter(
          (item) => item.title !== action.payload.title
        ),
        pinned: state.pinned.filter(
          (item) => item.title !== action.payload.title
        ),
      };

    default:
      return state;
  }
};

export default newsReducer;