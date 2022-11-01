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
import shortid from "shortid";
import {
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
} from "../reducers/post";
import { ADD_POST_TO_ME } from "../reducers/user";

function addPostApi(data) {
  return axios.post("/api/post", data);
}

function* addPost(action) {
  try {
    // const result = yield call(addPostApi, action.data);
    const id = shortid.generate();
    yield delay(1000);
    yield put({
      type: ADD_POST_SUCCESS,
      data: {
        id,
        content: action.data,
      },
    });
    yield put({
      type: ADD_POST_TO_ME,
      data: id,
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
      type: ADD_COMMENT_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: ADD_COMMENT_FAILURE,
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
