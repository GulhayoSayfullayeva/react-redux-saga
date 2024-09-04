import { configureStore } from "@reduxjs/toolkit";
import incidentsReducer from "./reducer/incidents";
import incidentsSaga from "./incidentsSaga";
import createSagaMiddleware from 'redux-saga';


const sagaMiddlware = createSagaMiddleware();


export const store = configureStore({
    reducer: {incidents: incidentsReducer},
    middleware: () => [sagaMiddlware]
});

sagaMiddlware.run(incidentsSaga);

