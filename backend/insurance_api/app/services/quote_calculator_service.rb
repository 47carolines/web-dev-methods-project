# app/services/quote_calculator_service.rb
class QuoteCalculatorService
  def initialize(personal:, vehicle:, driver:, coverage_type_ids:)
    @personal = personal
    @vehicle = vehicle
    @driver = driver
    @coverage_type_ids = coverage_type_ids
  end

  def call
    # Base vehicle premium
    v = VehicleRate.find_by(
      make: @vehicle["make"],
      model: @vehicle["model"],
      year: @vehicle["year"].to_i
    )
    base_premium = v ? v.base_premium : 200.0

    # Driver risk factor
    age = @driver["age"].to_i
    risk = DriverRate.where("min_age <= ? AND max_age >= ?", age, age).first
    risk_factor = risk ? risk.risk_factor : 1.0

    # Calculate coverage breakdown
    coverages = CoverageType.where(id: @coverage_type_ids)
    breakdown = coverages.map do |c|
      amount = (base_premium * c.base_cost_percentage * risk_factor).round(2)
      { coverage: c.name, amount: amount }
    end

    premium_total = breakdown.sum { |b| b[:amount] }.round(2)

    # Risk level
    risk_level = case risk_factor
                 when 1.0..1.2 then "Low"
                 when 1.21..1.4 then "Moderate"
                 else "High"
                 end

    { premium_total: premium_total, risk_level: risk_level, breakdown: breakdown }
  end
end