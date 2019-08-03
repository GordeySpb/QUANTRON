import React from 'react';

import Button from '../Button';

const Posts = ({ posts, sort, onSort }) => (
  <>
    <div className="button-row">
      <Button
        name={sort}
        onClick={() => (sort === 'asc' ? onSort('desc') : onSort('asc'))}
      />
    </div>
    <ul className="list">
      {posts.map(({ link, title, owner: { profile_image } }) => (
        <li className="list__item" key={posts.question_id}>
          <a className="post" href={link}>
            <img className="post__avatar" src={profile_image} alt="avatar" />
            <div className="post__title">{title}</div>
          </a>
        </li>
      ))}
    </ul>
  </>
);

export default Posts;
