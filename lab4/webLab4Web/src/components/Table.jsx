import React from 'react';
import {Button, Card} from "belle";
import "../css/table.css"

export default class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            itemsPerPage: 10
        };
    }

    goToPage = (pageNumber) => {
        const totalPages = Math.ceil(this.props.data.length / this.state.itemsPerPage);
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            this.setState({ currentPage: pageNumber });
        }
    };

    renderPaginationButtons = () => {
        const { currentPage, itemsPerPage } = this.state;
        const { data } = this.props;
        const totalPages = Math.ceil(data.length / itemsPerPage);

        if (totalPages <= 1) return null;

        const buttons = [];


        for (let i = 1; i <= totalPages; i++) {
            buttons.push(
                <Button
                    key={i}
                    onClick={() => this.goToPage(i)}
                    className={`pagination-btn ${currentPage === i ? 'active' : ''}`}
                >
                    {i}
                </Button>
            );
        }

        return buttons;
    };

    render() {
        const { currentPage, itemsPerPage } = this.state;
        const { data } = this.props;

        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
        const totalPages = Math.ceil(data.length / itemsPerPage);

        return (
            <Card style={{padding:'20px', margin: '20px'}}>
                <h2>Результаты</h2>

                <div className="tableContainer">
                    <table className="resultsTable">
                        <thead>
                        <tr>
                            <th>X</th>
                            <th>Y</th>
                            <th>R</th>
                            <th>Результат</th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentItems.map(function(item, index) {
                            return (
                                <tr key={index}>
                                    <td>{item.x}</td>
                                    <td>{item.y}</td>
                                    <td>{item.r}</td>
                                    <td>{item.result ? 'Попадание' : 'Промах'}</td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>

                {totalPages > 1 && (
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: '20px',
                        gap: '5px'
                    }}>
                        {this.renderPaginationButtons()}
                    </div>
                )}
            </Card>
        );
    }
}