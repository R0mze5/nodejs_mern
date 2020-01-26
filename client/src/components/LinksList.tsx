import React from 'react';

import { Link } from 'react-router-dom';

import { ILink } from './LinkCard';

interface Props {
  links: Array<ILink>;
}

export const LinksList: React.FC<Props> = ({ links }) => {
  if (!links.length) return <div>Refferences doesn't exist yet</div>;

  return (
    <React.Fragment>
      <table>
        <thead>
          <tr>
            <th>№</th>
            <th>Original</th>
            <th>Short</th>
            <th>open</th>
          </tr>
        </thead>
        <tbody>
          {links.map((link, index) => (
            <tr key={link._id}>
              <td>{index + 1}</td>
              <td>{link.from}</td>
              <td>{link.to}</td>
              <td>
                <Link to={`/links/${link._id}`}>open</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default LinksList;
