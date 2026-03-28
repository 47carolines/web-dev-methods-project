# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.1].define(version: 2026_03_27_234547) do
  create_table "coverage_types", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.decimal "base_cost_percentage", precision: 5, scale: 2
    t.datetime "created_at", null: false
    t.string "name"
    t.datetime "updated_at", null: false
  end

  create_table "driver_rates", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.integer "max_age"
    t.integer "min_age"
    t.decimal "risk_factor", precision: 5, scale: 2
    t.datetime "updated_at", null: false
  end

  create_table "quote_coverages", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.decimal "amount", precision: 10
    t.bigint "coverage_type_id", null: false
    t.datetime "created_at", null: false
    t.bigint "quote_id", null: false
    t.datetime "updated_at", null: false
    t.index ["coverage_type_id"], name: "index_quote_coverages_on_coverage_type_id"
    t.index ["quote_id"], name: "index_quote_coverages_on_quote_id"
  end

  create_table "quotes", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.json "driver_data"
    t.json "personal_data"
    t.decimal "premium_total", precision: 10
    t.string "risk_level"
    t.datetime "updated_at", null: false
    t.json "vehicle_data"
  end

  create_table "users", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "email"
    t.string "password_digest"
    t.datetime "updated_at", null: false
  end

  create_table "vehicle_rates", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.decimal "base_premium", precision: 10, scale: 2
    t.datetime "created_at", null: false
    t.string "make"
    t.string "model"
    t.datetime "updated_at", null: false
    t.integer "year"
  end

  add_foreign_key "quote_coverages", "coverage_types"
  add_foreign_key "quote_coverages", "quotes"
end
