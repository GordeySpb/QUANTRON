import React from 'react';
import filter from 'lodash/filter';
import orderBy from 'lodash/orderBy';

import Posts from '../Posts';

const URL =  'https://api.stackexchange.com/2.2/search?intitle=react&site=stackoverflow';

const compose = (items) => {
  const filteredItems = filter(
    items,
    ({ is_answered, owner: { reputation } }) => is_answered && reputation >= 50,
  );

  return orderBy(filteredItems, ['creation_date'], ['desc']);
};

class List extends React.Component {
  state = {
    data: [],
    isFetching: true,
    sort: 'desc',
  };

  componentDidMount() {
    fetch(URL)
      .then(data => data.json())
      .then(({ items }) => compose(items))
      .then(data => this.setState({
          data,
          isFetching: false,
        }),);
  }

  handleSort = (sortName) => {
    const { data } = this.state;
    const sortedItems = orderBy(data, ['creation_date'], [`${sortName}`]);

    this.setState({
      data: sortedItems,
      sort: sortName,
    });
  };

  render() {
    const { data, isFetching, sort } = this.state;

    return (
      <div className="list">
        {isFetching ? (
          <div>Loading...</div>
        ) : (
          <Posts posts={data} sort={sort} onSort={this.handleSort} />
        )}
      </div>
    );
  }
}

export default List;
