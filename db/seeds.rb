# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
5.times do
  Product.create(
    name: 'Dirt',
    sold_out: true,
    category: 'History',
    under_sale: true,
    price: rand(2000),
    sale_price: rand(1000...2000)
  )
end
