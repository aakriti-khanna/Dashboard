import React, { useEffect, useState } from 'react'
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./Home.scss";
import Widget from '../../components/widget/Widget';
import Dashboard from '../../components/Filter/Filter';
import PieChart from '../../components/graph/PieChart/Piechart';
import Histogram from '../../components/graph/Histogram/Histogram';
import DonutChart from '../../components/graph/Donut/Donut';
import Heatmap from '../../components/graph/Heatmap/Heatmap';


function Home({data,piedata,crud}) {
  let [histoData ,setHistoData] = useState([]);
  let[mySourceData,setmySourceData]= useState([]);
  let [myData ,setmyData] = useState([]);
  let[myImpactingData,setImpactingData]=useState([]);
  let[donutData,setDonutData]=useState([]);
  let [heatmapdata ,setHeatmapData]=useState([])
  let[Trendingnews,setTrendingnews]=useState([]);




   
 useEffect(() =>{
  fetch('http://localhost:4444/getTopicWiseData')
  .then(response=> response.json())
  .then((data) => {
      console.log("App data", data)
      let d = data.answer.map(o => {
       
        return {"label":o._id == "" ? 'other' : o._id ,"value": o.count}
      })
      
      setmyData(d)
      console.log("pieeedata",myData);

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
  })
  
  
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

  fetch('http://localhost:4444/countryWiseDta')
  .then(response=> response.json())
  .then((data) => {
  
      let d = data.answer.map(o => {
        if(o.count == 650) return 1
        if(o.count == 112) return 1
        return Number(o.count)  
      })
      console.log(d, 'hfkdshfkdshksdhkjshdfkhds')
      setHistoData(d)
      console.log("histoooooo",histoData);
      
  })

 
fetch('http://localhost:4444/getTopnews')
.then(response=> response.json())
.then((data) => {
  console.log(" newsssssssssssApp data", data)
  let crud = data.answer.map(o => {
   
    return {"_id":o._id == "" ? 'other' : o._id ,"count": o.count}
  })
  console.log( crud,"crrrrrrruuuudTopppppppppp");
  setTrendingnews(crud);
  // console.log("cruuuuuudddddddddddddddsdata",Trendingnews);
  
})

  
  
  fetch('http://localhost:4444/getSourceWiseData')
  .then(response=> response.json())
  .then((data) => {
      console.log("Sourcedata", data)
      let topdata = data.answer.map(o => {
        return {"label":o._id == "" ? 'other' : o._id ,"value": o.count}
      })
      console.log(topdata,'source')
      setmySourceData(topdata)
      console.log("myscccccc",mySourceData);
  })
    
  },[])


  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          
          <Widget data={data} heading={"TOP 5 SOURCES"} />
           {/* <Widget className="widget" data={Trendingnews} />  */}
          <Widget className="widgets"  data={crud}  heading={"TOP HEADLINES"}  />
        </div>
        <div className="charts">
          <div className="heading">
            <h3>TopicWise Distribution</h3>
           
          <div className="donutchart">
            
             <DonutChart data={donutData}  width={420} height={500} />
            </div>
          </div>
        <div className="heading-histo">
        <h3>Intensity of News</h3>
        <div className="histochart">
            <Histogram data={histoData} width="800" height="350"/>
          </div>
        </div>

        <div className="heading-heat">
        <h3>Impact of Sectors</h3>
        <div className="heatmap">
          <Heatmap data={heatmapdata} width={300} height={500}/>
          </div>

        </div>
          <div className='heading-pie'>
            <h3>News of these Sector</h3>
          <div className="piechart"><PieChart data={piedata} /></div>
          </div>
          




          </div>
        <div className="listContainer">
          <div className="listTitle">
            <h2>Sort Data</h2></div>
          <Dashboard />
        </div>
      </div>
     
    </div>
  )
}

export default Home