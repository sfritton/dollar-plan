import { getClosestToToday } from "Util/date";

export const generateTransaction = (id, targetDate) => ({
  id,
  amount: 0,
  date: getClosestToToday(targetDate).getDate(),
  description: ""
});

export const generateCategory = () => ({
  title: "",
  notes: "",
  plannedAmount: 0,
  transactions: []
});

export const generateCategoryGroup = (includeCategory = false) => ({
  title: "",
  categories: includeCategory ? { "0": generateCategory() } : {}
});

export const generateBudget = ({ month, year } = {}) => ({
  date: { month, year },
  isLoaded: true,
  categoryGroups: {
    income: generateCategoryGroup()
  }
});
