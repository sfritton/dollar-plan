import React from "react";
import Button from "../button/button";
import "./footer.less";

const FooterButtons = ({ editing, save, cancel, adjust }) => (
  <div className="float-right">
    {editing ? (
      <div>
        <Button secondary small onClick={cancel}>
          Cancel
        </Button>
        <Button small onClick={save}>
          Save budget
        </Button>
      </div>
    ) : (
      <Button small onClick={adjust}>
        Adjust budget
      </Button>
    )}
  </div>
);

const Footer = ({ message, editing, save, cancel, adjust }) => (
  <div>
    <h2>{message}</h2>
    <FooterButtons
      editing={editing}
      save={save}
      cancel={cancel}
      adjust={adjust}
    />
  </div>
);

export default Footer;
