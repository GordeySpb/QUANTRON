import React from 'react';
import { orderBy, filter } from 'lodash';

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
    posts: [],
    isFetching: true,
    sort: 'desc',
  };

  componentDidMount() {
    fetch(URL)
      .then(data => data.json())
      .then(({ items }) => compose(items))
      .then(posts => this.setState({
          posts,
          isFetching: false,
        }),)
      .catch(error => console.error(error));
  }

  handleSort = (sortName) => {
    const { posts } = this.state;
    const sortedItems = orderBy(posts, ['creation_date'], [`${sortName}`]);

    this.setState({
      posts: sortedItems,
      sort: sortName,
    });
  };

  render() {
    const { posts, isFetching, sort } = this.state;

    return (
      <div className="list">
        {isFetching ? (
          <div>Loading...</div>
        ) : (
          <Posts posts={posts} sort={sort} onSort={this.handleSort} />
        )}
      </div>
    );
  }
}

export default List;
