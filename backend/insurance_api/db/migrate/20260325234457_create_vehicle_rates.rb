class CreateVehicleRates < ActiveRecord::Migration[8.1]
  def change
    create_table :vehicle_rates do |t|
      t.string :make
      t.string :model
      t.integer :year
      t.decimal :base_premium

      t.timestamps
    end
  end
end
