class CreateQuotes < ActiveRecord::Migration[8.1]
  def change
    create_table :quotes do |t|
      t.json :personal_data
      t.json :vehicle_data
      t.json :driver_data
      t.decimal :premium_total
      t.string :risk_level

      t.timestamps
    end
  end
end
