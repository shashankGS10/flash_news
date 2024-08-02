interface NewsItem {
  title: string;
  url: string;
  source: {
    name: string;
  };
}

interface NewsState {
  headlines: NewsItem[];
  pinned: NewsItem[];
  logos: { [key: string]: string }; // Key is item title or URL
}

const initialState: NewsState = {
  headlines: [],
  pinned: [],
  logos: {},
};

const newsReducer = (state = initialState, action: AnyAction): NewsState => {
  switch (action.type) {
    case 'SET_HEADLINES':
      return {
        ...state,
        headlines: [...state.headlines, ...action.payload],
      };
    case 'SET_PINNED':
      return {
        ...state,
        pinned: action.payload,
      };
    case 'DELETE_NEWS_ITEM':
      return {
        ...state,
        headlines: state.headlines.filter(
          (item) => item.title !== action.payload.title
        ),
        pinned: state.pinned.filter(
          (item) => item.title !== action.payload.title
        ),
      };
    case 'SET_LOGO':
      return {
        ...state,
        logos: {
          ...state.logos,
          [action.payload.key]: action.payload.logoUrl,
        },
      };
    default:
      return state;
  }
};

export default newsReducer;