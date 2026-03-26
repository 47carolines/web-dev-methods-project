# app/controllers/api/quote_controller.rb
class Api::QuoteController < ActionController::API
  def calculate
    # Just take all coverage types — user doesn’t choose
    service = QuoteCalculatorService.new(
      personal: params[:personal],
      vehicle: params[:vehicle],
      driver: params[:driver],
      coverage_type_ids: CoverageType.pluck(:id) # all coverage types
    )

    result = service.call

    # Save quote
    quote = Quote.create!(
      personal_data: params[:personal],
      vehicle_data: params[:vehicle],
      driver_data: params[:driver],
      premium_total: result[:premium_total],
      risk_level: result[:risk_level]
    )

    result[:breakdown].each do |b|
      coverage = CoverageType.find_by(name: b[:coverage])
      QuoteCoverage.create!(quote: quote, coverage_type: coverage, amount: b[:amount])
    end

    render json: result
  end
end