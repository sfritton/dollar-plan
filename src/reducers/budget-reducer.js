import * as fs from "fs";

import Actions from "../constants/actions-enum";
import DateService from "../services/date-service";

export default function reducer(state = { budgets: [] }, action) {
  const payload = action.payload;

  switch (action.type) {
    // Budget
    case Actions.GET_ALL_BUDGETS:
      return handleGetAllBudgets(state, payload);
    case Actions.GET_BUDGET:
      return handleGetBudget(state, payload);
    case Actions.CREATE_NEW_BUDGET:
      return handleCreateNewBudget(state, payload);
    case Actions.SET_ACTIVE_BUDGET:
      return handleSetActiveBudget(state, payload);

    // Income Category
    case Actions.UPDATE_INCOME_CATEGORY_TITLE:
      return handleUpdateIncomeCategoryTitle(state, payload);
    case Actions.UPDATE_INCOME_CATEGORY_AMOUNT:
      return handleUpdateIncomeCategoryAmount(state, payload);
    case Actions.ADD_INCOME_CATEGORY:
      return handleAddIncomeCategory(state);
    case Actions.DELETE_INCOME_CATEGORY:
      return handleDeleteIncomeCategory(state, payload);

    // Expense Category
    case Actions.UPDATE_EXPENSE_CATEGORY_TITLE:
      return handleUpdateExpenseCategoryTitle(state, payload);
    case Actions.ADD_EXPENSE_CATEGORY:
      return handleAddExpenseCategory(state);
    case Actions.DELETE_EXPENSE_CATEGORY:
      return handleDeleteExpenseCategory(state, payload);

    // Expense Sub-Category
    case Actions.UPDATE_EXPENSE_SUB_CATEGORY_TITLE:
      return handleUpdateExpenseSubCategoryTitle(state, payload);
    case Actions.UPDATE_EXPENSE_SUB_CATEGORY_AMOUNT:
      return handleUpdateSubCategoryAmount(state, payload);
    case Actions.ADD_EXPENSE_SUB_CATEGORY:
      return handleAddExpenseSubCategory(state, payload);
    case Actions.DELETE_EXPENSE_SUB_CATEGORY:
      return handleDeleteExpenseSubCategory(state, payload);

    // Category Page
    case Actions.SET_ACTIVE_CATEGORY:
      return handleSetActiveCategory(state, payload);
    case Actions.SAVE_CATEGORY_TO_BUDGET:
      return handleSaveCategoryToBudget(state, payload);

    // Transaction
    case Actions.UPDATE_TRANSACTION_DATE:
      return handleUpdateTransactionDate(state, payload);
    case Actions.UPDATE_TRANSACTION_DESCRIPTION:
      return handleUpdateTransactionDescription(state, payload);
    case Actions.UPDATE_TRANSACTION_AMOUNT:
      return handleUpdateTransactionAmount(state, payload);
    case Actions.ADD_TRANSACTION:
      return handleAddTransaction(state);
    case Actions.DELETE_TRANSACTION:
      return handleDeleteTransaction(state, payload);

    default:
      return state;
  }
}

/*****************************************************************************
 * Budget
 *****************************************************************************/
function handleGetAllBudgets(state, payload) {
  return {
    ...state,
    budgets: payload.map(budget => ({
      date: DateService.decodeDate(budget),
      loaded: false
    }))
  };
}

function handleGetBudget(state, payload) {
  const budget = JSON.parse(payload);
  budget.loaded = true;
  const { month, year } = budget.date;
  const index = state.budgets.findIndex(
    budget => budget.date.month === month && budget.date.year === year
  );
  const budgets = [...state.budgets];
  budgets[index] = budget;

  return {
    ...state,
    budgets
  };
}

function handleCreateNewBudget(state, payload) {
  const { month, year } = payload;
  if (
    state.budgets.findIndex(
      budget => budget.date.month === month && budget.date.year === year
    ) !== -1
  ) {
    return state;
  }

  const newBudget = {
    date: { month, year },
    incomes: [],
    expenses: [],
    loaded: true
  };

  // TODO: write to file?

  const budgets = state.budgets.concat(newBudget);

  return {
    ...state,
    budgets,
    activeBudgetIndex: budgets.length - 1
  };
}

function handleSetActiveBudget(state, payload) {
  const { month, year } = payload;
  const index = state.budgets.findIndex(
    budget => budget.date.month === month && budget.date.year === year
  );

  if (index < 0) {
    console.log("Cannot set active budget. Budget not found.");
    return state;
  }

  if (state.budgets[index].loaded) {
    return {
      ...state,
      activeBudgetIndex: index
    };
  }

  let budget = JSON.parse(fs.readFileSync(`data\\${year}-${month}.json`));
  budget.loaded = true;
  const budgets = [...state.budgets];
  budgets[index] = budget;

  return {
    ...state,
    budgets,
    activeBudgetIndex: index
  };
}

