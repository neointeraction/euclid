import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Divider } from "@mui/material";
import { Button as MuiButton } from "@mui/material";

import Input from "components/Input";
import Dropdown from "components/Dropdown";
import Button from "components/Button";
import IconButton from "components/IconButton";
import Card from "components/Card/Card";
import Header from "components/Header";
import Footer from "components/Footer";
import PointBanner from "components/PointBanner";
import PageHeader from "components/PageHeader";
import Tag from "components/Tag";
import Alert from "components/Alert";
import Chip from "components/Chip";

import TripleHistoryTable from "../Contributor/components/TripleHistoryTable/TripleHistoryTable";

import AddCommentOutlinedIcon from "@mui/icons-material/AddCommentOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import AddIcon from "@mui/icons-material/Add";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Tooltip from "components/Tooltip";

import ButtonGroup from "components/ButtonGroup";
import TrippleCollapsed from "components/TrippleCollapsed";
import SearchWithIcon from "components/SearchWithIcon";
// import ExtendableSubjectType from 'components/ExtendableSubjectType';
import ExtendableSubjectTypeForm from "components/ExtendableSubjectTypeForm/ExtendableSubjectTypeForm";
import { MultiFormContainer } from "assets/styles/main.styles";
import Doughnut from "components/Doughnut";
import { BarChart, Modal } from "components";

import AutoComplete from "components/AutoComplete";

