import axios from "axios";
import {
  all,
  call,
  fork,
  put,
  take,
  takeEvery,
  takeLatest,
  throttle,
  delay,
} from "redux-saga/effects";
import {
  ADD_COMMENT_REQUEST,
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
} from "../reducers/post";

function addPostApi(data) {
  return axios.post("/api/post", data);
}

function* addPost(action) {
  try {
    // const result = yield call(addPostApi, action.data);
    yield delay(1000);
    yield put({
      type: ADD_POST_SUCCESS,
      // data: result.data,
    });
  } catch (err) {
    yield put({
      type: ADD_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function addCommentApi(data) {
    return axios.post("/api/comment", data);
  }

function* addComment(action) {
  try {
    // const result = yield call(addPostApi, action.data);
    yield delay(1000);
    yield put({
      type: ADD_POST_SUCCESS,
      // data: result.data,
    });
  } catch (err) {
    yield put({
      type: ADD_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}
function* watchAddCommentPost() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga() {
  yield all([fork(watchAddPost), fork(watchAddCommentPost)]);
}
