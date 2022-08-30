import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";

import { PageHeader, Tag, PopoverGrid, Chip } from "components";

import {
  ProvideEvidenceModalBoxContainer,
  Section,
  Box,
  BodyText,
  HighlightText,
  BodyTextLight,
  PlainTypesItem,
  InfoWithActions,
} from "assets/styles/main.styles";
import { getEvidence } from "config/api.service";
import { VALIDATED } from "config/constants";

const data1 = [
  {
    label: "Disease",
    value: "Alzheimer's disease",
  },
  {
    label: "Species",
    value: "Human beings",
  },
];

// Dummy popover data

function createData(curie, subcurie, prefferedLabel) {
  return { curie, subcurie, prefferedLabel };
}

const rows = [
  createData("SWISSPROT-GRN_HUMAN", "GSK3 beta", "SWISSPROT-GRN_HUMAN"),
  createData("HGNC:4601", "GSK3 beta", "HGNC:4601"),
  createData("SWISSPROT-GRN_HUMAN 2", "GSK3 beta", "SWISSPROT-GRN_HUMAN 2"),
];

const ViewTripleModal = ({ id }) => {
  // PopoverGrid
  const [anchorEl, setAnchorEl] = useState(null);
  const [data, setData] = useState([]);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleData = (result) => {
    setData(result?.evidences?.filter((item) => item.status === VALIDATED));
  }

  useEffect(() => {
    getEvidence(id, handleData);
  }, [id]);

  return (
    <ProvideEvidenceModalBoxContainer>
      <PageHeader
        isStartAlign
        pageTitleText={id}
        rightSideContent={<Tag label="Approved" type="approved" />}
      />
      {data?.map((item) => {
        return (
          <div>
            <Section>
              <Box bordered>
                <BodyText dangerouslySetInnerHTML={{ __html: item?.text }} />
                {/* Popover grid compnent  */}
                <PopoverGrid
                  anchorEl={anchorEl}
                  handlePopoverClose={handlePopoverClose}
                  data={rows}
                />
              </Box>
            </Section>
            {item?.codes?.map((element, index) => {
              const contextValues = Object.keys(element.context);
              return (
                <Box>
                  <Grid container spacing={1} justifyContent="flex-start">
                    {contextValues?.map((value, index) => (
                      <Grid item xs={2} key={index}>
                        <PlainTypesItem noBg noMb>
                          <Chip
                            content={[{ labelKey: value, labelValue: element.context[value] }]}
                          />
                        </PlainTypesItem>
                      </Grid>
                    ))
                    }
                  </Grid>
                  <InfoWithActions>
                    <Grid container spacing={1} alignItems="flex-start">
                      <Grid item xs={9}>
                        <Chip
                          content={element.code}
                          isSingleString={true}
                        />
                      </Grid>
                    </Grid>
                  </InfoWithActions>
                </Box>)
            })}
          </div>
        )
      })
      }
    </ProvideEvidenceModalBoxContainer >
  );
};

export default ViewTripleModal;
