import React, { Component } from 'react';

class List extends Component {

    itemOnClick(item) {
        alert(`You have selected file: ${item.name}`);
    }

    renderItem(item) {

        const typeText = item.isFolder ? 'Folder' : 'File';
        const onClick = item.isFolder ? () => this.itemOnClick(item) : () => {};

        return (
            <li key={item.id} onClick={onClick}>
                { `${item.name}[${typeText}]`}
            </li>
        );
    }

    render() {
        const { items } = this.props;

        return (
            <ul>
                { items.map(item => this.renderItem(item) ) }
            </ul>
        );
    }
}

export default List;
