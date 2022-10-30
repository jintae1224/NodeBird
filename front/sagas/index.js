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
} from "redux-saga/effects";

function loginApi(data) {
  return axios.post("/api/login", data);
}

function* logIn(action) {
  try {
    const result = yield call(loginApi, action.data);
    yield put({
      type: "LOG_IN_SUCCESS",
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: "LOG_IN_FAILURE",
      data: err.response.data,
    });
  }
}

function logOutApi() {
  return axios.post("/api/logout");
}

function* logOut() {
  try {
    const result = yield call(logOutApi);
    yield put({
      type: "LOG_OUT_SUCCESS",
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: "LOG_OUT_FAILURE",
      data: err.response.data,
    });
  }
}

function addPostApi(data) {
  return axios.post("/api/post", data);
}

function* addPost(action) {
  try {
    const result = yield call(addPostApi, action.data);
    yield put({
      type: "ADD_POST_SUCCESS",
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: "ADD_POST_FAILURE",
      data: err.response.data,
    });
  }
}

function* watchLogin() {
  yield takeLatest("LOG_IN_REQUEST", logIn);
}
function* watchLogOut() {
  yield takeLatest("LOG_OUT_REQUEST", logOut);
}
function* watchAddPost() {
  yield throttle("ADD_POST_REQUEST", addPost, 2000);
}

export default function* rootSaga() {
  yield all([fork(watchLogin), fork(watchLogOut), fork(watchAddPost)]);
}
