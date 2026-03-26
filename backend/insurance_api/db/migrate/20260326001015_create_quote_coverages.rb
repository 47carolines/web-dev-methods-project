class CreateQuoteCoverages < ActiveRecord::Migration[8.1]
  def change
    create_table :quote_coverages do |t|
      t.references :quote, null: false, foreign_key: true
      t.references :coverage_type, null: false, foreign_key: true
      t.decimal :amount

      t.timestamps
    end
  end
end
