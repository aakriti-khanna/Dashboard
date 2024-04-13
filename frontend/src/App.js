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
  


 
  
 useEffect(() =>{
fetch('http://localhost:4444/getTopicWiseData')
.then(response=> response.json())
.then((data) => {
    // console.log("App data", data)
    let d = data.answer.map(o => {
     
      return {"label":o._id == "" ? 'other' : o._id ,"value": o.count}
    })
    
    setmyData(d)
    console.log("pieeedata",myData);
  
})


// Assuming you're using fetch API or axios for making HTTP requests

  fetch('http://localhost:4444/getFilterWiseData')
  .then(response => response.json())
  .then((data) => {
    console.log("App filterrrr data", data.data);
    if (data) { // Check if data.answer exists
    //   let d = data.data.map(o => {
    //     return {"label": o._id == "" ? 'other' : o._id, "value": o.count};
    //   });
      
      setFilterWiseData(data.data);
    //   console.log(d, "Filter data");
    } else {
      console.error("No data or answer field in the response");
    }
  })
  .catch(error => {
    console.error("Error fetching data:", error);
  });


fetch('http://localhost:4444/getdonut')
.then(response=> response.json())
.then((data) => {
    console.log("App donuuuuuuuuuttttttttttttttttt", data)
    let d = data.data.map(o => {
     
      return {"label":o._id == "" ? 'other' : o._id ,"value": o.count}
    })
    
    setDonutData(d)
    // console.log("donutttttkhaloo",d);
  
})



fetch('http://localhost:4444/getHeatmap')
.then(response=> response.json())
.then((data) => {
    // console.log("App data", data)
    let d = data.data.map(o => {
     
      return {"label":o._id.sector == "" ? 'other' : o._id.sector ,"value": o._id.likelihood}
    })
    
    setHeatmapData(d);
    console.log("heattttmapppppleloo",d);
  
})

















// fetch('http://localhost:4444/getFilterWiseData')
//   .then(response => response.json())
//   .then((data) => {
//     console.log("App filterrrr data", data.data);
//     if (data) { // Check if data.answer exists
//     //   let d = data.data.map(o => {
//     //     return {"label": o._id == "" ? 'other' : o._id, "value": o.count};
//     //   });
      
//       setFilterWiseData(data.data);
//     //   console.log(d, "Filter data");
//     } else {
//       console.error("No data or answer field in the response");
//     }
//   })
//   .catch(error => {
//     console.error("Error fetching data:", error);
//   });

// fetch('http://localhost:4444/getTopicWiseData')
// .then(response=> response.json())
// .then((data) => {
//     console.log("App data", data)
//     let d = data.answer.map(o => {
//       return {"label":o._id == "" ? 'other' : o._id ,"value": o.count}
//     })
//     setmyData(d)
//     setdonutData(d)
// })



fetch('http://localhost:4444/countryWiseDta')
.then(response=> response.json())
.then((data) => {

    let d = data.answer.map(o => {
      if(o.count == 650) return 1
      if(o.count == 112) return 1
      return Number(o.count)  
    })
    // console.log(d, 'hfkdshfkdshksdhkjshdfkhds')
    setHistoData(d)
    // console.log("histoooooo",histoData);
    
})

fetch('http://localhost:4444/getImpactingData')
.then(response=> response.json())
.then((data) => {
    // console.log("Sourcedata", data)
    let topdata = data.data.map(o => {
     
      return {"label":o._id.sector == "" ? 'other' : o._id.sector,"value": o.count}
    })
    console.log(topdata,'impacttttttttttt dekhlo')
    setImpactingData(topdata)
    // console.log("myscccccc",mySourceData);
})


fetch('http://localhost:4444/getTopnews')
.then(response=> response.json())
.then((data) => {
  console.log(" newsssssssssssApp data", data)
  let crud = data.answer.map(o => {
   
    return {"label":o._id == "" ? 'other' : o._id ,"value": o.count}
  })
  
  setTrendingnews(crud);
  console.log("newsssssdata",Trendingnews);
  
})

fetch('http://localhost:4444/getSourceWiseData')
.then(response=> response.json())
.then((data) => {
    // console.log("Sourcedata", data)
    let topdata = data.answer.map(o => {
     
      return {"label":o._id == "" ? 'other' : o._id ,"value": o.count}
    })
    console.log(topdata,'source')
    setmySourceData(topdata)
    // console.log("myscccccc",mySourceData);
})
  
},[])

  
  

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