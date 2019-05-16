import React from "react";
import { Input } from "Components";
import "./category-group-heading.less";

const CategoryGroupHeading = ({ editing, title, updateTitle }) => (
  <div className="category-group--title">
    {editing ? (
      <Input
        className="category-group--title-input"
        value={title}
        placeholder="Group name"
        onChange={e => updateTitle(e.target.value)}
      />
    ) : (
      <h3>{title}</h3>
    )}
  </div>
);

export default CategoryGroupHeading;
