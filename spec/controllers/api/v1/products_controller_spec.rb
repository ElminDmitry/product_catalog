require 'rails_helper'
require 'spec_helper'

describe Api::V1::ProductsController, type: :controller do

  before :each do
    request.headers.merge!({ 'Accept' => 'application/json' })
  end

  let!(:products) { create_list(:movie, 3) + create_list(:material, 3) }

  describe 'GET #index' do

    context 'without filters' do

      it 'sends a list of products' do
        get :index

        expect(response).to be_success
        expect(JSON.parse(response.body)['products'].count).to match(3)
        expect(JSON.parse(response.body)['page']).not_to be_nil
        expect(JSON.parse(response.body)['pages']).not_to be_nil
        expect(JSON.parse(response.body)['categories']).not_to be_nil
      end
    end

    context 'with filters' do

      it 'filters products by category' do
        get :index, params: { q: { category_in: ['Materials'] }}

        expect(response).to be_success
        expect(JSON.parse(response.body)['products'].map{ |h| h['category'] }.uniq).to eq(['Materials'])
      end

      it 'filters products by price' do
        create_list(:movie, 3, price: 900)
        get :index, params: { q: { price_gteq:  700, price_lteq:  1000 }}

        expect(response).to be_success
        expect(JSON.parse(response.body)['products'].sample['price']).to be_between(700, 1000)
      end
    end

    context 'with sorting' do

      it 'sorts products by price asc' do
        get :index, params: { sort_by: 'price', order: 'asc'}

        expect(response).to be_success
        expect(JSON.parse(response.body)['products'][0]['price']).to be < JSON.parse(response.body)['products'][1]['price']
      end

      it 'sorts products by price desc' do
        get :index, params: { sort_by: 'price', order: 'desc'}

        expect(response).to be_success
        expect(JSON.parse(response.body)['products'][0]['price']).to be > JSON.parse(response.body)['products'][1]['price']
      end
    end

    context 'with pagination params' do
      it 'paginates products' do
        get :index, params: { page: 2 }

        expect(response).to be_success
        expect(JSON.parse(response.body)['products'].count).to eq(3)
      end
    end
  end
end