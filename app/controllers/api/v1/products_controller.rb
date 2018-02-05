class Api::V1::ProductsController < Api::V1::BaseController
  def index
    products = Product.ransack(params[:q]).result.order(sort_by + ' ' + order)
    respond_with products: products.paginate(page: page),
                 page: page,
                 pages: products.pages,
                 categories: Product.categories
  end

  private

  def sort_by
    %w[name price sale_price].include?(params[:sort_by]) ? params[:sort_by] : 'name'
  end

  def order
    %w(asc desc).include?(params[:order]) ? params[:order] : 'asc'
  end

  def page
    params[:page] || 1
  end
end
