import React, { Fragment } from "react";
import Button from "../button/button";

const FooterButton = ({ onClick, label, secondary }) => (
  <Button small secondary={secondary} onClick={onClick}>
    {label}
  </Button>
);

const FooterButtons = ({
  editing,
  primaryDefault,
  primaryEditing,
  secondaryDefault,
  secondaryEditing
}) => (
  <div className="footer--buttons">
    {editing ? (
      <div>
        {secondaryEditing && <FooterButton secondary {...secondaryEditing} />}
        {primaryEditing && <FooterButton {...primaryEditing} />}
      </div>
    ) : (
      <div>
        {secondaryDefault && <FooterButton secondary {...secondaryDefault} />}
        {primaryDefault && <FooterButton {...primaryDefault} />}
      </div>
    )}
  </div>
);

const Footer = ({
  message,
  editing,
  primaryDefault,
  primaryEditing,
  secondaryDefault,
  secondaryEditing
}) => (
  <Fragment>
    <div className="footer--message">{message && <h2>{message}</h2>}</div>
    <FooterButtons
      editing={editing}
      primaryDefault={primaryDefault}
      primaryEditing={primaryEditing}
      secondaryDefault={secondaryDefault}
      secondaryEditing={secondaryEditing}
    />
  </Fragment>
);

export default Footer;
