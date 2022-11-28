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
;

const ViewTripleModal = ({ id, status, shouldShowAllData }) => {
  const [data, setData] = useState([]);
  const handleData = (result) => {
    let tempData = [];
    shouldShowAllData ?
      tempData = result?.evidences
      :
      tempData = result?.evidences?.filter((item) => item.status === VALIDATED)
    setData(tempData);
  }

  useEffect(() => {
    getEvidence(id, handleData);
  }, [id]);

  return (
    <ProvideEvidenceModalBoxContainer>
      <PageHeader
        isStartAlign
        pageTitleText={id}
        rightSideContent={<Tag label={status ?? "Approved"} type={status ? status.toLowerCase() : "approved"} />}
      />
      {data?.map((item) => {
        return (
          <div>
            <Section>
              <Box bordered>
                <BodyText dangerouslySetInnerHTML={{ __html: item?.text }} />
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
