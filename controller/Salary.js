// salaryTypes.js
const SalaryTypes = {
    YEARLY: 'yearly',
    HOURLY: 'hourly',
    MONTHLY: 'Monthly',
    weakly: 'weakly'
  };
  
  Object.freeze(SalaryTypes); // This ensures the enum is immutable
  
  module.exports = SalaryTypes;
  