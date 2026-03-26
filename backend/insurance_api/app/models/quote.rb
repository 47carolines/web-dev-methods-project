class Quote < ApplicationRecord
    has_many :quote_coverages, dependent: :destroy
end
