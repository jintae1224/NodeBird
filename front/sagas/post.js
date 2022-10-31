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

function addPostApi(data) {
  return axios.post("/api/post", data);
}

function* addPost(action) {
  try {
    // const result = yield call(addPostApi, action.data);
    yield delay(1000);
    yield put({
      type: "ADD_POST_SUCCESS",
      // data: result.data,
    });
  } catch (err) {
    yield put({
      type: "ADD_POST_FAILURE",
      // data: err.response.data,
    });
  }
}
export default function* postSaga() {
  yield all([fork()]);
}
