import React from "react";
import Button from "../button/button";
import "./footer.less";

const FooterButton = ({ onClick, label, secondary }) => (
  <Button
    small
    secondary={secondary}
    onClick={onClick}
  >
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
  <div className="float-right">
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
  <div>
    {message && <h2>{message}</h2>}
    <FooterButtons
      editing={editing}
      primaryDefault={primaryDefault}
      primaryEditing={primaryEditing}
      secondaryDefault={secondaryDefault}
      secondaryEditing={secondaryEditing}
    />
  </div>
);

export default Footer;
