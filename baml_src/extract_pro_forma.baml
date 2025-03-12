class EBITDA {
  depreciation float @description("Depreciation expense")
  amortization float @description("Amortization expense")
  interestExpense float @description("Interest expense")
  ebitdaValue float @description("Earnings Before Interest, Taxes, Depreciation, and Amortization")
  ebitdaMargin float @description("EBITDA as a percentage of total revenue")
}

class FinancialMetricsEBITDA {
  year string @description("Fiscal year")
  revenue Revenue?
  costs Costs?
  profitability Profitability?
  perShare PerShare?
  ebitda EBITDA?
}

class Revenue {
  product float @description("Product revenue in millions")
  serviceAndOther float @description("Service and other revenue in millions")
  total float @description("Total revenue in millions")
}

class Costs {
  productCosts float @description("Cost of product revenue")
  serviceCosts float @description("Cost of service revenue")
  totalCosts float @description("Total cost of revenue")
  researchAndDevelopment float
  salesAndMarketing float
  generalAndAdmin float
  impairmentAndRestructuring float
}

class Profitability {
  grossMargin float
  operatingIncome float
  otherIncome float
  incomeTaxes float
  netIncome float
}

class PerShare {
  basic float @description("Basic earnings per share")
  diluted float @description("Diluted earnings per share")
}

class ProformaMetrics {
  // Time Period
  period string @description("The time period of these metrics")
  // Financial Metrics
  effectiveGrossRevenue float @description("Total revenue after vacancy and credit losses")
  operatingExpenses float @description("Total operating expenses")
  netOperatingIncome float? @description("NOI - Revenue minus operating expenses")
  capitalExpenditures float? @description("Expected capital expenditures")
  cashFlowFromOperations float? @description("Operating cash flow after capex")
  // Valuation Metrics
  capRate float? @description("Capitalization rate used for valuation")
  propertyValue float? @description("Total property valuation")
  valuePerUnit float? @description("Property value per unit")
  yieldOnCost float? @description("Unlevered yield on total development cost")
  // Development Metrics
  totalProjectCost float? @description("Total cost of development")
  developmentSpread float? @description("Spread between cap rate and yield on cost in basis points")
}

class CostOfRevenue {
  support float
  hostingAndDelivery float
  total float
}

class GrossProfit {
  amount float
  margin float
}

class Expenses {
  engineering float
  generalAndAdmin float
  salesAndMarketing float
  total float
}

class CashFlow {
  operating float
  investing float
  financing float
  netChange float
}

class FinancialMetrics {
  arr float @description("Annual Recurring Revenue")
  revenue float @description("Monthly Revenue")
  costOfRevenue CostOfRevenue
  grossProfit GrossProfit?
  expenses Expenses
  netIncome float
  cashFlow CashFlow
  bankBalance float
}

class Deltas {
  arr float
  revenue float
  netIncome float
  bankBalance float
}

class MonthlyComparison {
  month string @description("Month and year")
  target FinancialMetrics?
  actual FinancialMetrics
  deltas Deltas
}


class Analysis {
  keyAssumptions map<string, float | string>
  metric_type "proforma" | "monthly"
  proformaMetrics ProformaMetrics[]?
  monthlyMetrics MonthlyComparison[]?
  formulas Formula[] @description("Formulas used to calculate the metrics from assumptions")
}

class Formula {
  name string @description(#"
      like a function name
    "#)
  purpose string
  parameters string[] @description(#"
      usually keys in keyAssumptions
    "#)
  expression string
}

function AnalyzeProforma(data: image) -> Analysis {
  client CustomSonnet
  prompt #"
    
    Extract all the relavent data for proforma metrics.

    {{ ctx.output_format }}

    {{ _.role("user") }}
    {{ data }}
  "#
}

function AnalyzeFinancials(data: image) -> FinancialMetricsEBITDA[] {
  client "openai/gpt-4o"
  prompt #"
    Analyze the financial data table and extract the metrics for each fiscal year.

    {{ ctx.output_format }}

    {{ _.role("user") }}
    {{ data }}
  "#
}

test BasicFinancialAnalysis {
  functions [AnalyzeFinancials]
  args {
    data { 
        file "../data/MS_EBITDA.png"
    }
    }
}

test TestName {
  functions [AnalyzeProforma]
  args {
    data { 
        file "../data/self-storage-dev-model.png"
    }
  }
}


test PLSheet {
  functions [AnalyzeProforma]
  args {
    data { 
        file "../data/pl-sheet.png"
    }
  }
}

class MissingParam {
  name string @alias("missing_parameter_name")
  formula Formula
}



function GetMissingParams(params: string[], analysis: Analysis) -> MissingParam[] {
  client "openai/gpt-4o"
  prompt #"
    Given a list of parameters, describe the formulas are missing.
    {{ analysis }}

    {{ ctx.output_format }}
    {{ _.role("user") }}
    Missing formulas for:
    {% for p in params %}
    - {{ p }}
    {% endfor %}
  "#
}
