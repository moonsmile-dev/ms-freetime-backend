import * as React from "react";
import { Admin, Resource } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import { PhotoList } from "./Tinders/PhotoResource";
import { ANALYTIC_BACKEND_API } from "./common/contants";

console.log(`BACKEND API: ${ANALYTIC_BACKEND_API}`);
const dataProvider = jsonServerProvider(ANALYTIC_BACKEND_API);
const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="photos" list={PhotoList} />
  </Admin>
);

export default App;
