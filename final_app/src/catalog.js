import React, { Component } from 'react';

class RecordList extends Component {
  state = {
    records: [],
  };

  componentDidMount() {
    window.onload = () => {
      fetch('records1.json')
        .then((response) => response.json())
        .then((data) => this.setState({ records: data.records }));
    };
  }

  render() {
    return (
      <div id="recordData">
        {this.state.records.map((record) => (
          <div key={record.id} className="col">
            <div className="card shadow-sm">
              <img src={record.src} alt={`${record.artist} - ${record.title}`} />
              <div className="card-body">
                <h4>
                  {record.artist} - {record.title} ${record.price}
                </h4>
                <p className="card-text">{record.description}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="btn-group">
                    <button type="button" className="btn btn-sm btn-outline-secondary">
                      Buy Now!
                    </button>
                    <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => this.addToCart(record)}>
                      Add to Cart
                    </button>
                  </div>
                  <small className="text-muted">{record.stock} left!</small>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default RecordList;
