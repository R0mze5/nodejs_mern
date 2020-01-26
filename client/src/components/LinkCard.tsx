import React from 'react';

export interface ILink {
  from: string;
  to: string;
  clicks: number;
  data: Date;
  _id: string;
}

interface Props {
  link: ILink | null;
}

export const LinkCard: React.FC<Props> = ({ link }) => {
  if (!link) return null;

  return (
    <div>
      <h2>Ref </h2>
      <p>
        Your{' '}
        <a href={link.to} target={'_blank'} rel={'noopener noreferrer'}>
          {link.to}
        </a>
      </p>
      <p>
        From{' '}
        <a href={link.from} target={'_blank'} rel={'noopener noreferrer'}>
          {link.from}
        </a>
      </p>
      <p>
        Click Count <strong>{link.clicks}</strong>
      </p>
      <p>
        Create Date <strong>{new Date(link.data).toLocaleDateString()}</strong>
      </p>
    </div>
  );
};

export default LinkCard;
