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
        let name, price, sale_price, sale_text;
        if(this.state.editable) {
            name = <input type='text'
                          ref={(name) => { this.nameInput = name; }}
                          defaultValue={this.props.product.name}/>
        } else {
            name = <h3 onClick={this.handleNameClick}>{this.props.product.name}</h3>;
        }
        if(this.state.editable) {
            price = <input type='number'
                          ref={(name) => { this.nameInput = name; }}
                          defaultValue={this.props.product.name}/>
        } else {
            price = <h3 onClick={this.handleNameClick}>{this.props.product.name}</h3>;
        }
        if(this.state.editable) {
            sale_price = <input type='number'
                          ref={(name) => { this.nameInput = name; }}
                          defaultValue={this.props.product.name}/>
        } else {
            sale_price = <h3 onClick={this.handleNameClick}>{this.props.product.name}</h3>;
        }
        if(this.state.editable) {
            sale_text = <input type='text'
                          ref={(name) => { this.nameInput = name; }}
                          defaultValue={this.props.product.name}/>
        } else {
            sale_text = <h3 onClick={this.handleNameClick}>{this.props.product.name}</h3>;
        }
        return (
            <div>
                {name}
                <div className={this.state.showAttributes ? '' : 'hidden'}>
                    <p>Sold out: {this.props.product.sold_out ? 'yes': 'no'}</p>
                    <p>Category: {this.props.product.category}</p>
                    <p>Under sale: {this.props.product.under_sale? 'yes' : 'no'}</p>
                    <p>Price: {this.props.product.price}</p>
                    <p>Sale price: {this.props.product.sale_price}</p>
                    <p>{this.props.product.sale_text}</p>
                </div>
                <button onClick={this.props.handleDelete}>Delete</button>
                <button onClick={this.handleEdit}>{ this.state.editable ? 'Submit' : 'Edit' }</button>
            </div>
        );
    }
}
