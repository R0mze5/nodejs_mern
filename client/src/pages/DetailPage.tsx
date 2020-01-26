import React, { useState, useContext, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useHttp, { IUseHttpp } from '../hooks/http.hook';
import { AuthContext } from '../context/auth.context';
import { LinkCard, ILink } from '../components/LinkCard';

interface Props {}

interface IParseLink {
  id?: string;
}

export const DetailPage: React.FC<Props> = () => {
  const { token } = useContext(AuthContext);
  const { request, loading }: IUseHttpp = useHttp();

  const [link, setLink] = useState<ILink | null>(null);

  const parseLink: IParseLink = useParams();

  const linkId = parseLink.id;

  const getLink = useCallback(async () => {
    try {
      const fetched = await request(`/api/link/${linkId}`, 'GET', null, {
        Authorization: `Bearer ${token}`,
      });

      setLink(fetched);
    } catch (error) {}
  }, [token, linkId, request]);

  useEffect(() => {
    getLink();
  }, [getLink]);

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <React.Fragment>
      {!loading && link && <LinkCard link={link} />}
    </React.Fragment>
  );
};

export default DetailPage;
