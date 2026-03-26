class ChangeCoverageBaseCostPrecision < ActiveRecord::Migration[8.1]
  def change
    change_column :coverage_types, :base_cost_percentage, :decimal, precision: 5, scale: 2
    change_column :driver_rates, :risk_factor, :decimal, precision: 5, scale: 2
    change_column :vehicle_rates, :base_premium, :decimal, precision: 10, scale: 2
  end
end