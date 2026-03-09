# app/controllers/api/quote_controller.rb
class Api::QuoteController < ApplicationController
  def calculate
    # For now, just return dummy values
    render json: {
      premium: 123.45,
      riskLevel: "Moderate"
    }
  end
end