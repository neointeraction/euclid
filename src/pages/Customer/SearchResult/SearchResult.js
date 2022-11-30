import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";

import {
  PageHeader,
  Tooltip,
  IconButton,
  Button,
  Chip,
  Card,
} from "components";
import { BarGraphChart } from "components/Charts";

import {
  ActionFlexTitle,
  ActionBox,
  ChipsContainer,
  Section,
  Box,
  SectionTitle,
  TempImage,
  ChartBox,
  TextLight,
} from "assets/styles/main.styles";

import Chart1 from "assets/images/temp/chart1.png";
import {
  getDonutChart,
  getTop10EntitiesGraph,
  getTriplesAndEvidencesGraph,
} from "config/api.service";
import PieChart from "components/Charts/PieChart";
// import Chart2 from "assets/images/temp/chart2.png";
// import Chart3 from "assets/images/temp/chart3.png";
// import Chart4 from "assets/images/temp/chart4.png";

const SearchResult = () => {
  const navigate = useNavigate();
  const [top10EntitiesGraphData, setTop10EntitiesGraphData] = useState([]);
  const [triplesAndEvidencesGraph, setTriplesAndEvidencesGraphData] = useState(
    []
  );
  const [donutGraphDatas, setDonutGraphDatas] = useState([]);
  const [innerDonutGraphDatas, setInnerDonutGraphDatas] = useState([]);
  const location = useLocation();
  const searchData = Object.keys(location.state.searchData);

  useEffect(() => {
    getTop10EntitiesGraph((result) => setTop10EntitiesGraphData(result));
    getTriplesAndEvidencesGraph((result) =>
      setTriplesAndEvidencesGraphData(result)
    );
    getDonutChart((result) => setDonutGraphDatas(result));
  }, []);

  const [levelId, setLevelId] = useState(1);

  const handleChartLevel = (e) => {
    if (levelId === 1) {
      if (e?.payload?.payload?.dataPie2?.length) {
        setInnerDonutGraphDatas(e?.payload?.payload?.dataPie2);
        setLevelId(2);
      }
    } else {
      setLevelId(1);
    }
  };

  return (
    <div>
      <PageHeader
        pageTitleText="Buy Triple"
        rightSideContent={
          <ActionFlexTitle>
            <Tooltip message="Add to Cart" position="bottom">
              <IconButton
                disabled
                secondary
                onClick={() => {}}
                icon={<AddShoppingCartOutlinedIcon fontSize="small" />}
              />
            </Tooltip>
            <Button
              btnText="Buy now for $200"
              variant="contained"
              onClick={() => {}}
              disabled
            />
          </ActionFlexTitle>
        }
      />
      <ActionBox small>
        <Grid
          container
          spacing={0}
          alignItems="center"
          justifyContent="flex-end"
        >
          <Grid item xs={12} textAlign="right">
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="flex-start"
            >
              <Grid item xs={5.9} textAlign="left">
                <Box>
                  <div>
                    <SectionTitle>Search Data:</SectionTitle>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "wrap",
                      minHeight: "120px",
                    }}
                  >
                    {searchData.map((item, i) => {
                      return (
                        <>
                          {
                            <Chip
                              content={[
                                {
                                  labelKey: item,
                                  labelValue: location.state.searchData[item],
                                },
                              ]}
                            />
                          }
                        </>
                      );
                    })}
                  </div>
                </Box>
              </Grid>
              <Grid item xs={6} textAlign="left">
                <Box>
                  <div>
                    <SectionTitle>Context Data:</SectionTitle>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "wrap",
                      marginLeft: "2px",
                      minHeight: "120px",
                    }}
                  >
                    {location.state.context.map((item, i) => {
                      return (
                        <>
                          {typeof item === "string" ? (
                            <Chip isSingleString={true} content={item} />
                          ) : (
                            <Chip
                              content={[
                                {
                                  labelKey: item.context,
                                  labelValue: item.contextValue,
                                },
                              ]}
                            />
                          )}
                        </>
                      );
                    })}
                    {location.state.entities.map((item, i) => {
                      return (
                        <>
                          {typeof item === "string" ? (
                            <Chip isSingleString={true} content={item} />
                          ) : (
                            <Chip
                              content={[
                                {
                                  labelKey: item.entityType,
                                  labelValue: item.entityValue,
                                },
                              ]}
                            />
                          )}
                        </>
                      );
                    })}
                  </div>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} textAlign="right">
            <Grid
              container
              spacing={1}
              alignItems="center"
              justifyContent="flex-end"
              marginY={"1px"}
              marginRight={0}
            >
              <Grid item xs={1} textAlign="right">
                <Button
                  btnText="Modify"
                  variant="outlined"
                  onClick={() =>
                    navigate("/query-triple", {
                      state: {
                        context: location.state.context,
                        entities: location.state.entities,
                      },
                    })
                  }
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ActionBox>
      <Section>
        <Box>
          <SectionTitle>Types of Entities:</SectionTitle>
            <PieChart
              data={levelId === 1 ? donutGraphDatas : innerDonutGraphDatas}
              onClickHandler={handleChartLevel}
              levelId={levelId}
              setLevelId={setLevelId}
            />
        </Box>
      </Section>
      <Grid container spacing={2} alignItems="baseline">
        <Grid item xs={12}>
          <Section>
            <Box>
              <SectionTitle>
                Top 10 Entities & Its Number of occurance:
              </SectionTitle>
              <BarGraphChart data={top10EntitiesGraphData} />
            </Box>
          </Section>
        </Grid>
      </Grid>

      <Section>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <SectionTitle>Evidence supporting each Triple:</SectionTitle>
              <BarGraphChart
                height={660}
                barSize={30}
                data={triplesAndEvidencesGraph}
                layout="vertical"
              />
            </Grid>
            <Grid item xs={4}>
              <Grid container spacing={2} alignItems="baseline">
                {triplesAndEvidencesGraph?.map((item) => {
                  return (
                    <Grid item xs={6}>
                      <Card
                        count={100}
                        title={item.text}
                        color={item.fill}
                        height={"50px"}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Section>
    </div>
  );
};

export default SearchResult;
