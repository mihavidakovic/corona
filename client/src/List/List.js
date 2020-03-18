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
            <div className="list">
                <div className="list__head">
                    <div>Država</div>
                    <div>Smrti</div>
                    <div>Potrjenih primerov</div>
                    <div>Okrevanih pacientov</div>
                </div>
                <div className="items">
                    {this.state.items.map(item => 
                        <div className="item">
                            <span className="item__state">{item.region}</span>
                            <span className="item__deaths">{item.deaths}</span>
                            <span className="item__confirmed">{item.confirmed}</span>
                            <span className="item__recovered">{item.recovered}</span>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}