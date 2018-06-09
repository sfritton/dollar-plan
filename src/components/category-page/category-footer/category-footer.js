import React from "react";
import Button from "../../button/button";

const CategoryFooter = ({
  edit,
  cancel,
  back,
  saveTransactions,
  editTransactions
}) => (
  <div className="float-right">
    <Button secondary small onClick={edit ? cancel : back}>
      {edit ? 'Cancel' : 'Back to budget'}
    </Button>
    <Button small onClick={edit ? saveTransactions : editTransactions}>
      {edit ? 'Save transactions' : 'Edit transactions'}
    </Button>
  </div>
);

export default CategoryFooter;
