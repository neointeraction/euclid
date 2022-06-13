import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Divider } from '@mui/material';

import Input from 'components/Input';
import Dropdown from 'components/Dropdown';
import Button from 'components/Button';
import IconButton from 'components/IconButton';
import Card from 'components/Card/Card';
import Header from 'components/Header';
import Footer from 'components/Footer';
import PointBanner from 'components/PointBanner';
import PageHeader from 'components/PageHeader';
import Tag from 'components/Tag';
import Alert from 'components/Alert';
import Chip from 'components/Chip';

import TripleHistoryTable from '../Contributor/ContributorDashboard/components/TripleHistoryTable/TripleHistoryTable';

import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import AddIcon from '@mui/icons-material/Add';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const Uikit = () => {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div style={{ marginTop: 20 }}>
      <Box
        sx={{
          flexGrow: 1,
          p: 4,
          border: '1px dashed grey',
          marginBottom: 2,
          borderRadius: 2,
          backgroundColor: '#fff',
        }}
      >
        <Typography variant="h6" gutterBottom component="div">
          Inputs
        </Typography>
        <Grid container spacing={2} alignItems="flex-start">
          <Grid item xs={3}>
            <Input label="Input" />
          </Grid>
          <Grid item xs={3}>
            <Input isMulti label="Textarea" />
          </Grid>
          <Grid item xs={3}>
            <Dropdown
              label="Dropdown"
              onChange={handleChange}
              value={age}
              options={[
                {
                  id: 'option a',
                  optionText: 'Option A',
                },
                {
                  id: 'option b',
                  optionText: 'Option B',
                },
              ]}
            />
          </Grid>
          <Grid item xs={4}></Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          p: 4,
          border: '1px dashed grey',
          marginBottom: 2,
          borderRadius: 2,
          backgroundColor: '#fff',
        }}
      >
        <Typography variant="h6" gutterBottom component="div">
          Buttons
        </Typography>
        <Grid container spacing={2} alignItems="baseline">
          <Grid item xs={2}>
            <Button
              btnText="Button Primary"
              variant="contained"
              onClick={() => console.log('clicked')}
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              btnText="Button Outlined"
              variant="outlined"
              onClick={() => console.log('clicked')}
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              btnText="Button Secondary"
              variant="secondary"
              onClick={() => console.log('clicked')}
            />
          </Grid>
          <Grid item xs={1}>
            <Button
              btnText="Back"
              variant="text"
              startIcon={<ChevronLeftOutlinedIcon />}
              onClick={() => console.log('clicked')}
            />
          </Grid>
          <Grid item xs={1}>
            <Button
              btnText="Next"
              variant="text"
              endIcon={<ChevronRightOutlinedIcon />}
              onClick={() => console.log('clicked')}
            />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2}
          alignItems="baseline"
          style={{ marginTop: 20 }}
        >
          <Grid item xs={1}>
            <IconButton icon={<AddCommentOutlinedIcon fontSize="small" />} />
          </Grid>
          <Grid item xs={1}>
            <IconButton
              secondary
              icon={<ContentCopyOutlinedIcon fontSize="small" />}
            />
          </Grid>
          <Grid item xs={1}>
            <IconButton secondary icon={<AddIcon fontSize="medium" />} />
          </Grid>
          <Grid item xs={1}>
            <IconButton icon={<ChatOutlinedIcon fontSize="small" />} />
          </Grid>
          <Grid item xs={1}>
            <IconButton icon={<ChevronRightOutlinedIcon fontSize="medium" />} />
          </Grid>
          <Grid item xs={1}>
            <IconButton
              secondary
              icon={<DeleteOutlineOutlinedIcon fontSize="medium" />}
            />
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          p: 4,
          border: '1px dashed grey',
          marginBottom: 2,
          borderRadius: 2,
          backgroundColor: '#f4f4f4',
        }}
      >
        <Typography variant="h6" gutterBottom component="div">
          Header
        </Typography>

        <Grid container spacing={2} alignItems="baseline">
          <Grid item xs={12}>
            <Header />
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          p: 4,
          border: '1px dashed grey',
          marginBottom: 2,
          borderRadius: 2,
          backgroundColor: '#f4f4f4',
        }}
      >
        <Typography variant="h6" gutterBottom component="div">
          Footer
        </Typography>

        <Grid container spacing={2} alignItems="baseline">
          <Grid item xs={12}>
            <Footer />
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          p: 4,
          border: '1px dashed grey',
          marginBottom: 2,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" gutterBottom component="div">
          Page Headers
        </Typography>

        <Grid container spacing={2} alignItems="baseline">
          <Grid item xs={12}>
            <Typography variant="subtitle2" component="div" color="lightgray">
              Welcome Header
            </Typography>
            <PageHeader
              isHomePage
              user="User"
              btnText="Add Triple"
              onClick={() => {}}
            />
          </Grid>

          <Grid item xs={12}>
            <Divider style={{ marginBottom: 20 }} />
            <Typography variant="subtitle2" component="div" color="lightgray">
              Inner Page Header
            </Typography>
            <PageHeader pageTitleText="Add Triples" />
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          p: 4,
          border: '1px dashed grey',
          marginBottom: 2,
          borderRadius: 2,
          backgroundColor: '#fff',
        }}
      >
        <Typography variant="h6" gutterBottom component="div">
          Card
        </Typography>

        <Grid container spacing={2} alignItems="baseline">
          <Grid item xs={3}>
            <Card count={12} title="Total No. of Evidence" color="purple" />
          </Grid>
          <Grid item xs={3}>
            <Card count={12} title="Total No. of Evidence" color="green" />
          </Grid>
          <Grid item xs={3}>
            <Card count={12} title="Total No. of Evidence" color="red" />
          </Grid>
          <Grid item xs={3}>
            <Card count={12} title="Total No. of Evidence" color="blue" />
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          p: 4,
          border: '1px dashed grey',
          marginBottom: 2,
          borderRadius: 2,
          backgroundColor: '#fff',
        }}
      >
        <Typography variant="h6" gutterBottom component="div">
          Expandable Banner
        </Typography>

        <Grid container spacing={2} alignItems="baseline">
          <Grid item xs={12}>
            <PointBanner
              points={32}
              user="Rob"
              infoText="You’ve been rewarded with Rs. 2000 in your Zeta Gift Card from
            Better world Technologies."
            />
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          p: 4,
          border: '1px dashed grey',
          marginBottom: 2,
          borderRadius: 2,
          backgroundColor: '#fff',
        }}
      >
        <Typography variant="h6" gutterBottom component="div">
          Table
        </Typography>

        <Grid container spacing={2} alignItems="baseline">
          <Grid item xs={12}>
            <TripleHistoryTable />
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          p: 4,
          border: '1px dashed grey',
          marginBottom: 2,
          borderRadius: 2,
          backgroundColor: '#fff',
        }}
      >
        <Typography variant="h6" gutterBottom component="div">
          Tags
        </Typography>

        <Grid container spacing={2} alignItems="baseline">
          <Grid item xs={2}>
            <Tag label="All" type="all" />
          </Grid>
          <Grid item xs={2}>
            <Tag label="Reverted" type="reverted" />
          </Grid>
          <Grid item xs={2}>
            <Tag label="Approved" type="approved" />
          </Grid>
          <Grid item xs={2}>
            <Tag label="In Draft" type="in-draft" />
          </Grid>
          <Grid item xs={2}>
            <Tag label="Committed" type="committed" />
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          p: 4,
          border: '1px dashed grey',
          marginBottom: 2,
          borderRadius: 2,
          backgroundColor: '#fff',
        }}
      >
        <Typography variant="h6" gutterBottom component="div">
          Alert Boxes
        </Typography>

        <Grid container spacing={2} alignItems="baseline">
          <Grid item xs={4}>
            <Alert
              type="success"
              message="This is Success alert"
              onClose={() => console.log('close alert')}
            />
          </Grid>
          <Grid item xs={4}>
            <Alert
              type="warning"
              message="This is warning alert"
              onClose={() => console.log('close alert')}
            />
          </Grid>
          <Grid item xs={4}>
            <Alert
              type="error"
              message="This is error alert"
              onClose={() => console.log('close alert')}
            />
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          p: 4,
          border: '1px dashed grey',
          marginBottom: 2,
          borderRadius: 2,
          backgroundColor: '#fff',
        }}
      >
        <Typography variant="h6" gutterBottom component="div">
          Chips
        </Typography>
        <Grid container spacing={2} alignItems="baseline">
          <Grid item xs={4}>
            <Chip labelKey="Species" labelValue="Human Biengs" />
          </Grid>
          <Grid item xs={4}>
            <Chip labelKey="Key" labelValue="Value" />
          </Grid>
          <Grid item xs={4}>
            <Chip
              labelKey="Removeable"
              labelValue="Chip"
              onRemove={() => console.log('To be removed')}
            />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Uikit;
