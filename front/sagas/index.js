import axios from "axios";
import { all, call, fork, put, take } from "redux-saga/effects";

function loginApi() {
  return axios.post("/api/login");
}

function* logIn() {
  try {
    const result = yield call(loginApi);
    yield put({
      type: "LOG_IN_SUCCESS",
      data: result.data,
    });
  } catch(err) {
    yield put({
        type: "LOG_IN_FAILURE",
        data: err.response.data
    })
  }
}

function* watchLogin() {
  yield take("LOG_IN_REQUEST", logIn);
}
function* watchLogOut() {
  yield take("LOG_OUT_REQUEST");
}
function* watchAddPost() {
  yield take("ADD_POST_REQUEST");
}

export default function* rootSaga() {
  yield all([fork(watchLogin), fork(watchLogOut), fork(watchAddPost)]);
}
