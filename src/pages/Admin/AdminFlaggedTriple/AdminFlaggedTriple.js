import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Grid } from "@mui/material";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";

import { PageHeader, TrippleCollapsed, Button, Alert } from "components";

import TripleBlock from "./components/TripleBlock";

import {
  Section,
  Box,
  BodyText,
  BodyTextLight,
  TripleCollapseContainer,
  ActionBox,
  AlertWrapper,
} from "assets/styles/main.styles";
import { fixOrCloseTriple, getEvidence } from "config/api.service";

const AdminFlaggedTriple = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState({});
  const [index, setIndex] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [checkedCount, setCheckedCount] = useState(0);

  const handleData = (result) => {
    let temp = { pubid: result.pubid, evidences: [] };
    for (let evidence of result?.evidences) {
      const flaggedTriples = evidence.codes.filter(item => item.flagged === true);
      if (flaggedTriples.length) {
        evidence.codes = flaggedTriples;
        temp.evidences.push(evidence);
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

  const evidenceSelectFunction = (checked, innerIndex) => {
    let temp = { ...data };
    if (checked) {
      setCheckedCount(oldData => oldData + 1);
      temp.evidences[index].codes[innerIndex].isFixed = true;
    } else {
      setCheckedCount(oldData => oldData - 1);
      temp.evidences[index].codes[innerIndex].isFixed = false;
    }
    setData(temp);
  }

  const handleFixedOrClosedCallback = (result) => {
    setAlertMessage("The Fix or close is Successful");
    setShowAlert(true);
    getEvidence(id, handleData);
  }

  const handleFixedOrClosed = () => {
    let tempData = data.evidences.map((item) => {
      return {
        ...item,
        codes: item.codes.filter((item) => item.isFixed && item.isFixed === true)
      }
    })
    let temp = {
      pubid: data.pubid,
      evidences: tempData.filter((item) => item.codes.length > 0)
    }
    fixOrCloseTriple(temp, handleFixedOrClosedCallback);
  }

  return (
    <div>
      <PageHeader subText="Triples" pageTitleText={id} />
      {data?.evidences?.length &&
        <Section>
          <Box bordered>
            <BodyText dangerouslySetInnerHTML={{ __html: data.evidences[index]?.text }} />
            <BodyTextLight>
              {`${index + 1}/${data?.evidences?.length}`}
            </BodyTextLight>
          </Box>
        </Section>}
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
      {data?.evidences?.length &&
        data?.evidences[index]?.codes?.map((item, i) => {
          const contextValues = [];
          for (let context of Object.keys(item.context)) {
            contextValues.push({ labelKey: context, labelValue: item.context[context] })
          }
          let commentData = [{ user: "Contributor", comment: item.comment },
          ];
          if (item?.comment_reviewer) {
            commentData?.push({ user: "Reviewer", comment: item.comment_reviewer })
          }
          return (
            <Section>
              <TrippleCollapsed
                hideActions
                hasCheckbox
                isFlagged={true}
                viewOnly
                commentData={commentData}
                key={item}
                chipContent={item.code}
                index={i}
                setTripleChecked={(checked) => evidenceSelectFunction(checked, i)}
                checked={item.isFixed}
              >
                <TripleCollapseContainer>
                  <TripleBlock commentData={commentData} code={item.code} chipContent={contextValues} />
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
                          btnText="Fixed / Closed"
                          variant="contained"
                          onClick={() => handleFixedOrClosed()}
                          disabled={checkedCount <= 0}
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
              message={alertMessage}
              onClose={() => setShowAlert(false)}
            />
          </AlertWrapper>
        )
      }
    </div>
  );
};

export default AdminFlaggedTriple;
