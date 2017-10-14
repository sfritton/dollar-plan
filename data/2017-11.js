const budget = {
  date: {
    month: 11,
    year: 2017
  },
  incomes: [
    {title: 'Sam', plannedAmount: 9000, actualAmount: 3000},
    {title: 'Ellen', plannedAmount: 600, actualAmount: 800},
    {title: 'Interest', plannedAmount: 100, actualAmount: 0},
    {title: 'Miscellaneous', plannedAmount: 0, actualAmount: 0}
  ],
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
    }
  ]
};

export default budget;
