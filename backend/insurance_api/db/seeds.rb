# db/seeds.rb

# # Vehicle rates
VehicleRate.create(make: "Toyota", model: "Camry", year: 2020, base_premium: 300.00)
VehicleRate.create(make: "Honda", model: "Civic", year: 2021, base_premium: 280.00)

# Driver rates (age range and multiplier)
DriverRate.create(min_age: 18, max_age: 25, risk_factor: 1.5)
DriverRate.create(min_age: 26, max_age: 40, risk_factor: 1.2)
DriverRate.create(min_age: 41, max_age: 65, risk_factor: 1.0)

CoverageType.create(name: "Liability", base_cost_percentage: 0.35)
CoverageType.create(name: "Collision", base_cost_percentage: 0.45)
CoverageType.create(name: "Comprehensive", base_cost_percentage: 0.20)