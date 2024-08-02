export const setHeadlines = (headlines: any[]) => ({
    type: 'SET_HEADLINES',
    payload: headlines,
  });
  
  export const setPinned = (pinned: any[]) => ({
    type: 'SET_PINNED',
    payload: pinned,
  });
  
  export const fetchAndStoreHeadlines = () => ({
    type: 'FETCH_AND_STORE_HEADLINES',
  });
  
  export const pinNewsItem = (item: any) => ({
    type: 'PIN_NEWS_ITEM',
    payload: item,
  });
  
  export const unpinNewsItem = (item: any) => ({
    type: 'UNPIN_NEWS_ITEM',
    payload: item,
  });


export const deleteNewsItem = (item:any) => ({
    type: 'DELETE_NEWS_ITEM',
    payload: item,
  });
  