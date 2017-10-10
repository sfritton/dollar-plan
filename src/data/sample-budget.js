const budget = {
  month: 10,
  year: 2017,
  income: [],
  expenses: [
    {
      title: 'Investments & Savings',
      subCategories: [
        {title: 'Donations', plannedAmount: 100, actualAmount: 0},
        {title: 'Roth IRA', plannedAmount: 600, actualAmount: 0},
        {title: 'Savings', plannedAmount: 0, actualAmount: 0}
      ]
    },
    {
      title: 'Apartment',
      subCategories: [
        {title: 'Rent & Water', plannedAmount: 1320, actualAmount: 1320},
        {title: 'Electric', plannedAmount: 49, actualAmount: 49},
        {title: 'Internet', plannedAmount: 34, actualAmount: 34}
      ]
    },
    {
      title: 'Insurance',
      subCategories: [
        {title: 'Renters\'', plannedAmount: 0, actualAmount: 0},
        {title: 'Life & Disability', plannedAmount: 40, actualAmount: 40},
        {title: 'Health', plannedAmount: 365, actualAmount: 0},
        {title: 'Auto', plannedAmount: 200, actualAmount: 0}
      ]
    },
    {
      title: 'Necessities',
      subCategories: [
        {title: 'Transportation', plannedAmount: 200, actualAmount: 44},
        {title: 'Groceries', plannedAmount: 226, actualAmount: 127},
        {title: 'Phone', plannedAmount: 38, actualAmount: 37},
        {title: 'Health Care', plannedAmount: 2046, actualAmount: 0},
        {title: 'Personal Care', plannedAmount: 24, actualAmount: 24},
        {title: 'Clothing', plannedAmount: 82, actualAmount: 17}
      ]
    },
    {
      title: 'Entertainment',
      subCategories: [
        {title: 'Merchandise', plannedAmount: 22, actualAmount: 0},
        {title: 'Restaurants & Treats', plannedAmount: 80, actualAmount: 7},
        {title: 'Gifts', plannedAmount: 50, actualAmount: 0},
        {title: 'Recreation', plannedAmount: 0, actualAmount: 0}
      ]
    }
  ]
};

export default budget;
