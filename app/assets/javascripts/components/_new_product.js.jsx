class NewProduct extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        let name = this.nameInput.value;
        let sale_text = this.saleTextInput.value;
        $.ajax({
            url: '/api/v1/products',
            type: 'POST',
            data: { product: { name: name, sale_text: sale_text } },
            success: (product) => {
                this.props.handleSubmit(product);
            }
        });
    }
    render() {
        return (
            <div>
                <h3>Create new</h3>
                <input placeholder='Enter the name of the product' ref={(name) => { this.nameInput = name; }} />
                <input placeholder='Enter a sale text' ref={(sale_text) => { this.saleTextInput = sale_text; }} />
                <button onClick={this.handleClick}>Submit</button>
            </div>
        );
    }
}
