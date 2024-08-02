import { call, put, takeEvery } from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchNews } from '../../services/api';
import { setHeadlines, setPinned } from '../actions/newsAction';

const HEADLINES_KEY = 'headlines';
const PINNED_NEWS_KEY = 'pinnedNews';

function* fetchAndStoreHeadlines() {
  try {
    const fetchedHeadlines = yield call(fetchNews);
    yield call(AsyncStorage.setItem, HEADLINES_KEY, JSON.stringify(fetchedHeadlines));
    yield put(setHeadlines(fetchedHeadlines.slice(0, 10)));
  } catch (error) {
    console.error('Error fetching and storing headlines:', error);
  }
}

function* pinNewsItem(action) {
  try {
    const currentPinned = yield call(getPinnedNews);
    const updatedPinned = [...currentPinned, action.payload];
    yield call(AsyncStorage.setItem, PINNED_NEWS_KEY, JSON.stringify(updatedPinned));
    yield put(setPinned(updatedPinned));
  } catch (error) {
    console.error('Failed to pin news item', error);
  }
}

function* unpinNewsItem(action) {
  try {
    const currentPinned = yield call(getPinnedNews);
    const updatedPinned = currentPinned.filter(
      (pinnedItem) => pinnedItem.title !== action.payload.title
    );
    yield call(AsyncStorage.setItem, PINNED_NEWS_KEY, JSON.stringify(updatedPinned));
    yield put(setPinned(updatedPinned));
  } catch (error) {
    console.error('Failed to unpin news item', error);
  }
}

function* loadPinnedNews() {
  try {
    const storedPinned = yield call(getPinnedNews);
    yield put(setPinned(storedPinned));
  } catch (error) {
    console.error('Error loading pinned news:', error);
  }
}

function getPinnedNews() {
  return AsyncStorage.getItem(PINNED_NEWS_KEY).then((jsonValue) =>
    jsonValue != null ? JSON.parse(jsonValue) : []
  );
}

export default function* newsSaga() {
  yield takeEvery('FETCH_AND_STORE_HEADLINES', fetchAndStoreHeadlines);
  yield takeEvery('PIN_NEWS_ITEM', pinNewsItem);
  yield takeEvery('UNPIN_NEWS_ITEM', unpinNewsItem);
  yield takeEvery('LOAD_PINNED_NEWS', loadPinnedNews);
}