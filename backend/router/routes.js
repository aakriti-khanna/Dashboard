const express =  require('express');
const router = express.Router();

const {getAllData,getlineChartData, getEndYearData, getCountryWiseData, getSectorWiseIntensity,getDataForLineChart,getSourceWiseData, getTopicWiseData,getDataByPublishedDate,getDataByAddedDate, postFilterWiseData,postImpactingData, postDonut, postHeatmap, getTopnews} =  require('../Controller/dataController')


router.get('/', (req,res)=>{
    res.send({test: "test is working"});
})

router.get('/data', getAllData);
router.get('/endYear', getEndYearData)
router.get('/countryWiseDta', getCountryWiseData)
router.get('/getSectorWiseIntensity', getSectorWiseIntensity)
router.get('/getSourceWiseData', getSourceWiseData)
router.get('/getTopicWiseData', getTopicWiseData)
router.get("/getSourceWiseData" ,getSourceWiseData)
// router.get("/getlineChartData" ,getlineChartData)
router.post("/postFilterWiseData" ,postFilterWiseData)
router.get("/getImpactingData" ,postImpactingData)
router.get("/getDonut" ,postDonut);
router.get("/getHeatmap",postHeatmap);
router.get("/getTopnews",getTopnews);


// router.get('/getDataByAddedDate',getDataByAddedDate)
// router.get('/getDataByPublishedDate',getDataByPublishedDate)

// router.get('/DataForLineChart',getDataForLineChart)
module.exports =  router;