/*****************************************************************************
 * Income Category
 *****************************************************************************/
function handleUpdateIncomeCategoryTitle(state, payload) {
  if (
    payload.catId === null ||
    payload.catId === undefined ||
    payload.catId < 0
  ) {
    return state;
  }

  const { catId, title } = payload;

  const budget = { ...state.budgets[state.activeBudgetIndex] };
  const income = { ...budget.incomes[catId], title };

  budget.incomes = [...budget.incomes];
  budget.incomes[catId] = income;

  const budgets = [...state.budgets];
  budgets[state.activeBudgetIndex] = budget;

  return {
    ...state,
    budgets
  };
}

function handleUpdateIncomeCategoryAmount(state, payload) {
  if (
    payload.catId === null ||
    payload.catId === undefined ||
    payload.catId < 0 ||
    isNaN(payload.amount) ||
    payload.amount < 0
  ) {
    return state;
  }

  const { catId, amount } = payload;

  const budget = { ...state.budgets[state.activeBudgetIndex] };
  const income = {
    ...budget.incomes[catId],
    plannedAmount: amount
  };

  budget.incomes = [...budget.incomes];
  budget.incomes[catId] = income;

  const budgets = [...state.budgets];
  budgets[state.activeBudgetIndex] = budget;

  return {
    ...state,
    budgets
  };
}

function handleAddIncomeCategory(state) {
  const budget = { ...state.budgets[state.activeBudgetIndex] };
  budget.incomes = budget.incomes.concat({
    title: "",
    plannedAmount: 0,
    actualAmount: 0
  });

  const budgets = [...state.budgets];
  budgets[state.activeBudgetIndex] = budget;

  return {
    ...state,
    budgets
  };
}

function handleDeleteIncomeCategory(state, payload) {
  if (
    payload.catId === null ||
    payload.catId === undefined ||
    payload.catId < 0
  ) {
    return state;
  }

  const budget = { ...state.budgets[state.activeBudgetIndex] };
  budget.incomes = budget.incomes.filter((income, i) => i !== payload.catId);

  const budgets = [...state.budgets];
  budgets[state.activeBudgetIndex] = budget;

  return {
    ...state,
    budgets
  };
}

/*****************************************************************************
 * Expense Category
 *****************************************************************************/
function handleUpdateExpenseCategoryTitle(state, payload) {
  if (
    payload.catId === null ||
    payload.catId === undefined ||
    payload.catId < 0
  ) {
    return state;
  }

  const { catId, title } = payload;

  const budget = { ...state.budgets[state.activeBudgetIndex] };
  const expense = { ...budget.expenses[catId], title };

  budget.expenses = [...budget.expenses];
  budget.expenses[catId] = expense;

  const budgets = [...state.budgets];
  budgets[state.activeBudgetIndex] = budget;

  return {
    ...state,
    budgets
  };
}

function handleAddExpenseCategory(state) {
  const budget = { ...state.budgets[state.activeBudgetIndex] };
  budget.expenses = budget.expenses.concat({
    title: "",
    subCategories: [{ title: "", plannedAmount: 0, actualAmount: 0 }]
  });

  const budgets = [...state.budgets];
  budgets[state.activeBudgetIndex] = budget;

  return {
    ...state,
    budgets
  };
}

function handleDeleteExpenseCategory(state, payload) {
  if (
    payload.catId === null ||
    payload.catId === undefined ||
    payload.catId < 0
  ) {
    return state;
  }

  const budget = { ...state.budgets[state.activeBudgetIndex] };
  budget.expenses = budget.expenses.filter((expense, i) => i !== payload.catId);

  const budgets = [...state.budgets];
  budgets[state.activeBudgetIndex] = budget;

  return {
    ...state,
    budgets
  };
}

/*****************************************************************************
 * Expense Sub-Category
 *****************************************************************************/
function handleUpdateExpenseSubCategoryTitle(state, payload) {
  if (
    payload.catId === null ||
    payload.catId === undefined ||
    payload.catId < 0 ||
    payload.subCatId === null ||
    payload.subCatId === undefined ||
    payload.subCatId < 0
  ) {
    return state;
  }

  const { catId, subCatId, title } = payload;

  const budget = { ...state.budgets[state.activeBudgetIndex] };
  budget.expenses = [...budget.expenses];

  const category = { ...budget.expenses[catId] };
  category.subCategories = [...category.subCategories];
  category.subCategories[subCatId] = {
    ...category.subCategories[subCatId],
    title
  };

  budget.expenses[catId] = category;

  const budgets = [...state.budgets];
  budgets[state.activeBudgetIndex] = budget;

  return {
    ...state,
    budgets
  };
}

