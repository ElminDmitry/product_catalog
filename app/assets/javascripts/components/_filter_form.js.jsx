class FilterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toggledCategories: [],
            sortableOptions: ['name', 'price', 'sale_price'],
            options: [],

        };
        this.handleSearch = this.handleSearch.bind(this);
        this.toggleCategory = this.toggleCategory.bind(this);
    }

    handleSearch() {
        let filters = {
            query_cont: this.filterTextInput.value,
            price_gteq: this.filterMinPriceInput.value,
            price_lteq: this.filterMaxPriceInput.value,
            category_in: this.state.toggledCategories
        };
        let sorting = {
            sortValue: this.sortSelect.value,
            orderValue: this.orderSelect.value
        };
        this.props.handleSearch(filters, sorting);
    }

    componentWillMount() {
        let options = this.state.sortableOptions.map((option, index) =>
            <option key={index} value={option}>{option}</option>
        );
        this.setState({ options })
    }

    toggleCategory(event) {
        let updatedList = Array.from(this.state.toggledCategories);
        if(event.target.checked){
            updatedList.push(event.target.value)
        } else {
            updatedList = updatedList.filter(e => e !== event.target.value);
        }
        this.setState({ toggledCategories: updatedList })
    }

    render() {
        let categoriesList = this.props.categories;
        let checkboxItems = categoriesList.map((category, index) =>
            <div key = {index}>
                <label>
                    <input onClick={this.toggleCategory} type="checkbox" value={category}/>
                    {category}
                </label>
            </div>
        );
        return (
            <div>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Type a search phrase..."
                    ref={(filterText) => { this.filterTextInput = filterText; }}/>
                <input
                    type="number"
                    className="form-control"
                    placeholder="Type a min price value"
                    ref={(filterMinPrice) => { this.filterMinPriceInput = filterMinPrice; }}/>
                <input
                    type="number"
                    className="form-control"
                    placeholder="Type a max price value"
                    ref={(filterMaxPrice) => { this.filterMaxPriceInput = filterMaxPrice; }}/>
                {checkboxItems}
                <select
                        onChange={this.handleSort}
                        ref={(sort) => { this.sortSelect = sort; }}>
                    {this.state.options}
                </select>
                <select
                        onChange={this.handleOrder}
                        ref={(order) => { this.orderSelect = order; }}>
                    <option key={0} value={'asc'}>{'ASC'}</option>
                    <option key={1} value={'desc'}>{'DESC'}</option>
                </select>
                <button onClick={this.handleSearch}>Set filters</button>
            </div>
        );
    }
}
