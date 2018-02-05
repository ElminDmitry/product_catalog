FactoryBot.define do
  factory :movie, class: Product do
    name       Faker::Movie.quote
    sold_out   false
    category   'Movies'
    under_sale false
    price      { rand(700...2000) }
    sale_price 0
    sale_text  ''
  end

  factory :material, class: Product do
    name       Faker::Commerce.material
    sold_out   false
    category   'Materials'
    under_sale false
    price      { rand(700...2000) }
    sale_price 0
    sale_text  ''
  end
end