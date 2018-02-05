class Body extends React.Component {
    constructor() {
        super();
        this.state = {
            products: [],
            sort: "name",
            order: "asc",
            page: 1,
            pages: 0,
            categories: [],
            filters: {}
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.removeProductFromState = this.removeProductFromState.bind(this);
        this.updateItems = this.updateItems.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.getDataFromApi = this.getDataFromApi.bind(this);
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSortColumn = this.handleSortColumn.bind(this);
    }

    componentDidMount() {
        this.getDataFromApi(this.state.page);
    }

    getDataFromApi(page) {
        $.getJSON('/api/v1/products.json', {
            q: this.state.filters,
            page: page,
            sort_by: this.state.sort,
            order: this.state.order
        }, (response) => {
            this.setState({
                products: response.products,
                pages: parseInt(response.pages),
                page: parseInt(response.page),
                categories: response.categories

            })
        });
    }

    handleChangePage(page) {
        this.getDataFromApi(page);
        this.setState({ page: page })
    }

    handleSearch(filters, sorting) {
        $.getJSON('/api/v1/products.json', {
            q: filters,
            page: 1,
            sort_by: sorting.sortValue,
            order: sorting.orderValue
        }, (response) => {
            this.setState({
                products: response.products,
                pages: parseInt(response.pages),
                page: parseInt(response.page),
                categories: response.categories,
                filters,
                sort: sorting.sortValue,
                order: sorting.orderValue
            })
        });
    }

    handleSubmit(product) {
        let newState = this.state.products.concat(product);
        this.setState({ products: newState })
    }

    handleDelete(id) {
        $.ajax({
            url: `/api/v1/products/${id}`,
            type: 'DELETE',
            success:() => { this.removeProductFromState(id); }
        });
    }

    removeProductFromState(id) {
        let newProducts = this.state.products.filter((product) => {
            return product.id !== id;
        });

        this.setState({ products: newProducts });
    }

    handleUpdate(product) {
        $.ajax({
            url: `/api/v1/products/${product.id}`,
            type: 'PUT',
            data: { product: product },
            success: () => {
                this.updateItems(product);
            }
        })
    }

    handleSortColumn(name, order) {
        if (this.state.sort !== name) {
            order = 'asc';
        }
        $.ajax({
            url: '/api/v1/products',
            data: { sort_by: name, order: order, page: this.state.page },
            method: 'GET',
            success: function(data) {
                this.setState({ events: data.events, sort: name, order: order });
            }.bind(this),
            error: function(xhr, status, error) {
                alert('Cannot sort events: ', error);
            }
        });
    }

    updateItems(newProduct) {
        let products = this.state.products;
        products = products.map((product) => {
            return product.id === newProduct.id ? Object.assign(product, newProduct) : product
        });
        this.setState({products: products });
    }

    render() {
        return (
            <div>
                <FilterForm categories={this.state.categories}
                            handleSearch={this.handleSearch}/>
                <NewProduct handleSubmit={this.handleSubmit}/>
                <AllProducts products={this.state.products}
                             handleDelete={this.handleDelete}
                             onUpdate={this.handleUpdate}/>
                <Paginator page={this.state.page}
                           pages={this.state.pages}
                           handleChangePage={this.handleChangePage}/>
            </div>
        );
    }
}
