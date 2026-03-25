class CreateDriverRates < ActiveRecord::Migration[8.1]
  def change
    create_table :driver_rates do |t|
      t.integer :min_age
      t.integer :max_age
      t.decimal :risk_factor

      t.timestamps
    end
  end
end
