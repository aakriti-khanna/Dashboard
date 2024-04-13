import Home from "./pages/home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Histogram from "./components/graph/Histogram/Histogram";
import Heatmap from "./components/graph/Heatmap/Heatmap";
import { useEffect, useState } from "react";
import Dashboard from "./components/Filter/Filter";
import Widget from "./components/widget/Widget";
import PieChart from "./components/graph/PieChart/Piechart";
import DonutChart from "./components/graph/Donut/Donut";


function App() {


 

  let [myData ,setmyData] = useState([]);
  let[myTopic, setmytopicData]=useState([])
  let[mySourceData,setmySourceData]= useState([]);
  let[filterWiseData,setFilterWiseData]= useState([]);
  let [histoData ,setHistoData] = useState([]);
  let [heatmapdata ,setHeatmapData]=useState([])
  // let[linechart,setLinechartData]=useState(randomData);
  let[myImpactingData,setImpactingData]=useState([]);
  let[donutData,setDonutData]=useState([]);
  let [Trendingnews,setTrendingnews]=useState([]);
  // console.log("linechardata" ,linechart);
  


 
  

  return (
    <div className="App">
     <BrowserRouter>

      <Routes>
        <Route exact path="/" >
          <Route index element={<Home data={mySourceData} piedata={myData} crud={Trendingnews}  />} />
        </Route>
        <Route  path="/">
          <Route index element={<Widget data={mySourceData} crud={Trendingnews}/>} />
        </Route>

        <Route path="/piechart">
          <Route index element={<PieChart data={myData} />} />
        </Route>
        <Route path="/histogram">
          <Route index element={  <Histogram data={histoData} width={800} height={500} />} />
        </Route>
        <Route path="/heatmap">
          <Route index element={  <Heatmap data={heatmapdata} width={800} height={500} />} />
        </Route>

        <Route path="/donut">
          <Route index element={  <DonutChart data={donutData} width={800} height={500} />} />
        </Route>


        <Route path="/filter">
          <Route index element={<Dashboard  data={filterWiseData}/>} />
        </Route>
      </Routes>
      
     </BrowserRouter>
    </div>
  );
}

export default App;