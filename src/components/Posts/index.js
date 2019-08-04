import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';

/** Posts component
 *
 * @param {Array} param.posts array items for render
 * @param {String} param.sort sort name
 * @param {Function} param.onSort function for sort posts array
 *
 */

const Posts = ({ posts, sort, onSort }) => (
  <>
    <div className="button-row">
      <Button
        name={sort}
        onClick={() => (sort === 'asc' ? onSort('desc') : onSort('asc'))}
      />
    </div>
    <ul className="posts-list">
      {posts.map(({ link, title, owner: { profile_image } }) => (
        <li className="posts-list__item" key={posts.question_id}>
          <a className="post" href={link}>
            <img
              className="post__avatar"
              src={profile_image || ''}
              alt="avatar"
            />
            <div className="post__title">{title}</div>
          </a>
        </li>
      ))}
    </ul>
  </>
);

Posts.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  sort: PropTypes.string.isRequired,
  onSort: PropTypes.func.isRequired,
};

export default Posts;
