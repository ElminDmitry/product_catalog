class Api::V1::ProductsController < Api::V1::BaseController
  def index
    products = Product.ransack(params[:q]).result.order(sort_by + ' ' + order)
    respond_with products: products.paginate(page: page),
                 page: page,
                 pages: products.pages,
                 categories: Product.categories
  end

  def create
    respond_with :api, :v1, Product.create(product_params)
  end

  def destroy
    respond_with Product.destroy(params[:id])
  end

  def update
    product = Product.find(params['id'])
    product.update_attributes(product_params)
    respond_with product, json: product
  end

  def search
    products = Product.ransack(params[:q]).result.order(sort_by + ' ' + order)
    respond_with products: products,
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

  def product_params
    params.require(:product).permit(:id, :name, :sold_out, :category, :under_sale, :price, :sale_price, :sale_text)
  end
end
