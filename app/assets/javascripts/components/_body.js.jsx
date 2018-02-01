class Body extends React.Component {
    constructor() {
        super();
        this.state = { products: [] };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.removeProductFromState = this.removeProductFromState.bind(this);
        this.updateItems = this.updateItems.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    componentDidMount() {
        $.getJSON('/api/v1/products.json', (response) => { this.setState({ products: response }) });
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
            </div>
        );
    }
}
