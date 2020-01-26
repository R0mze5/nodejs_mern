import React, { useState, useContext, useCallback, useEffect } from 'react';
import useHttp, { IUseHttpp } from '../hooks/http.hook';
import { AuthContext } from '../context/auth.context';
import { ILink } from '../components/LinkCard';
import { LinksList } from '../components/LinksList';

interface Props {}

export const LinksPage: React.FC<Props> = () => {
  const { token } = useContext(AuthContext);
  const { request, loading }: IUseHttpp = useHttp();

  const [links, setLinks] = useState<Array<ILink>>([]);

  const getLinks = useCallback(async () => {
    try {
      const fetched = await request(`/api/link/`, 'GET', null, {
        Authorization: `Bearer ${token}`,
      });

      setLinks(fetched);
    } catch (error) {}
  }, [token, request]);

  useEffect(() => {
    getLinks();
  }, [getLinks]);

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <React.Fragment>{!loading && <LinksList links={links} />}</React.Fragment>
  );
};

export default LinksPage;
