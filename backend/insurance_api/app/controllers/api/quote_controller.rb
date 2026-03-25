class Api::QuoteController < ApplicationController
  skip_before_action :verify_authenticity_token  # for API requests

  def calculate
    # Receive frontend JSON
    personal = params[:personal]
    vehicle = params[:vehicle]
    driver = params[:driver]

    # Look up vehicle base premium
    v = VehicleRate.find_by(
      make: vehicle[:make],
      model: vehicle[:model],
      year: vehicle[:year].to_i
    )
    base_premium = v ? v.base_premium : 200.0  # default if not found

    # Look up driver risk factor
    age = driver[:age].to_i
    risk = DriverRate.where("min_age <= ? AND max_age >= ?", age, age).first
    risk_factor = risk ? risk.risk_factor : 1.0

    # Calculate final premium
    premium = (base_premium * risk_factor).round(2)

    # Determine risk level
    risk_level = case risk_factor
                 when 1.0..1.2 then "Low"
                 when 1.21..1.4 then "Moderate"
                 else "High"
                 end

    render json: { premium: premium, riskLevel: risk_level }
  end
end