function handleUpdateExpenseSubCategoryAmount(state, payload) {
  if (
    payload.catId === null ||
    payload.catId === undefined ||
    payload.catId < 0 ||
    payload.subCatId === null ||
    payload.subCatId === undefined ||
    payload.subCatId < 0 ||
    isNaN(payload.amount) ||
    payload.amount < 0
  ) {
    return state;
  }

  const { catId, subCatId, amount } = payload;

  const budget = { ...state.budgets[state.activeBudgetIndex] };
  budget.expenses = [...budget.expenses];

  const category = { ...budget.expenses[catId] };
  category.subCategories = [...category.subCategories];
  category.subCategories[subCatId] = {
    ...category.subCategories[subCatId],
    plannedAmount: amount
  };

  budget.expenses[catId] = category;

  const budgets = [...state.budgets];
  budgets[state.activeBudgetIndex] = budget;

  return {
    ...state,
    budgets
  };
}

function handleAddExpenseSubCategory(state, payload) {
  if (
    payload.catId === null ||
    payload.catId === undefined ||
    payload.catId < 0
  ) {
    return state;
  }

  const catId = payload.catId;

  const budget = { ...state.budgets[state.activeBudgetIndex] };
  budget.expenses = [...budget.expenses];

  const category = { ...budget.expenses[catId] };
  category.subCategories = category.subCategories.concat({
    title: "",
    plannedAmount: 0,
    actualAmount: 0
  });

  budget.expenses[catId] = category;

  const budgets = [...state.budgets];
  budgets[state.activeBudgetIndex] = budget;

  return {
    ...state,
    budgets
  };
}

function handleDeleteExpenseSubCategory(state, payload) {
  if (
    payload.catId === null ||
    payload.catId === undefined ||
    payload.catId < 0 ||
    payload.subCatId === null ||
    payload.subCatId === undefined ||
    payload.subCatId < 0
  ) {
    return state;
  }

  const { catId, subCatId } = payload;

  const budget = { ...state.budgets[state.activeBudgetIndex] };
  budget.expenses = [...budget.expenses];

  const category = { ...budget.expenses[catId] };
  category.subCategories = category.subCategories.filter(
    (subCat, i) => i !== subCatId
  );

  budget.expenses[catId] = category;

  const budgets = [...state.budgets];
  budgets[state.activeBudgetIndex] = budget;

  return {
    ...state,
    budgets
  };
}

/*****************************************************************************
 * Category Page
 *****************************************************************************/
function handleSetActiveCategory(state, payload) {
  if (
    payload.catId === null ||
    payload.catId === undefined ||
    payload.catId < 0
  ) {
    return state;
  }

  // income
  if (payload.subCatId === undefined) {
    return {
      ...state,
      category: {
        ...state.budgets[state.activeBudgetIndex].incomes[payload.catId]
      },
      activeCategoryKey: { catId: payload.catId }
    };
  }

  if (payload.subCatId === null || payload.subCatId < 0) {
    return state;
  }

  // expense
  return {
    ...state,
    category: {
      ...state.budgets[state.activeBudgetIndex].expenses[payload.catId]
        .subCategories[payload.subCatId]
    },
    activeCategoryKey: { catId: payload.catId, subCatId: payload.subCatId }
  };
}

function handleSaveCategoryToBudget(state, payload) {
  const budget = { ...state.budgets[state.activeBudgetIndex] };

  if (state.activeCategoryKey.subCatId === undefined) {
    // income
    budget.incomes = [...budget.incomes];
    budget.incomes[state.activeCategoryKey.catId] = state.category;
  } else {
    // expense
    budget.expenses = [...budget.expenses];
    const expenseCategory = {
      ...budget.expenses[state.activeCategoryKey.catId]
    };
    expenseCategory.subCategories = [...expenseCategory.subCategories];
    expenseCategory.subCategories[state.activeCategoryKey.subCatId] =
      state.category;

    budget.expenses[state.activeCategoryKey.catId] = expenseCategory;
  }

  const budgets = [...state.budgets];
  budgets[state.activeBudgetIndex] = budget;

  return {
    ...state,
    budgets
  };
}

/*****************************************************************************
 * Transaction
 *****************************************************************************/
function handleUpdateTransactionDate(state, payload) {}

function handleUpdateTransactionDescription(state, payload) {}

function handleUpdateTransactionAmount(state, payload) {}

function handleAddTransaction(state) {}

function handleDeleteTransaction(state, payload) {}
