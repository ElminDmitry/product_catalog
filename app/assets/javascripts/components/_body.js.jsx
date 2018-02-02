class Body extends React.Component {
    constructor() {
        super();
        this.state = {
            products: [],
            sort: "name",
            order: "asc",
            page: 1,
            pages: 0
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.removeProductFromState = this.removeProductFromState.bind(this);
        this.updateItems = this.updateItems.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.getDataFromApi = this.getDataFromApi.bind(this);
        this.handleChangePage = this.handleChangePage.bind(this);
    }

    componentDidMount() {
        this.getDataFromApi(this.state.page);
    }

    getDataFromApi(page) {
        $.getJSON('/api/v1/products.json', { page: page }, (response) => {
            this.setState({
                products: response.products,
                pages: parseInt(response.pages),
                page: parseInt(response.page)

            })
        });
    }

    handleChangePage(page) {
        this.getDataFromApi(page);
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
                <NewProduct handleSubmit={this.handleSubmit}/>
                <AllProducts products={this.state.products}
                             handleDelete={this.handleDelete}
                             onUpdate={this.handleUpdate}/>
                <Paginator page={this.state.page}
                           pages={this.state.pages}
                           handleChangePage={this.handleChangePage} />
            </div>
        );
    }
}
