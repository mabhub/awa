import React from 'react';
import { useTranslation } from 'react-i18next';
import { graphql } from 'gatsby';

import Typography from '@material-ui/core/Typography';

import Layout from './Layout';
import Link from './Link';
import SEO from './Seo';
import {
  CustomTabs,
  CustomAppBar,
  CustomTab,
  SecondaryAppBar,
  SecondaryTabs,
  SecondaryTab,
} from './StyledTabs';

import doRedirect from '../hoc/doRedirect';

const AdaptationMeasures = ({
  pageContext: {
    vulnerability: currentVulnerability,
    system: currentSystem,
  },
  data: {
    farmingSystemsContainer: { farmingSystems: foundFarmingSystems },
    vulnerabilitiesContainer: { vulnerabilities: foundVulnerabilities },
    adaptationMeasuresContainer: { adaptationMeasures },
    catalog,
  },
}) => {
  const { t, i18n } = useTranslation();

  const systemLinks = catalog.farming_system.map(({ value: system }) => ({
    id: system,
    path: system,
    enabled: foundFarmingSystems.some(({ fieldValue }) => (fieldValue === system)),
  }));

  const currentSystemId = catalog.farming_system.find(({ value }) => (value === currentSystem)).id;

  const vulnerabilityLinks = catalog.farm_vulnerability_component
    // Keep only vulnerabilities from current system
    .filter(({ id }) => (id[0] === currentSystemId))
    .map(({ value: vulnerability }) => ({
      id: vulnerability,
      path: vulnerability,
      enabled: foundVulnerabilities.some(({ fieldValue }) => (fieldValue === vulnerability)),
    }));

  const measureLinks = adaptationMeasures.map(({
    fields: { slug, measure: { name, climate_risk_region: region, implementation: term } },
  }) => ({ slug, name, region, term }));

  return (
    <Layout>
      <SEO title={t('Sustainable adaptation measures')} lang={i18n.language} />
      <Typography variant="h1" gutterBottom align="center">{t('Sustainable adaptation measures')}</Typography>

      <CustomAppBar position="static">
        <CustomTabs value={currentSystem}>
          {systemLinks.map(({ id, path, enabled }) => (
            <CustomTab
              disabled={!enabled}
              key={id}
              label={t(id)} // i18next-extract-disable-line
              value={id}
              component={Link}
              to={`/adaptations/${path}`}
            />
          ))}
        </CustomTabs>
      </CustomAppBar>

      <SecondaryAppBar position="static">
        <SecondaryTabs value={currentVulnerability}>
          {vulnerabilityLinks.map(({ id, path, enabled }) => (
            <SecondaryTab
              disabled={!enabled}
              key={id}
              label={t(id)} // i18next-extract-disable-line
              value={id}
              component={Link}
              to={`/adaptations/${currentSystem}/${path}`}
            />
          ))}
        </SecondaryTabs>
      </SecondaryAppBar>

      <ul>
        {measureLinks.map(({ slug, name, region, term }) => (
          <li key={slug}>
            <Link
              to={`/adaptations/${currentSystem}/${currentVulnerability}/${region}/${slug}`}
              state={{ modal: true }}
            >
              {name} {term} {region}
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export const query = graphql`
  query ($system: String!, $vulnerability: String!) {

    # Get all farming systems & vulnerability components from catalog
    catalog: adaptationsJson {
      farming_system { id value }
      farm_vulnerability_component { id value }
    }

    # Get all farming systems having at least one measure
    farmingSystemsContainer: allAdaptationMeasures {
      farmingSystems: group(field: fields___measure___farming_system) {
        fieldValue
      }
    }

    # Get all vulnerabilities for current system having at least one measure
    vulnerabilitiesContainer: allAdaptationMeasures(
      filter: {
        fields: {
          measure: {
            farming_system: { eq: $system }
          }
        }
      }
    ) {
      vulnerabilities: group(field: fields___measure___farm_vulnerability_component) {
        fieldValue
      }
    }

    # Get all measures for current system/vulnerability
    adaptationMeasuresContainer: allAdaptationMeasures(
      filter: {
        fields: {
          measure: {
            farming_system: { eq: $system },
            farm_vulnerability_component: { eq: $vulnerability }
          }
        }
      }
    ) {
      adaptationMeasures: nodes {
        fields {
          slug
          measure {
            alt_language
            name
            alt_name
            implementation
            climate_risk_region
          }
        }
      }
    }
  }
`;

export default doRedirect(AdaptationMeasures);
