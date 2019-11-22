import React from 'react';
import { useTranslation } from 'react-i18next';
import { graphql } from 'gatsby';

import Typography from '@material-ui/core/Typography';
import SEO from './Seo';
import Layout from './Layout';

import doRedirect from '../hoc/doRedirect';

const GridCode = ({
  pageContext: { gridCode },
  data,
}) => {
  const { t, i18n } = useTranslation();

  return (
    <Layout>
      <SEO title={t('Active site detailed information card')} lang={i18n.language} />

      <Typography variant="h1" gutterBottom>
        {t('Active site detailed information card')}
      </Typography>

      <Typography variant="h3" component="h2">
        {t('Question')}
      </Typography>

      <pre>
        {JSON.stringify({
          gridCode,
          data,
        }, null, 2)}
      </pre>
    </Layout>
  );
};

export const query = graphql`
  query ($gridCode: String) {
    allGridPointData(filter: {gridCode: {eq: $gridCode}}) {
      nodes {
        year
        sourceType
        dataType
      }
    }
  }
`;

export default doRedirect(GridCode);