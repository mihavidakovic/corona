import React from 'react';
import axios from 'axios';

export default class List extends React.Component {
    state = {
        items: []
    }

    componentDidMount() {
        axios.get('/api/data')
        .then(res => {
            const items = res.data.data;
            this.setState({items});
        });
    }

    render() {
        return (
            <ul>
                {this.state.itmes.map(item => <li>{item.state}</li>)}
            </ul>
        )
    }
}