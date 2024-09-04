import { put, takeEvery } from "redux-saga/effects";
import { setIncidents } from "./reducer/incidents";

function* getIncidents(){
    let data = yield fetch("https://66d3057f184dce1713cf0fd8.mockapi.io/bytemonk/incidents");
    data = data.json();
    yield put(setIncidents(data));
}
function* incidentsSaga(){
  yield takeEvery(getIncidents);
}

export default incidentsSaga;
