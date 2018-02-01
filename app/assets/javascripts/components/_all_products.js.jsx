class AllProducts extends React.Component {
    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
    }

    handleDelete(id) {
        this.props.handleDelete(id);
    }

    onUpdate(product) {
        this.props.onUpdate(product);
    }

    render() {
        let products = this.props.products.map((product) => {
            return (
                <div key={product.id}>
                    <Product product={product}
                            handleDelete={this.handleDelete.bind(this, product.id)}
                            handleUpdate={this.onUpdate}
                    />
                </div>
            )
        });

        return (
            <div>
                <h3>Products list</h3>
                {products}
            </div>
        );
    }
}

