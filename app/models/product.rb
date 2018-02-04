class Product < ApplicationRecord
  PER_PAGE = 3

  validates :name, :category, :price, :sale_price, presence: true

  ransack_alias :query, :name_or_category_or_sale_text

  class << self
    def categories
      pluck(:category).uniq
    end

    def pages(per_page = PER_PAGE)
      pages = count / per_page.to_f
      pages += 1 if pages % 1 > 0
      pages.to_i
    end

    def paginate(page: 1, per_page: PER_PAGE)
      page = page.to_i
      per_page = per_page.to_i
      offset = (page - 1) * per_page
      limit(per_page).offset(offset)
    end
  end
end
