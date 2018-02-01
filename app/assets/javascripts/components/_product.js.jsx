class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = { editable: false };
        this.handleEdit = this.handleEdit.bind(this);
    }

    handleEdit() {
        if(this.state.editable) {
            let name = this.nameInput.value;
            let product = { id: this.props.product.id, name: name };
            this.props.handleUpdate(product);
        }

        this.setState({ editable: !this.state.editable })
    }

    render() {
        let name = this.state.editable ? <input type='text' ref={(name) => { this.nameInput = name; }} defaultValue={this.props.product.name} /> : <h3>{this.props.product.name}</h3>;
        return (
            <div>
                {name}
                <p>{this.props.product.sold_out}</p>
                <p>{this.props.product.category}</p>
                <p>{this.props.product.under_sale}</p>
                <p>{this.props.product.price}</p>
                <p>{this.props.product.sale_price}</p>
                <p>{this.props.product.sale_text}</p>
                <button onClick={this.props.handleDelete}>Delete</button>
                <button onClick={this.handleEdit}>{ this.state.editable ? 'Submit' : 'Edit' }</button>
            </div>
        );
    }
}
