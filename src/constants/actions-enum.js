const Actions = {
  // Budget
  GET_ALL_BUDGETS: "GET_ALL_BUDGETS",
  GET_BUDGET: "GET_BUDGET",
  CREATE_NEW_BUDGET: "CREATE_NEW_BUDGET",
  SET_ACTIVE_BUDGET: "SET_ACTIVE_BUDGET",

  // Income Category
  UPDATE_INCOME_CATEGORY_TITLE: "UPDATE_INCOME_CATEGORY_TITLE",
  UPDATE_INCOME_CATEGORY_AMOUNT: "UPDATE_INCOME_CATEGORY_AMOUNT",
  ADD_INCOME_CATEGORY: "ADD_INCOME_CATEGORY",
  DELETE_INCOME_CATEGORY: "DELETE_INCOME_CATEGORY",

  // Expense Category
  UPDATE_EXPENSE_CATEGORY_TITLE: "UPDATE_EXPENSE_CATEGORY_TITLE",
  ADD_EXPENSE_CATEGORY: "ADD_EXPENSE_CATEGORY",
  DELETE_EXPENSE_CATEGORY: "DELETE_EXPENSE_CATEGORY",

  // Expense Sub-Category
  UPDATE_EXPENSE_SUB_CATEGORY_TITLE: "UPDATE_EXPENSE_SUB_CATEGORY_TITLE",
  UPDATE_EXPENSE_SUB_CATEGORY_AMOUNT: "UPDATE_EXPENSE_SUB_CATEGORY_AMOUNT",
  ADD_EXPENSE_SUB_CATEGORY: "ADD_EXPENSE_SUB_CATEGORY",
  DELETE_EXPENSE_SUB_CATEGORY: "DELETE_EXPENSE_SUB_CATEGORY",

  // Category Page
  SET_ACTIVE_CATEGORY: "SET_ACTIVE_CATEGORY",
  SAVE_CATEGORY_TO_BUDGET: "SAVE_CATEGORY_TO_BUDGET",

  // Transaction
  UPDATE_TRANSACTION_DATE: "UPDATE_TRANSACTION_DATE",
  UPDATE_TRANSACTION_DESCRIPTION: "UPDATE_TRANSACTION_DESCRIPTION",
  UPDATE_TRANSACTION_AMOUNT: "UPDATE_TRANSACTION_AMOUNT",
  ADD_TRANSACTION: "ADD_TRANSACTION",
  DELETE_TRANSACTION: "DELETE_TRANSACTION",

  // UI
  SET_PAGE: "SET_PAGE",
  SET_EDIT: "SET_EDIT"
};

export default Actions;
