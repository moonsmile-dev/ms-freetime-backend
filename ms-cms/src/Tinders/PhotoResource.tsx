import * as React from "react";
import { List, Datagrid, TextField, EmailField, ImageField } from "react-admin";
import ImagePopup from "./ImagePopup";

export const PhotoList = (props: any) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <ImageField source="url" />
      <TextField source="userId" />
      <ImagePopup />
    </Datagrid>
  </List>
);
