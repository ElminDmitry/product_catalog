class Product < ApplicationRecord
  validates :name, :category, :price, :sale_price, presence: true
end
