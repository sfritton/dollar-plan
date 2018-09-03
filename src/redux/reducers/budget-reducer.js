import * as fs from "fs";

import Actions from "../actions/actions-enum";
import {
  encodeDate,
  decodeDate,
  compareDateStrings,
  getClosestToDate,
  getClosestToToday
} from "Util/date";

const DATA_DIRECTORY = "data";

export default function reducer(state = { budgets: [] }, action) {
  const payload = action.payload;

  switch (action.type) {
    // Budget
    case Actions.GET_ALL_BUDGETS:
      return handleGetAllBudgets(state);
    case Actions.GET_BUDGET:
      return handleGetBudget(state, payload);
    case Actions.CREATE_NEW_BUDGET:
      return handleCreateNewBudget(state, payload);
    case Actions.SET_ACTIVE_BUDGET:
      return handleSetActiveBudget(state, payload);
    case Actions.SAVE_BUDGET:
      return handleSaveBudget(state);

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
      return handleUpdateExpenseSubCategoryAmount(state, payload);
    case Actions.ADD_EXPENSE_SUB_CATEGORY:
      return handleAddExpenseSubCategory(state, payload);
    case Actions.DELETE_EXPENSE_SUB_CATEGORY:
      return handleDeleteExpenseSubCategory(state, payload);

    // Category Page
    case Actions.SET_ACTIVE_CATEGORY:
      return handleSetActiveCategory(state, payload);
    case Actions.SAVE_CATEGORY_TO_BUDGET:
      return handleSaveCategoryToBudget(state, payload);
    case Actions.RESET_CATEGORY:
      return handleResetCategory(state);

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
      return handleDeleteTransaction(state, payload.id);

    default:
      return state;
  }
}

/*****************************************************************************
 * Budget
 *****************************************************************************/
function handleGetAllBudgets(state) {
  checkDirectorySync(DATA_DIRECTORY);

  return {
    ...state,
    budgets: fs
      .readdirSync(DATA_DIRECTORY)
      .reverse()
      .map(budget => ({
        date: decodeDate(budget),
        loaded: false
      }))
  };
}

function handleGetBudget(state, payload) {
  const { month, year } = payload;
  const budget = JSON.parse(
    fs.readFileSync(
      `${DATA_DIRECTORY}\\${encodeDate(month, year)}.json`
    )
  );
  budget.loaded = true;
  const index = state.budgets.findIndex(
    b => b.date.month === month && b.date.year === year
  );
  const budgets = [...state.budgets];
  budgets[index] = budget;

  return {
    ...state,
    budgets
  };
}

function handleCreateNewBudget(state, payload) {
  const { month, year, oldMonth, oldYear } = payload;
  const newBudgetExists = state.budgets.some(
    ({ date }) => date.month === month && date.year === year
  );

  if (newBudgetExists) {
    return state;
  }

  const newBudget = {
    date: { month, year },
    incomes: [],
    expenses: [],
    loaded: true
  };

  if (oldMonth && oldYear) {
    let oldBudget = state.budgets.find(
      budget => budget.date.month === oldMonth && budget.date.year === oldYear
    );

    if (oldBudget) {
      if (!oldBudget.loaded) {
        oldBudget = JSON.parse(
          fs.readFileSync(
            `${DATA_DIRECTORY}\\${encodeDate(oldMonth, oldYear)}.json`
          )
        );
      }

      newBudget.incomes = oldBudget.incomes.map(income => ({
        title: income.title,
        plannedAmount: income.plannedAmount,
        transactions: []
      }));

      newBudget.expenses = oldBudget.expenses.map(expense => ({
        title: expense.title,
        subCategories: expense.subCategories.map(subCat => ({
          title: subCat.title,
          plannedAmount: subCat.plannedAmount,
          transactions: []
        }))
      }));
    }
  }

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

  const budget = JSON.parse(
    fs.readFileSync(
      `${DATA_DIRECTORY}\\${encodeDate(month, year)}.json`
    )
  );
  budget.loaded = true;
  const budgets = [...state.budgets];
  budgets[index] = budget;

  return {
    ...state,
    budgets,
    activeBudgetIndex: index
  };
}

