import * as fs from "fs";

import Actions from "../constants/actions-enum";
import DateService from "../services/date-service";

export default function reducer(state = { budgets: [] }, action) {
  switch (action.type) {
    case Actions.GET_ALL_BUDGETS: {
      return {
        ...state,
        budgets: action.payload.map(budget => ({
          date: DateService.decodeDate(budget),
          loaded: false
        }))
      };
    }
    case Actions.GET_BUDGET: {
      const budget = JSON.parse(action.payload);
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
    case Actions.SET_ACTIVE_BUDGET: {
      const { month, year } = action.payload;
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
    case Actions.UPDATE_INCOME_CATEGORY_TITLE: {
      if (
        action.payload.catId === null ||
        action.payload.catId === undefined ||
        action.payload.catId < 0
      ) {
        return state;
      }

      const { catId, title } = action.payload;

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
    case Actions.UPDATE_INCOME_CATEGORY_AMOUNT: {
      if (
        action.payload.catId === null ||
        action.payload.catId === undefined ||
        action.payload.catId < 0
      ) {
        return state;
      }

      const { catId, amount } = action.payload;

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
    case Actions.ADD_INCOME_CATEGORY: {
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
    case Actions.DELETE_INCOME_CATEGORY: {
      if (
        action.payload.catId === null ||
        action.payload.catId === undefined ||
        action.payload.catId < 0
      ) {
        return state;
      }

      const budget = { ...state.budgets[state.activeBudgetIndex] };
      budget.incomes = budget.incomes.filter(
        (income, i) => i !== action.payload.catId
      );

      const budgets = [...state.budgets];
      budgets[state.activeBudgetIndex] = budget;

      return {
        ...state,
        budgets
      };
    }
    case Actions.UPDATE_EXPENSE_CATEGORY_TITLE: {
      if (
        action.payload.catId === null ||
        action.payload.catId === undefined ||
        action.payload.catId < 0
      ) {
        return state;
      }

      const { catId, title } = action.payload;

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
    case Actions.ADD_EXPENSE_CATEGORY: {
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
    case Actions.DELETE_EXPENSE_CATEGORY: {
      if (
        action.payload.catId === null ||
        action.payload.catId === undefined ||
        action.payload.catId < 0
      ) {
        return state;
      }

      const budget = { ...state.budgets[state.activeBudgetIndex] };
      budget.expenses = budget.expenses.filter(
        (expense, i) => i !== action.payload.catId
      );

      const budgets = [...state.budgets];
      budgets[state.activeBudgetIndex] = budget;

      return {
        ...state,
        budgets
      };
    }
    case Actions.UPDATE_EXPENSE_SUB_CATEGORY_TITLE: {
      if (
        action.payload.catId === null ||
        action.payload.catId === undefined ||
        action.payload.catId < 0 ||
        action.payload.subCatId === null ||
        action.payload.subCatId === undefined ||
        action.payload.subCatId < 0
      ) {
        return state;
      }

      const { catId, subCatId, title } = action.payload;

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
    case Actions.UPDATE_EXPENSE_SUB_CATEGORY_AMOUNT: {
      if (
        action.payload.catId === null ||
        action.payload.catId === undefined ||
        action.payload.catId < 0 ||
        action.payload.subCatId === null ||
        action.payload.subCatId === undefined ||
        action.payload.subCatId < 0
      ) {
        return state;
      }

      const { catId, subCatId, amount } = action.payload;

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
    case Actions.ADD_EXPENSE_SUB_CATEGORY: {
      if (
        action.payload.catId === null ||
        action.payload.catId === undefined ||
        action.payload.catId < 0
      ) {
        return state;
      }

      const catId = action.payload.catId;

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
    case Actions.DELETE_EXPENSE_SUB_CATEGORY: {
      if (
        action.payload.catId === null ||
        action.payload.catId === undefined ||
        action.payload.catId < 0 ||
        action.payload.subCatId === null ||
        action.payload.subCatId === undefined ||
        action.payload.subCatId < 0
      ) {
        return state;
      }

      const { catId, subCatId } = action.payload;

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
    default: {
      return state;
    }
  }
}