const Uikit = () => {
  const [age, setAge] = React.useState("");
  const [multipleSubjectTypes, setMultipleSubjectTypes] = React.useState([
    {
      id: 0, // todo: use unique id. eg uuid library
      selectedValue: "",
      options: ["Option one for el one", "Option two for el two"],
    },
  ]);

  const onAddToLeftOfSubjectType = (element) => {
    console.log("element to add to", element);
    const newData = [...multipleSubjectTypes];
    // todo: Add constrain to only element to the left
    newData.unshift({
      id: element.id + 1,
      selectedValue: "",
      options: element.options,
    });
    setMultipleSubjectTypes(newData);
  };

  const onAddToRightOfSubjectType = (element) => {
    console.log("element to add to", element);
    const newData = [...multipleSubjectTypes];
    newData.push({
      id: element.id + 1,
      selectedValue: "",
      options: element.options,
    });
    setMultipleSubjectTypes(newData);
  };

  const onRemoveFromMultipleSubjectType = (elementId) => {
    if (multipleSubjectTypes.length <= 1) return;
    const filteredList = multipleSubjectTypes.filter(
      (item) => item.id !== elementId
    );
    setMultipleSubjectTypes(filteredList);
  };

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  // MODAL

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ marginTop: 20 }}>
      <Box
        sx={{
          flexGrow: 1,
          p: 4,
          border: "1px dashed grey",
          marginBottom: 2,
          borderRadius: 2,
          backgroundColor: "#fff",
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
            <AutoComplete label="AutoComplete" />
          </Grid>
          <Grid item xs={3}>
            <Dropdown
              label="Dropdown"
              onChange={handleChange}
              value={age}
              options={[
                {
                  id: "option a",
                  optionText: "Option A",
                },
                {
                  id: "option b",
                  optionText: "Option B",
                },
              ]}
            />
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h6" gutterBottom component="div">
              input with search icon
            </Typography>
            <SearchWithIcon />
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          p: 4,
          border: "1px dashed grey",
          marginBottom: 2,
          borderRadius: 2,
          backgroundColor: "#fff",
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
              onClick={() => console.log("clicked")}
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              btnText="Button Outlined"
              variant="outlined"
              onClick={() => console.log("clicked")}
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              btnText="Button Secondary"
              variant="secondary"
              onClick={() => console.log("clicked")}
            />
          </Grid>
          <Grid item xs={1}>
            <Button
              btnText="Back"
              variant="text"
              startIcon={<ChevronLeftOutlinedIcon />}
              onClick={() => console.log("clicked")}
            />
          </Grid>
          <Grid item xs={1}>
            <Button
              btnText="Next"
              variant="text"
              endIcon={<ChevronRightOutlinedIcon />}
              onClick={() => console.log("clicked")}
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
          border: "1px dashed grey",
          marginBottom: 2,
          borderRadius: 2,
          backgroundColor: "#f4f4f4",
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
          border: "1px dashed grey",
          marginBottom: 2,
          borderRadius: 2,
          backgroundColor: "#f4f4f4",
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
          border: "1px dashed grey",
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
          border: "1px dashed grey",
          marginBottom: 2,
          borderRadius: 2,
          backgroundColor: "#fff",
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
          border: "1px dashed grey",
          marginBottom: 2,
          borderRadius: 2,
          backgroundColor: "#fff",
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
          border: "1px dashed grey",
          marginBottom: 2,
          borderRadius: 2,
          backgroundColor: "#fff",
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
          border: "1px dashed grey",
          marginBottom: 2,
          borderRadius: 2,
          backgroundColor: "#fff",
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
            <Tag label="In Draft" type="in draft" />
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
          border: "1px dashed grey",
          marginBottom: 2,
          borderRadius: 2,
          backgroundColor: "#fff",
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
              onClose={() => console.log("close alert")}
            />
          </Grid>
          <Grid item xs={4}>
            <Alert
              type="warning"
              message="This is warning alert"
              onClose={() => console.log("close alert")}
            />
          </Grid>
          <Grid item xs={4}>
            <Alert
              type="error"
              message="This is error alert"
              onClose={() => console.log("close alert")}
            />
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          p: 4,
          border: "1px dashed grey",
          marginBottom: 2,
          borderRadius: 2,
          backgroundColor: "#fff",
        }}
      >
        <Typography variant="h6" gutterBottom component="div">
          Chips
        </Typography>
        <Grid container spacing={2} alignItems="baseline">
          <Grid item xs={4}>
            <Chip
              content={[{ labelKey: "Species", labelValue: "Human Beings" }]}
            />
          </Grid>
          <Grid item xs={4}>
            <Chip
              content={[{ labelKey: "Disease", labelValue: "Alziehmers" }]}
            />
          </Grid>
          <Grid item xs={4}>
            <Chip
              content={[{ labelKey: "Removeable", labelValue: "Chip" }]}
              onRemove={() => console.log("To be removed")}
            />
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          p: 4,
          border: "1px dashed grey",
          marginBottom: 2,
          borderRadius: 2,
          backgroundColor: "#fff",
        }}
      >
        <Typography variant="h6" gutterBottom component="div">
          Tooltips
        </Typography>
        <Grid container spacing={2} alignItems="baseline">
          <Grid item xs={3}>
            <Tooltip message="Duplicate" position="bottom">
              Hover to show tooltip at bottom
            </Tooltip>
          </Grid>
          <Grid item xs={3}>
            <Tooltip message="Duplicate" position="top">
              Hover to show tooltip at top
            </Tooltip>
          </Grid>
          <Grid item xs={3}>
            <Tooltip message="Duplicate" position="right">
              Hover to show tooltip at right
            </Tooltip>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          p: 4,
          border: "1px dashed grey",
          marginBottom: 2,
          borderRadius: 2,
          backgroundColor: "#fff",
        }}
      >
        <Typography variant="h6" gutterBottom component="div">
          Modal Boxes
        </Typography>
        <Grid container spacing={2} alignItems="baseline">
          <Grid item xs={2}>
            <Button
              btnText="Show  Modal"
              variant="contained"
              onClick={handleClickOpen}
            />
            <Modal
              size="sm"
              open={open}
              close={handleClose}
              title="Modal Title"
              children={<div>Modal Content</div>}
            />
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          p: 4,
          border: "1px dashed grey",
          marginBottom: 2,
          borderRadius: 2,
          backgroundColor: "#fff",
        }}
      >
        <Typography variant="h6" gutterBottom component="div">
          Button Groups
        </Typography>
        <Grid container spacing={2} alignItems="baseline">
          <Grid item xs={3}>
            <ButtonGroup>
              <MuiButton>Duplicate</MuiButton>
              <MuiButton>Edit</MuiButton>
            </ButtonGroup>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          p: 4,
          border: "1px dashed grey",
          marginBottom: 2,
          borderRadius: 2,
          backgroundColor: "#fff",
        }}
      >
        <Typography variant="h6" gutterBottom component="div">
          Tripple Collapsed
        </Typography>
        <Grid container spacing={2} alignItems="baseline">
          <Grid item xs={12}>
            <TrippleCollapsed
              chipContent={[
                { labelKey: "Protein", labelValue: "GSK3BB" },
                {
                  labelKey: "protein_modification",
                  labelValue: "Phosphorylationn",
                },
                { labelKey: " Amino_acid", labelValue: "Threoninee" },
                { labelKey: "Protein", labelValue: "GSK3B" },
                {
                  labelKey: "protein_modification",
                  labelValue: "Phosphorylation",
                },
                { labelKey: " Amino_acid", labelValue: "Threonine" },
              ]}
            >
              <div style={{ margin: "20px" }}>
                Click again to Collapse me. I am the child to hide :)
              </div>
            </TrippleCollapsed>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          p: 4,
          border: "1px dashed grey",
          marginBottom: 2,
          borderRadius: 2,
          backgroundColor: "#fff",
        }}
      >
        <Typography variant="h6" gutterBottom component="div">
          Extendable Subject Type
        </Typography>
        <Grid container spacing={2} alignItems="baseline">
          <Grid item xs={12}>
            <MultiFormContainer>
              {multipleSubjectTypes.map((subjectType) => (
                <React.Fragment key={subjectType.id}>
                  <ExtendableSubjectTypeForm
                    label="label here"
                    onAddToLeft={() => onAddToLeftOfSubjectType(subjectType)}
                    onAddToRight={() => onAddToRightOfSubjectType(subjectType)}
                    onChange={(_e, value) =>
                      console.log("selected value === ", {
                        value,
                        selectedValue: value,
                      })
                    }
                    options={subjectType.options}
                    onRemove={
                      multipleSubjectTypes.length > 1
                        ? () => {
                            onRemoveFromMultipleSubjectType(subjectType.id);
                          }
                        : undefined
                    }
                  />
                </React.Fragment>
              ))}
            </MultiFormContainer>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          p: 4,
          border: "1px dashed grey",
          marginBottom: 2,
          borderRadius: 2,
          backgroundColor: "#fff",
        }}
      >
        <Typography variant="h6" gutterBottom component="div">
          Graphs and Charts
        </Typography>
        <Grid container spacing={2} alignItems="baseline">
          <Grid item xs={3}>
            <Doughnut
              data={[
                { value: "30", color: "#77E982", label: "Protein one" },
                { value: "20", color: "#F89090", label: "Protein two" },
                { value: "17", color: "#FFC25F", label: "Protein three" },
                { value: "23", color: "#3AA1FF", label: "Protein four" },
                { value: "23", color: "#F79E5F", label: "Protein five" },
              ]}
            />
          </Grid>
          <Grid item xs={3}>
            <BarChart
              data={[
                { value: 150, label: "2017" },
                { value: 250, label: "2018" },
                { value: 350, label: "2019" },
                { value: 320, label: "2020" },
                { value: 130, label: "2021" },
                { value: 150, label: "2022" },
              ]}
              chartLabel="Tripple"
              chartColor="#12A8FD"
              aspectRatio={1}
            />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Uikit;
