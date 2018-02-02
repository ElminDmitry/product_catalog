class Paginator extends React.Component {
    constructor() {
        super();
        this.paginationElement = this.paginationElement.bind(this);
    }

    paginationElement(number) {
        return (
            <li key={'page' + number}
                className={number === this.props.page ? 'active' : ''}>
                <a onClick={this.props.handleChangePage.bind(null, number)}>{number}</a>
            </li>
        )
    }

    render() {
        const self = this;
        const page = this.props.page;
        const last_page = this.props.pages;
        const page_links = [];
        const max_elements = 2;
        const pages = [1];

        for (let i = page - max_elements; i <= page + max_elements; i++) {
            if (!pages.includes(i))
                pages.push(i);
        }
        if (!pages.includes(last_page))
            pages.push(last_page);

        pages.forEach(i => {
            if (i > 0 && i <= last_page)
                page_links.push(self.paginationElement(i));
        });

        return (
            <div>
                <ul>
                    {page_links}
                </ul>
            </div>
        );
    }
}
