import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import useHttp, { IUseHttpp } from '../hooks/http.hook';
import { IAuthContext, AuthContext } from '../context/auth.context';

interface Props {}

export const CreatePage: React.FC<Props> = () => {
  const auth: IAuthContext = useContext(AuthContext);
  const { request }: IUseHttpp = useHttp();

  const history = useHistory();

  const [link, setLink] = useState<string>('');

  const handlePress = async (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      try {
        const data = await request(
          '/api/link/generate',
          'POST',
          {
            from: link,
          },
          {
            Authorization: `Bearer ${auth.token}`,
          },
        );

        history.push(`/links/${data.link._id}`);
      } catch (error) {}
    }
  };
  return (
    <div>
      <input
        type='text'
        placeholder={'enter the links'}
        value={link}
        onChange={e => setLink(e.target.value)}
        onKeyPress={handlePress}
      />
      Enter the link
    </div>
  );
};

export default CreatePage;
