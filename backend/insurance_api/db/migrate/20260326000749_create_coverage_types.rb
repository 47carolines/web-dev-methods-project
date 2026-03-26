class CreateCoverageTypes < ActiveRecord::Migration[8.1]
  def change
    create_table :coverage_types do |t|
      t.string :name
      t.decimal :base_cost_percentage

      t.timestamps
    end
  end
end
