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
import { forwardTripleToAdmin, getEvidence } from "config/api.service";
import { FLAGGED } from "config/constants";

// Dummy popover data

function createData(curie, subcurie, prefferedLabel) {
  return { curie, subcurie, prefferedLabel };
}

const rows = [
  createData("SWISSPROT-GRN_HUMAN", "GSK3 beta", "SWISSPROT-GRN_HUMAN"),
  createData("HGNC:4601", "GSK3 beta", "HGNC:4601"),
  createData("SWISSPROT-GRN_HUMAN 2", "GSK3 beta", "SWISSPROT-GRN_HUMAN 2"),
];


const FlaggedTriple = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  // PopoverGrid
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleData = (result) => {
    let temp = []
    for (let evidence of result?.evidences) {
      const flaggedTriples = evidence.codes.filter(item => item.flagged === true);
      if (flaggedTriples.length) {
        evidence.codes = flaggedTriples;
        temp.push(evidence);
      }
    }
    setData(temp);
  }

  useEffect(() => {
    if (id) {
      getEvidence(id, handleData);
    }
  }, [id]);

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

  const [checkedTriple, setTripleChecked] = useState([]);

  const handleTripleChecked = (id, checked) => {
    let temp = [...checkedTriple];
    const i = temp.findIndex(item => item.id === id);
    if (checked) {
      if (i >= 0) {
        temp[i] = { ...temp[i], notChecked: false }
      } else {
        temp.push({ id, notChecked: false });
      }
    } else {
      temp[i] = { ...temp[i], notChecked: true }
    }
    setTripleChecked(temp);
  }

  const addComment = (id, comment) => {
    let temp = [...checkedTriple];
    temp[temp.findIndex(item => item.id === id)] = { ...temp[temp.findIndex(item => item.id === id)], comment_reviewer: comment }
    setTripleChecked(temp);
  }

  const forwardToAdminCallback = (result) => {
    setShowAlert(true);
    getEvidence(id, handleData);
    navigate(-1);
  }

  const forwardToAdmin = () => {
    let commentData = {
      pubid: id,
      evidence_no: data[index].id,
      triples: checkedTriple.filter(item => item.notChecked === false)
    }
    forwardTripleToAdmin(commentData, forwardToAdminCallback)
  }

  return (
    <div>
      <PageHeader subText="Triples" pageTitleText={id} />
      <Section>
        <Box bordered>
          <BodyText dangerouslySetInnerHTML={{ __html: data[index]?.text }} onClick={handlePopoverOpen} />
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
        let commentData = [{ user: "Contributor", comment: item.comment },
        ];
        if (item?.comment_reviewer) {
          commentData.push({ user: "Reviewer", comment: item.comment_reviewer })
        }
        const addedCommentData = checkedTriple.filter(element => element.id === item.id);
        return (
          <Section>
            <TrippleCollapsed
              hideActions
              hasCheckbox
              setTripleChecked={(checked) => handleTripleChecked(item.id, checked)}
              commentData={commentData}
              addedCommentData={addedCommentData}
              key={item}
              chipContent={item.code}
              onChange={(value) => addComment(item.id, value)}
              checked={(checkedTriple.filter(element => (element.id === item.id && element?.notChecked === false)))?.length > 0}
            >
              <TripleCollapseContainer>
                <TripleBlock commentData={commentData} chipContent={contextValues} code={item.code} addedCommentData={addedCommentData} />
                {/* condition added for Demo  */}
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
                        // startIcon={<ChevronLeftOutlinedIcon />}
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
                        btnText="Forward to Admin"
                        disabled={(checkedTriple.filter(item => item.notChecked === false)).length === 0}
                        variant="contained"
                        onClick={() => forwardToAdmin()}
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
              message="Successfully forwarded To Admin"
              onClose={() => setShowAlert(false)}
            />
          </AlertWrapper>
        )
      }
    </div>
  );
};

export default FlaggedTriple;
