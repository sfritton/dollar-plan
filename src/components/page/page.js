import React from "react";
import "./page.less";

const Page = ({ header, children, footer }) => (
  <div className="main">
    {header && <div className="nav">{header}</div>}
    <div className="content">{children}</div>
    {footer && <div className="footer">{footer}</div>}
  </div>
);

export default Page;
