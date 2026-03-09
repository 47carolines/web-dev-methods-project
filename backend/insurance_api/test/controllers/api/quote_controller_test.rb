require "test_helper"

class Api::QuoteControllerTest < ActionDispatch::IntegrationTest
  test "should get calculate" do
    get api_quote_calculate_url
    assert_response :success
  end
end
