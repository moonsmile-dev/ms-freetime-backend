import * as React from "react";
import { List, Datagrid, TextField, ImageField, Button } from "react-admin";
import ImagePopup from "./ImagePopup";
import { Fragment } from "react";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import {
  REACT_PHOTO_API,
  PHOTO_STATUS_LIKE,
  PHOTO_STATUS_HATE,
  PHOTO_STATUS_HIDE,
} from "../common/contants";
import { FormatString } from "../common/strings";
const axios = require("axios");

const sendReactToPhotoAction = async (id: number, status: number) => {
  try {
    const url: string = FormatString(REACT_PHOTO_API, String(id));
    console.log(`Requesting to url: ${url}`);
    await axios.post(url, {
      status: status,
    });
  } catch (error) {
    console.log(error);
  }
};

const ReactButton = (props: any) => {
  const handleLikeAction = async () => {
    console.log(`like action ${props.record.id}`);
    await sendReactToPhotoAction(props.record.id, PHOTO_STATUS_LIKE);
  };

  const handleHateAction = async () => {
    console.log(`hate action ${props.record.id}`);
    await sendReactToPhotoAction(props.record.id, PHOTO_STATUS_HATE);
  };

  const handleHideAction = async () => {
    console.log(`hide action ${props.record.id}`);
    await sendReactToPhotoAction(props.record.id, PHOTO_STATUS_HIDE);
  };

  return (
    <div>
      {<Fragment>
        <Button onClick={handleLikeAction}>
          <ThumbUpAltIcon />
        </Button>
        <Button onClick={handleHateAction}>
          <ThumbDownIcon />
        </Button>
        <Button onClick={handleHideAction}>
          <HighlightOffIcon />
        </Button>
      </Fragment>}
    </div>
  );
};

export const PhotoList = (props: any) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <ImageField source="url" />
      <TextField source="userId" />
      <ReactButton />
      <ImagePopup />
    </Datagrid>
  </List>
);
