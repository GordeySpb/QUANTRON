import React from 'react';
import filter from 'lodash/filter';
import orderBy from 'lodash/orderBy';

import Posts from '../Posts';

const URL =  'https://api.stackexchange.com/2.2/search?intitle=react&site=stackoverflow';

class List extends React.Component {
  state = {
    data: [],
    isFetching: true,
    sort: 'desc',
  };

  componentDidMount() {
    fetch(URL)
      .then(data => data.json())
      /* eslint-disable indent */
      .then(({ items }) => filter(
          items,
          ({ is_answered, owner: { reputation } }) => is_answered && reputation >= 50,
        ),)
      .then(filteredItems => orderBy(filteredItems, ['creation_date'], ['desc']),)
      .then(filteredAndSortedItems => this.setState({
          data: filteredAndSortedItems,
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
      <div className="posts">
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
