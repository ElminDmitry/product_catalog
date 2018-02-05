class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editable: false,
            showAttributes: false
        };
        this.handleEdit = this.handleEdit.bind(this);
        this.handleNameClick = this.handleNameClick.bind(this);
    }

    handleEdit() {
        if(this.state.editable) {
            let name = this.nameInput.value;
            let product = { id: this.props.product.id, name: name };
            this.props.handleUpdate(product);
        }

        this.setState({ editable: !this.state.editable })
    }

    handleNameClick() {
        this.setState({ showAttributes: !this.state.showAttributes })
    }

    render() {
        return (
            <div>
                <h3 className='product-item' onClick={this.handleNameClick}>{this.props.product.name}</h3>
                <div className={this.state.showAttributes ? '' : 'hidden'}>
                    <p>Sold out: {this.props.product.sold_out ? 'yes': 'no'}</p>
                    <p>Category: {this.props.product.category}</p>
                    <p>Under sale: {this.props.product.under_sale? 'yes' : 'no'}</p>
                    <p>Price: {this.props.product.price}</p>
                    <p>Sale price: {this.props.product.sale_price}</p>
                    <p>{this.props.product.sale_text}</p>
                </div>
            </div>
        );
    }
}
