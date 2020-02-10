import React from 'react';

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import GetAppIcon from '@material-ui/icons/GetApp';

import Link from '../components/Link';
import Layout from '../components/Layout';
import CSVGenerator from '../components/CSVGenerator';
import doRedirect from '../hoc/doRedirect';
import AdaptationsCSV from '../components/AdaptationsCSV';

const templateLinks = {
  ods: '/gridcode.ods',
  xlsx: '/gridcode.xlsx',
};
const githubUpload = {
  csv: 'https://github.com/solagro/awa/upload/master/content/map',
  geojson: 'https://github.com/solagro/awa/upload/master/static/data',
};

const TemplateButton = props => (
  <Button
    color="secondary"
    variant="contained"
    style={{ textTransform: 'none' }}
    size="small"
    endIcon={<GetAppIcon />}
    {...props}
  />
);

const HelpPage = () => (
  <Layout>
    <Typography variant="h1" gutterBottom>
      Help
    </Typography>

    <Typography variant="h2" gutterBottom>
      Update gridpoints on map
    </Typography>

    <List dense>
      <ListItem>
        <ListItemText>
          Go to <a href="https://geojson.net">geojson.net</a>.{' '}
          <em>(deny recovering previous map)</em>
        </ListItemText>
      </ListItem>
      <Divider variant="middle" component="li" />
      <ListItem>
        <ListItemText>
          Use <strong>File</strong> item from <strong>Open</strong> menu.<br />
          Then select <samp>.kml</samp> or <samp>.kmz</samp> file from local
          computer.
        </ListItemText>
      </ListItem>
      <Divider variant="middle" component="li" />
      <ListItem>
        <ListItemText>
          Visually check on map everything is correct.
        </ListItemText>
      </ListItem>
      <Divider variant="middle" component="li" />
      <ListItem>
        <ListItemText>
          Use <strong>GeoJSON</strong> item from <strong>Save</strong> menu
          to save a local copy of generated <samp>map.geojson</samp> file.
        </ListItemText>
      </ListItem>
      <Divider variant="middle" component="li" />
      <ListItem>
        <ListItemText>
          Use <a href={githubUpload.geojson}>Github interface</a> to upload{' '}
          <samp>map.geojson</samp> into <samp>static/data</samp> directory.
        </ListItemText>
      </ListItem>
    </List>

    <Typography variant="h3" gutterBottom>
      KML/KMZ files structure
    </Typography>

    <Typography variant="body1" gutterBottom>
      Each geometry inside <samp>.kml/.kmz</samp> file <strong>must</strong> have
      a <samp>Grid_Code</samp> property matching the ID number of corresponding
      gridpoint.
    </Typography>

    <Divider style={{ margin: '2em 0' }} />

    <Typography variant="h2" gutterBottom>
      Update data for gridpoints
    </Typography>

    <Typography variant="body1" gutterBottom>
      Data for <Link to="/map">Observations</Link> have to be contributed
      through a CSV files:
    </Typography>

    <List dense>
      <ListItem>
        <ListItemText>
          Create and rename a copy of <strong>workbook template</strong>{' '}
          <em>(<samp>xlsx</samp> or <samp>ods</samp>)</em> for
          each grid point to create/update. <em>(i.e. 12345.ods, 43215.xlsx,…)</em>
        </ListItemText>
      </ListItem>
      <ListItem>
        <ListItemText>
          Workbook templates :<br />
          {' '}
          <TemplateButton href={templateLinks.ods}>gridcode.ods</TemplateButton>
          {' '}
          <TemplateButton href={templateLinks.xlsx}>gridcode.xlsx</TemplateButton>
        </ListItemText>
      </ListItem>
      <Divider variant="middle" component="li" />
      <ListItem>
        <ListItemText>
          Contribute data for each spreadsheet of the workbook.{' '}
          <em>Warning: Do not rename spreadsheets (tabs).</em>
        </ListItemText>
      </ListItem>
      <Divider variant="middle" component="li" />
      <ListItem>
        <ListItemText>
          Use the widget below to generate a zip file containing
          CSV file for each spreadsheet tab, grouped by directories
          named after orignal files.
        </ListItemText>
      </ListItem>
      <Divider variant="middle" component="li" />
      <ListItem>
        <ListItemText>
          <CSVGenerator />
        </ListItemText>
      </ListItem>
      <Divider variant="middle" component="li" />
      <ListItem>
        <ListItemText>
          Download and extract generated <samp>zip</samp> file on local
          computer.
        </ListItemText>
      </ListItem>
      <Divider variant="middle" component="li" />
      <ListItem>
        <ListItemText>
          Use <a href={githubUpload.csv}>Github interface</a> to upload{' '}
          <strong>every gridpoint directories at once</strong> into{' '}
          <samp>content/map</samp> directory.
        </ListItemText>
      </ListItem>
    </List>

    <Typography variant="h3" gutterBottom>
      CSV files structure
    </Typography>

    <Typography variant="body1" gutterBottom>
      First row cells are used as header (technical) name. The content of
      these cells is processed through translation mechanism.
    </Typography>
    <Typography variant="body1" gutterBottom>
      For each <strong>data line</strong>, first column cells should be
      a <var>year</var> value.
    </Typography>
    <Typography variant="body1" gutterBottom>
      The first row with no content in first cell is used as comment for
      column headers.
    </Typography>

    <Divider style={{ margin: '2em 0' }} />

    <Typography variant="h2" gutterBottom>
      Update adaptation measures
    </Typography>

    <Typography variant="body1" gutterBottom>
      Data for <Link to="/adaptations">Adaptation measures</Link> have to be contributed
      through a CSV files:
    </Typography>

    <AdaptationsCSV />
  </Layout>
);

export default doRedirect(HelpPage);
