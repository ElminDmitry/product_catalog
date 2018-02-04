class Select extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedOption: '',
        }
    }
    handleChange(selectedOption) {
        this.setState({ selectedOption });
        console.log(`Selected: ${selectedOption.label}`);
    }
    render() {
        const { selectedOption } = this.state;
        const value = selectedOption && selectedOption.value;

        return (
            <Select
                name="form-field-name"
                value={value}
                onChange={this.handleChange}
                options={[
                    { value: 'one', label: 'One' },
                    { value: 'two', label: 'Two' },
                ]}
            />
        );
    }
}