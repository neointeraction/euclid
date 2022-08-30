import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Grid } from "@mui/material";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";

import { PageHeader, PopoverGrid, TrippleCollapsed, Button, Alert } from "components";

import TripleBlock from "./components/TripleBlock";

import {
  Section,
  Box,
  BodyText,
  BodyTextLight,
  HighlightText,
  TripleCollapseContainer,
  ActionBox,
  AlertWrapper,
} from "assets/styles/main.styles";
import { approveTriple, getEvidence } from "config/api.service";
import { REVERTED } from "config/constants";

// Dummy popover data

function createData(curie, subcurie, prefferedLabel) {
  return { curie, subcurie, prefferedLabel };
}

const rows = [
  createData("SWISSPROT-GRN_HUMAN", "GSK3 beta", "SWISSPROT-GRN_HUMAN"),
  createData("HGNC:4601", "GSK3 beta", "HGNC:4601"),
  createData("SWISSPROT-GRN_HUMAN 2", "GSK3 beta", "SWISSPROT-GRN_HUMAN 2"),
];

// Dummy popover data end

// Dummy Triple Data
const dummyTripleData = [1, 2];

const ReviewerViewTriple = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  // PopoverGrid
  const [anchorEl, setAnchorEl] = useState(null);
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [checkedTriples, setCheckedTriples] = useState([]);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleData = (result) => {
    let temp = []
    for (let evidence of result?.evidences) {
      const flaggedTriples = evidence.codes.filter(item => item.status === REVERTED);
      if (flaggedTriples.length) {
        evidence.codes = flaggedTriples;
        temp.push(evidence);
      }
    }
    setData(temp);
  }

  const handleIndex = (type) => {
    if (type === "next") {
      if (index < data.length - 1) {
        setIndex(oldData => oldData + 1);
      }
    } else {
      if (index > 0) {
        setIndex(oldData => oldData - 1);
      }
    }
  }

  const approvedCallBack = (result) => {
    setShowAlert(true);
    getEvidence(id, handleData);
  }

  const approveTripleData = () => {
    let commentData = {
      pubid: id,
      evidence_no: data[index].id,
      codes: checkedTriples
    }
    approveTriple(commentData, approvedCallBack)
  }

  useEffect(() => {
    if (id) {
      getEvidence(id, handleData);
    }
  }, [id]);

  return (
    <div>
      <PageHeader subText="Triples" pageTitleText={id} />
      <Section>
        <Box bordered>
          <BodyText dangerouslySetInnerHTML={{ __html: data[index]?.text }} />
          <BodyTextLight>
            {`${index + 1}/${data.length}`}
          </BodyTextLight>
          {/* Popover grid compnent  */}
          <PopoverGrid
            anchorEl={anchorEl}
            handlePopoverClose={handlePopoverClose}
            data={rows}
          />
        </Box>
      </Section>
      <ActionBox>
        <Grid
          container
          spacing={0}
          alignItems="center"
          justifyContent="flex-start"
        >
          <Grid item xs={6} textAlign="left">
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="flex-start"
            >
              <Grid item xs={2} textAlign="left">
                <Button
                  btnText="Back"
                  variant="text"
                  startIcon={<ChevronLeftOutlinedIcon />}
                  onClick={() => handleIndex("prev")}
                />
              </Grid>
              <Grid item xs={2} textAlign="left">
                <Button
                  btnText="Next"
                  variant="text"
                  endIcon={<ChevronRightOutlinedIcon />}
                  onClick={() => handleIndex("next")}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ActionBox>
      {data[0]?.codes?.map((item, index) => {
        const contextValues = [];
        for (let context of Object.keys(item.context)) {
          contextValues.push({ labelKey: context, labelValue: item.context[context] })
        }
        return (
          <Section>
            <TrippleCollapsed
              hideActions
              hasCheckbox
              key={item}
              chipContent={item.code}
            >
              <TripleCollapseContainer>
                <TripleBlock chipContent={contextValues} code={item.code} />
              </TripleCollapseContainer>
            </TrippleCollapsed>
            <ActionBox>
              <Grid
                container
                spacing={0}
                alignItems="center"
                justifyContent="flex-end"
              >
                <Grid item xs={6} textAlign="left">
                  <Grid
                    container
                    spacing={2}
                    alignItems="center"
                    justifyContent="flex-start"
                  >
                    <Grid item xs={2} textAlign="left">
                      <Button
                        btnText="Back"
                        variant="secondary"
                        onClick={() => navigate(-1)}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={6} textAlign="right">
                  <Grid
                    container
                    spacing={2}
                    alignItems="center"
                    justifyContent="flex-end"
                  >
                    <Grid item xs={3} textAlign="right">
                      <Button
                        btnText="Approve"
                        variant="outlined"
                        onClick={() => approveTripleData()}
                      />
                    </Grid>
                    <Grid item xs={3} textAlign="right">
                      <Button
                        btnText="Modify This"
                        variant="contained"
                        onClick={() => navigate("/edit-triple")}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </ActionBox>
          </Section>)
      })}
      {
        showAlert && (
          <AlertWrapper>
            <Alert
              type="success"
              message="Successfully Approved"
              onClose={() => setShowAlert(false)}
            />
          </AlertWrapper>
        )
      }
    </div>
  );
};

export default ReviewerViewTriple;
