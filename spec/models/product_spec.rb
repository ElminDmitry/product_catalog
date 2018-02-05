require 'rails_helper'

RSpec.describe Product, type: :model do
  let!(:products) do
    create_list(:movie, 3) + create_list(:material, 3)
  end

  it 'is paginate records' do
    expect(Product.paginate.count).to match(3)
  end

  it 'is returns num of pages' do
    expect(Product.pages).to match(2)
  end

  it 'is returns list with categories' do
    expect(Product.categories).not_to be_empty
  end
end
