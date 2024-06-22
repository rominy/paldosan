import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_koreaLow from "@amcharts/amcharts4-geodata/southKoreaLow";
import axios from 'axios';
import MountainList from '../components/MountainList';
import styled from 'styled-components';
import Loading from './common/Loading';
import MoreItemsLoading from './common/MoreItemsLoading';
import Nav from 'react-bootstrap/Nav';

const MapContainer = styled.section`

  @keyframes slideIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideLeft {
    from {
      opacity: 0;
      transform: translateX(50%);
    }
    to {
      opacity: 1;
      transform: translateX(0%);
    }
  }

  max-width: 1200px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  
  .map {
    flex: 1;
    height: 646px;
    margin-right: 20px;
    padding-top: 34px;
    /* transition: transform 0.8s ease-out; */
  }

  .map.slide-left {
    animation: slideLeft 0.5s forwards;
  }

  .list-box {
    flex: 0.9;
  }
`;

const ListContainer = styled.div`
  flex: 0.9;
  height: 680px;
  /* overflow-y: ${props => props.$loading && 'scroll'}; */
  border: ${props => props.$loading && '1px solid #ccc'};
  animation: slideIn 2s forwards;
  opacity: 0;
  
  .list-box {
    height: calc(100% - 34px);
    overflow-y: scroll;
    border-right: ${props => !props.$loading && '1px solid #ccc'};
    border-bottom: ${props => !props.$loading && '1px solid #ccc'};
    border-left:${props => !props.$loading && '1px solid #ccc'};

    &::-webkit-scrollbar {
      width: 10px;
    }

    &::-webkit-scrollbar-track {
      background-color: #ccc;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #178EB4;
    }
  }
`;

const NavContainer = styled(Nav)`

  .nav-link {
    padding: 8px 22px;
    font-weight: bold;
    color: #666;

    &.active {
      background-color: #178EB4;
      color: white;
    }
  }
`;

