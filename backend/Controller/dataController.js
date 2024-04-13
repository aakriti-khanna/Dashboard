const RawData = require('../model/rawData');

//all data
module.exports.getAllData = async (req, res) => {
    const data = await RawData.find({});
    res.json({success: true,data})
    // res.send("hi");
}
//end year

module.exports.getTopnews = async (req, res) => {
  try {
    // const pipeline = [];
    const pipeline = [];
    // Match stage to filter documents based on provided values
    const matchStage = {};
   
    pipeline.push({ $match: matchStage });

    console.log("matchstage:- ", matchStage);


    // Group stage to group documents based on title and insight
    const groupStage = {
      $group: {
        _id: { label: "$title", value: "$insight" },
        // count: { $sum: 1 } // Count documents in each group
      }
    };
    pipeline.push(groupStage);
    
    // Sort stage to sort documents based on count in descending order
    const sortStage = {
      $sort: { count: -1 }
    };
    pipeline.push(sortStage);
    
    // Limit stage to limit the output to 8 documents
    const limitStage = {
      $limit: 5
    };
    pipeline.push(limitStage);

    // Aggregate the data
    const data = await RawData.aggregate(pipeline);

    res.json({ success: true, data: data });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.getEndYearData = async (req, res) => {
    const data = await RawData.find({end_year: 2027});
    res.json({success: true,data})
    // res.send("hi");

}
module.exports.getSectorWiseIntensity = async (req, res) => {
                  RawData
                  .find({})
                  .then(data => {

                    let manupulatedData = [];
                    data.forEach((obj) =>{
                    obj = obj.toObject()
                        console.log(obj["sector"])
                        let tempSector = [];
                        if(obj.sector && !tempSector.includes(obj.sector)){
                           let foundInManipulatedData = manupulatedData.find(v => v.sector  == obj.sector)
                          if(foundInManipulatedData){
                       foundInManipulatedData['intesity'] =     foundInManipulatedData['intesity'] + obj.intensity;
                
                        }else{
                            manupulatedData.push({'intesity':obj.intensity, 'sector':obj.sector });
                            tempSector.push(obj.sector)
                        }
                    }
                    })

                    res.json({success: true,manupulatedData})

                  })
  
 
 
    // res.send("hi");
}



module.exports.getCountryWiseData = async (req, res) => {
    const data = await RawData.aggregate( [
        {
          $group: {
             _id:'$country',
             count: { $count: {     } }
          }
        }
      ] );
    res.json({success: true,answer : data.filter(v => v.count > 8)})
   
}

module.exports.getTopicWiseData = async (req, res) => {
    const data = await RawData.aggregate( [
        {
          $group: {
             _id:'$topic',
             count: { $count: { } }
          }
        }
      ] );
    res.json({success: true,answer : data.filter(v => v.count > 30)})
   
}



module.exports.getSourceWiseData = async (req, res) => {
  const data = await RawData.aggregate( [
      {
        $group: {
           _id:'$source',
           count: { $count: { } }
        }
      },
      { $sort: { count: -1 } } 
      ,{$limit:5}
    ] );
  res.json({success: true,answer : data.filter(v => v.count > 5)})
 
}
module.exports.postImpactingData = async (req, res) => {
  try {
  
  
    const pipeline = [];
    // Match stage to filter documents based on provided values
    const matchStage = {};
 
    pipeline.push({ $match: matchStage });

    // Group stage to group documents based on sector and calculate count
    const groupStage = {
      $group: {
        _id: {sector: "$sector",country: "$country" ,relevance: "$relevance"}, // Group by sector field
        count: { $sum: 1 } // Count documents in each group
      },
     

    };
    pipeline.push(groupStage);
    
    const sortStage = {
      $sort: { count: -1 } // Sort by count field in descending order
    };
    pipeline.push(sortStage);

    const limitStage = {
      $limit: 8, // Limit to 10 documents
    };
    pipeline.push(limitStage);

    console.log("matchstage:- ", matchStage);
    const data = await RawData.aggregate(pipeline);
    res.json({ success: true, data: data });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


module.exports.postHeatmap = async (req, res) => {
  try {
    let { sector, likelihood} = req.body;
  
    const pipeline = [];
    // Match stage to filter documents based on provided values
    const matchStage = {};
   
    pipeline.push({ $match: matchStage });

    console.log("matchstage:- ", matchStage);


    const groupStage = {
      $group: {
        _id: {sector: "$sector",likelihood: "$likelihood" }, // Group by sector field
        count: { $sum: 1 } // Count documents in each group
      },
      
     

    };
    const limitStage = {
      $limit: 15, // Limit to 10 documents
    };
    pipeline.push(limitStage);




    pipeline.push(groupStage);
    const data = await RawData.aggregate(pipeline);
    res.json({ success: true, data: data });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};






module.exports.postDonut = async (req, res) => {
  try {
    // Aggregate data to get counts by sector
    const pipeline = [
      // Group stage to group documents based on sector
      {
        $group: {
          _id: "$sector",
          count: { $sum: 1 } // Count documents in each group
        }
      }
    ];

    // Execute the aggregation pipeline
    const data = await RawData.aggregate(pipeline);
    console.log(data);
    // Send the response with the aggregated data
    res.json({ success: true, data: data.filter(v => v.count > 18) });

  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.postFilterWiseData = async (req, res) => {
  let {end_year,sector, topic, country, source, intensity} = req.body;
  console.log(req.body);
  const pipeline = [];
    // Match stage to filter documents based on provided values
    const matchStage = {};
    if (sector) matchStage.sector = sector;
    if (topic) matchStage.topic = topic;
    if (country) matchStage.country = country;
    if (source) matchStage.source = source;   
    if (intensity) matchStage.intensity = intensity;
    console.log("matchstage:- ",matchStage);
    pipeline.push({ $match: matchStage });
      console.log(req.body)
        const data = await RawData.aggregate(pipeline);
          res.json({data:data})
        // res.json({answer : data.filter(v => v.count > 30)})
}


module.exports.getTopnews = async (req, res) => {
  const data = await RawData.aggregate( [
    {
      $group: {
         _id:'$insight',
         count: { $count: { } }
      }
    }
    ,{$limit:5}
  ] );
res.json({success: true,answer : data})


};