5.times do
  Product.create(name: Faker::Movie.quote,
                 sold_out: true,
                 category: 'Movies',
                 under_sale: true,
                 price: rand(2000),
                 sale_price: rand(1000...2000))
end

5.times do
  Product.create(name: Faker::Commerce.material,
                 sold_out: true,
                 category: 'Materials',
                 under_sale: true,
                 price: rand(2000),
                 sale_price: rand(1000...2000))
end