function handleSaveBudget(state) {
  const { date, incomes, expenses } = state.budgets[state.activeBudgetIndex];
  const fileName = encodeDate(date.month, date.year) + ".json";

  fs.writeFileSync(
    `${DATA_DIRECTORY}\\${fileName}`,
    JSON.stringify({ date, incomes, expenses })
  );
  return state;
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
  const { catId, amount } = payload;

  if (
    catId === null ||
    catId === undefined ||
    catId < 0 ||
    isNaN(amount) ||
    amount < 0
  ) {
    return state;
  }

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
    transactions: []
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
    subCategories: [{ title: "", plannedAmount: 0, transactions: [] }]
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
    transactions: []
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
  const category = { ...state.category };
  const transactions = [...category.transactions];

  transactions.sort((a, b) => compareDateStrings(b.date, a.date));
  category.transactions = transactions;

  const budget = { ...state.budgets[state.activeBudgetIndex] };

  if (state.activeCategoryKey.subCatId === undefined) {
    // income
    budget.incomes = [...budget.incomes];
    budget.incomes[state.activeCategoryKey.catId] = category;
  } else {
    // expense
    budget.expenses = [...budget.expenses];
    const expenseCategory = {
      ...budget.expenses[state.activeCategoryKey.catId]
    };
    expenseCategory.subCategories = [...expenseCategory.subCategories];
    expenseCategory.subCategories[state.activeCategoryKey.subCatId] = category;

    budget.expenses[state.activeCategoryKey.catId] = expenseCategory;
  }

  const budgets = [...state.budgets];
  budgets[state.activeBudgetIndex] = budget;

  return {
    ...state,
    budgets,
    category
  };
}

function handleResetCategory(state) {
  const categoryKey = state.activeCategoryKey;
  // income
  if (categoryKey.subCatId === undefined) {
    return {
      ...state,
      category: {
        ...state.budgets[state.activeBudgetIndex].incomes[categoryKey.catId]
      }
    };
  }

  // expense
  return {
    ...state,
    category: {
      ...state.budgets[state.activeBudgetIndex].expenses[categoryKey.catId]
        .subCategories[categoryKey.subCatId]
    }
  };
}

/*****************************************************************************
 * Transaction
 *****************************************************************************/
function handleUpdateTransactionDate(state, payload) {
  const category = { ...state.category };
  const transaction = { ...category.transactions[payload.id] };
  const { month, year } = state.budgets[state.activeBudgetIndex].date;

  const targetDate = new Date(year, month - 1, payload.date);

  transaction.date = getClosestToDate(
    month,
    year,
    targetDate
  ).getDate();

  category.transactions = [...category.transactions];
  category.transactions[payload.id] = transaction;

  return { ...state, category };
}

function handleUpdateTransactionDescription(state, payload) {
  const category = { ...state.category };
  const transaction = {
    ...category.transactions[payload.id],
    description: payload.description
  };

  category.transactions = [...category.transactions];
  category.transactions[payload.id] = transaction;

  return { ...state, category };
}

function handleUpdateTransactionAmount(state, payload) {
  const { id, amount } = payload;

  if (
    id === null ||
    id === undefined ||
    id < 0 ||
    isNaN(amount) ||
    amount < 0
  ) {
    return state;
  }

  const category = { ...state.category };
  const transaction = {
    ...category.transactions[id],
    amount
  };

  category.transactions = [...category.transactions];
  category.transactions[id] = transaction;

  return { ...state, category };
}

function handleAddTransaction(state) {
  const date = getClosestToToday(
    state.budgets[state.activeBudgetIndex].date
  );

  const category = { ...state.category };
  category.transactions = category.transactions.concat({
    date: date.getDate(),
    description: "",
    amount: 0
  });

  return {
    ...state,
    category
  };
}

function handleDeleteTransaction(state, id) {
  const category = { ...state.category };
  category.transactions = category.transactions.filter(
    (transaction, i) => i !== id
  );

  return {
    ...state,
    category
  };
}

// Helpers
function checkDirectorySync(directory) {
  try {
    fs.statSync(directory);
  } catch (e) {
    fs.mkdirSync(directory);
  }
}
