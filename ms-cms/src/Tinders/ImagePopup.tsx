/* eslint-disable jsx-a11y/alt-text */
import React, { Fragment } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { Button } from "react-admin";
import VisibilityIcon from "@material-ui/icons/Visibility";

const ImagePopup = (props: any) => {
  const [showDialog, setShowDialog] = React.useState(false);

  const handleCloseClick = (value: any) => {
    setShowDialog(false);
  };

  const handleClick = (values: any) => {
    setShowDialog(true);
  };

  return (
    <Fragment>
      <Button onClick={handleClick}>
        <VisibilityIcon />
      </Button>
      <Dialog fullWidth open={showDialog} onClose={handleCloseClick}>
        <DialogContent>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingBottom: 40,
              flexDirection: "column",
            }}
          >
            <div style={{ fontWeight: "bold", marginBottom: 10 }}>
              {props && props.record ? props.record.name : ""}
            </div>
            <img
              height="800"
              width="640"
              src={props && props.record ? props.record.url : ""}
            />
          </div>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default ImagePopup;
