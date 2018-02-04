class FilterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { toggledCategories: [] };
        this.handleSearch = this.handleSearch.bind(this);
        this.toggleCategory = this.toggleCategory.bind(this);
    }

    handleSearch() {
        let filters = {
            query_cont: this.queryTextInput.value,
            price_gteq: this.queryMinPriceInput.value,
            price_lteq: this.queryMaxPriceInput.value,
            category_in: this.state.toggledCategories
        };
        this.props.handleSearch(filters);
    }

    toggleCategory(e) {
        let updatedList = this.state.toggledCategories;
        if(e.target.checked){
            updatedList.push(e.target.value)
        } else {
            updatedList = updatedList.filter(e => e !== e.target.value);
        }
        this.state = { toggledCategories: updatedList };
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
                    ref={(query) => { this.queryTextInput = query; }} />
                <input
                    type="number"
                    className="form-control"
                    placeholder="Type a min price value"
                    ref={(query) => { this.queryMinPriceInput = query; }} />
                <input
                    type="number"
                    className="form-control"
                    placeholder="Type a max price value"
                    ref={(query) => { this.queryMaxPriceInput = query; }} />
                {checkboxItems}
                <select options={['f']}></select>
                <button onClick={this.handleSearch}>Set filters</button>
            </div>
        );
    }
}
