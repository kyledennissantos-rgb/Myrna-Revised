import './Dashboard.css'
import { useState } from 'react'

const budgetMethods = [
  { id: '50-30-20', label: '50 / 30 / 20' },
  { id: 'zero-based', label: 'Zero based' },
  { id: 'self-love', label: 'Self Love' },
  { id: 'envelope-system', label: 'Envelope System' },
]

const budgetAllocations = [
  { name: 'Bills', percentage: 50 },
  { name: 'Personal wants', percentage: 30 },
  { name: 'Savings', percentage: 20 },
]

function Dashboard() {
  // Keep each expense name and amount together so rows can be edited independently.
  const [expenses, setExpenses] = useState([])
  const [budgetMethod, setBudgetMethod] = useState('50-30-20')
  const [salary, setSalary] = useState('')

  // Sum all entered amounts, treating blank fields as zero.
  const expenseTotal = expenses.reduce(
    (total, expense) => total + (Number(expense.amount) || 0),
    0,
  )

  // Add a new blank row with a stable ID for React's list rendering.
  const addExpense = () => {
    setExpenses((currentExpenses) => [
      ...currentExpenses,
      { id: crypto.randomUUID(), name: '', amount: '' },
    ])
  }

  // Update only the selected field in the matching expense row.
  const updateExpense = (id, field, value) => {
    setExpenses((currentExpenses) =>
      currentExpenses.map((expense) =>
        expense.id === id ? { ...expense, [field]: value } : expense,
      ),
    )
  }

  // Remove the selected expense while preserving all other rows.
  const removeExpense = (id) => {
    setExpenses((currentExpenses) =>
      currentExpenses.filter((expense) => expense.id !== id),
    )
  }

  return (
    <main className="dashboard-page">
      {/* The header introduces the finance dashboard and its monthly view. */}
      <header className="dashboard-header">
        <div className="dashboard-header-inner">
          <div className="dashboard-brand">
            <span className="dashboard-brand-mark" aria-hidden="true">M</span>
            <span className="dashboard-brand-name">MYRNA</span>
            <span className="dashboard-brand-divider" aria-hidden="true"></span>
            <span className="dashboard-brand-caption">PERSONAL FINANCE</span>
          </div>

          <div className="dashboard-intro">
            <p className="dashboard-kicker">MONTHLY OVERVIEW</p>
            <h1 className="dashboard-title">Make every peso count.</h1>
            <p className="dashboard-text">A clearer view of your monthly money.</p>
          </div>
        </div>
      </header>

      <section className="dashboard-section" aria-labelledby="dashboard-section-title">
        <div className="dashboard-container">
          {/* This heading labels the monthly income and expense controls. */}
          <div className="dashboard-section-heading">
            <h2 id="dashboard-section-title">Income &amp; expenses</h2>
            <span className="dashboard-period">PHP <span>/ MONTH</span></span>
          </div>

          <div className="dashboard-actions">
            {/* Salary remains one monthly amount, separate from individual expenses. */}
            <div className="dashboard-field dashboard-field-income">
              <label className="dashboard-field-label" htmlFor="monthly-salary">Monthly salary</label>
              <span className="dashboard-input-wrap">
                <span className="dashboard-currency" aria-hidden="true">₱</span>
                <input
                  className="dashboard-input"
                  id="monthly-salary"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={salary}
                  onChange={(event) => setSalary(event.target.value)}
                />
              </span>

              <div className="options-container">
                <span className="dashboard-field-label">Budget Method</span>
                {budgetMethods.map((method) => (
                  <button
                    className={`option ${budgetMethod === method.id ? 'option-active' : ''}`}
                    key={method.id}
                    type="button"
                    aria-pressed={budgetMethod === method.id}
                    onClick={() => setBudgetMethod(method.id)}
                  >
                    {method.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Each expense card contains its own editable list and live total. */}
            <div className="dashboard-field dashboard-field-expenses">
              <span className="dashboard-field-label">Specific expenses</span>

              {budgetMethod === '50-30-20' && (
                <section className="dashboard-allocations" aria-label="50 / 30 / 20 budget allocation">
                  <h3 className="dashboard-allocation-heading">Monthly allocation</h3>
                  <div className="dashboard-allocation-list">
                    {budgetAllocations.map((allocation) => (
                      <div className="dashboard-allocation-row" key={allocation.name}>
                        <span>{allocation.name}</span>
                        <span>{allocation.percentage}%</span>
                        <strong>
                          ₱{((Number(salary) || 0) * allocation.percentage / 100).toLocaleString('en-PH', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </strong>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Show a helpful prompt until the user adds their first expense. */}
              {expenses.length === 0 && (
                <p className="dashboard-expense-empty">No expenses added yet.</p>
              )}

              {/* Render one name and amount input pair for every expense. */}
              <div className="dashboard-expense-list">
                {expenses.map((expense, index) => (
                  <div className="dashboard-expense-row" key={expense.id}>
                    <input
                      className="dashboard-expense-input"
                      type="text"
                      placeholder="Expense name"
                      aria-label={`Expense name ${index + 1}`}
                      value={expense.name}
                      onChange={(event) => updateExpense(expense.id, 'name', event.target.value)}
                    />
                    <span className="dashboard-expense-amount">
                      <span aria-hidden="true">₱</span>
                      <input
                        className="dashboard-expense-input"
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                        aria-label={`Amount for ${expense.name || `expense ${index + 1}`}`}
                        value={expense.amount}
                        onChange={(event) => updateExpense(expense.id, 'amount', event.target.value)}
                      />
                    </span>
                    <button
                      className="dashboard-expense-remove"
                      type="button"
                      aria-label={`Remove ${expense.name || `expense ${index + 1}`}`}
                      onClick={() => removeExpense(expense.id)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              {/* Add another blank row without changing existing expenses. */}
              <button className="dashboard-add-button" type="button" onClick={addExpense}>
                + Add expense
              </button>

              {/* Format and display the sum of the amount fields. */}
              <div className="dashboard-expense-total" aria-live="polite">
                <span>Total monthly expenses</span>
                <strong>
                  ₱{expenseTotal.toLocaleString('en-PH', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </strong>
              </div>
            </div>
            
          </div>
        </div>
      </section>
    </main>
  )
}

export default Dashboard