function Map(props) {

  const mapRef = useRef(null);
  const observer = useRef();
  
  const [mountains, setMountains] = useState([]);
  const [firstClick, setFirstClick] = useState(false);
  const [totalData, setTotalData] = useState(0);
  const [loading, setLoading] = useState(false);
  const [moreLoading, setMoreLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [region, setRegion] = useState('');
  const [currentRegion, setCurrentRegion] = useState('');
  const [isListBoxVisible, setIsListBoxVisible] = useState(false);
  const [polygonData, setPolygonData] = useState([
    {
      "id": "KR-11",
      "name": "서울특별시",
      "region": "서울",
      "fill": am4core.color("#87CEEB"),
    }, 
    {
      "id": "KR-26",
      "name": "부산광역시",
      "region": "부산",
      "fill": am4core.color("#87CEEB"),
    }, 
    {
      "id": "KR-27",
      "name": "대구광역시",
      "region": "대구",
      "fill": am4core.color("#87CEEB"),
    }, 
    {
      "id": "KR-28",
      "name": "인천광역시",
      "region": "인천",
      "fill": am4core.color("#87CEEB"),
    }, 
    {
      "id": "KR-29",
      "name": "광주광역시",
      "region": "광주",
      "fill": am4core.color("#87CEEB"),
    }, 
    {
      "id": "KR-30",
      "name": "대전광역시",
      "region": "대전",
      "fill": am4core.color("#87CEEB"),
    }, 
    {
      "id": "KR-31",
      "name": "울산광역시",
      "region": "울산",
      "fill": am4core.color("#87CEEB"),
    }, 
    {
      "id": "KR-41",
      "name": "경기도",
      "region": "경기도",
      "fill": am4core.color("#87CEEB"),
    }, 
    {
      "id": "KR-42",
      "name": "강원도",
      "region": "강원도",
      "fill": am4core.color("#87CEEB"),
    },
    {
      "id": "KR-43",
      "name": "충청북도",
      "region": "충청북도",
      "fill": am4core.color("#87CEEB"),
    },
    { 
      "id": "KR-44",
      "name": "충청남도",
      "region": "충청남도",
      "fill": am4core.color("#87CEEB"),
    },
    { 
      "id": "KR-45",
      "name": "전라북도",
      "region": "전라북도",
      "fill": am4core.color("#87CEEB"),
    },
    { 
      "id": "KR-46",
      "name": "전라남도",
      "region": "전라남도",
      "fill": am4core.color("#87CEEB"),
    },
    { 
      "id": "KR-47",
      "name": "경상북도",
      "region": "경상북도",
      "fill": am4core.color("#87CEEB"),
    },
    { 
      "id": "KR-48",
      "name": "경상남도",
      "region": "경상남도",
      "fill": am4core.color("#87CEEB"),
    },
    { 
      "id": "KR-49",
      "name": "제주특별자치도",
      "region": "제주",
      "fill": am4core.color("#87CEEB"),
    },
    {
      "id": "KR-50",
      "name": "세종특별자치시",
      "region": "세종",
      "fill": am4core.color("#87CEEB"),
    },
  ]);
  // 불러올 아이템 개수
  const numOfItems = 2;
  const [activeKey, setActiveKey] = useState('home');

  useEffect(() => {
    let map = am4core.create("chartdiv", am4maps.MapChart);
  
    map.geodata = am4geodata_koreaLow;
  
    map.projection = new am4maps.projections.Miller();

    let polygonSeries = new am4maps.MapPolygonSeries();
    polygonSeries.useGeodata = true;
    map.series.push(polygonSeries);

    polygonSeries.data = polygonData;

    let polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = "{name}";
    polygonTemplate.propertyFields.fill = "fill";

    let hs = polygonTemplate.states.create("hover");
    hs.properties.fill = am4core.color("#4682B4");

    // 확대/축소 제어
    map.zoomControl = new am4maps.ZoomControl();
    map.zoomControl.disabled = true;
    // 휠
    map.chartContainer.wheelable = false;
    // 더블클릭
    map.seriesContainer.events.disableType("doublehit")

    // 지도 드래그 제어
    map.seriesContainer.draggable = false;
    map.seriesContainer.resizable = false;

    // 마우스 커서 변경
    polygonSeries.mapPolygons.template.events.on("over", function(event) {
      event.target.cursorOverStyle = am4core.MouseCursorStyle.pointer;
    });

    // 클릭 이벤트
    polygonTemplate.events.on("hit", async function(ev) {
      const region = ev.target.dataItem.dataContext.region;
      const name = ev.target.dataItem.dataContext.name;

      // 같은 지역 클릭 시 종료
      if (currentRegion === name) {
        return;
      }

      // 최초 클릭
      setFirstClick(true);

      setRegion(region);
      setCurrentRegion(name);
      setIsListBoxVisible(true);
      
      // 아이템이 추가된 후 다른 지역 클릭 시 초기화
      setMountains([]);
      setPage(1);
      setTotalData(0);
    });
    
    mapRef.current = map;

    return () => {
      map.dispose();
    };
  }, [polygonData]);

  // 산 API 호출
  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    
    if (currentRegion) {
      const fetchMountains = async () => {

        if (page >= 2) {
          setMoreLoading(true);
        } else {
          setLoading(true);
        }
        try {
          const response = await axios.get(`http://openapi.forest.go.kr/openapi/service/trailInfoService/getforeststoryservice?serviceKey=${process.env.REACT_APP_DATAPOTAL_SERVICEKEY}`, {
            params: {
              mntnAdd: region,
              numOfRows: numOfItems,
              pageNo: page,
            },
            cancelToken: source.token,
            });

            const newMoutains = response.data.response.body.items.item;
            setMountains(prevMountains => [...prevMountains, ...newMoutains]);

            if (!totalData) {
              setTotalData(response.data.response.body.totalCount);
            }
          } catch (err) {
            if (err.message == 'axiosCancel') {
              return;
            }
            console.error(err);
            return;
          }
          setLoading(false);
          setMoreLoading(false);
          // API 호출 완료 후 색상 적용
          setPolygonData(prevData =>
            prevData.map(item => item.name === currentRegion ? {...item, fill: am4core.color("#4682B4")} : {...item, fill: am4core.color("#87CEEB")})
          );
        };
        fetchMountains();
      }
      
      return () => {
        source.cancel('axiosCancel');
      };
    }, [currentRegion, page]);
    
    // 무한 스크롤
    const lastMountainElementRef = useCallback(node => {
      if (moreLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          setPage(prevPage => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    }, [moreLoading]);
    
  return (
    <MapContainer>
      <div className={`map ${isListBoxVisible ? 'slide-left' : ''}`} id='chartdiv' />
      {/* (수정필) 첫 렌더링 시 로딩 컴포넌트가 보여지지 않아 하드코딩 한 경향이 있음 */}
      {mountains.length >= 1 || firstClick
        ? <ListContainer $loading={loading}>
            {loading
              ? <Loading region={currentRegion} />  
              : <>
                  <NavContainer 
                    variant="tabs" 
                    defaultActiveKey="home"
                    onSelect={selectedKey => setActiveKey(selectedKey)}
                  >
                    <Nav.Item>
                      <Nav.Link eventKey="home">전체 {totalData}개</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="favorites">즐겨찾기</Nav.Link>
                    </Nav.Item>
                  </NavContainer>
                  <div className='list-box'>
                    <div>정렬</div>
                    {activeKey === 'home' && 
                      <>
                        {mountains.map((mountain, index) => 
                        <MountainList 
                          key={index} 
                          list={mountain} 
                        />)}
                        {page < Math.ceil(totalData / numOfItems) && <div ref={lastMountainElementRef}></div>}
                        {moreLoading && <MoreItemsLoading />}
                      </>
                    }
                    {activeKey === 'favorites' && <div>즐겨찾기</div>}
                  </div>
                </>
            }
          </ListContainer>
        : loading 
          ? <ListContainer $loading={loading}>
              <Loading region={currentRegion} />
            </ListContainer>
          : null 
      }
    </MapContainer>
  );
}

export default Map;
