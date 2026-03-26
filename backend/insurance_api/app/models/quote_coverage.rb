class QuoteCoverage < ApplicationRecord
  belongs_to :quote
  belongs_to :coverage_type
end
