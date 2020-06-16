import * as React from "react";
import { Admin, Resource } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import { PhotoList } from "./Tinders/PhotoResource";

const dataProvider = jsonServerProvider("http://127.0.0.1:3000");
const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="photos" list={PhotoList} />
  </Admin>
);

export default App;
