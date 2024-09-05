import { configureStore } from "@reduxjs/toolkit";
import incidentsReducer from "./reducer/incidents";



//const sagaMiddlware = createSagaMiddleware();


export const store = configureStore({
    reducer: {incidents: incidentsReducer},
    //middleware: () => [sagaMiddlware]
});

//sagaMiddlware.run(incidentsSaga);

