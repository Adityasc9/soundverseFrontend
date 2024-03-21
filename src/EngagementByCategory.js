import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import "./cssFiles/EBC.css";
import { Chart, registerables } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register(...registerables);
Chart.register(ChartDataLabels);

function EngagementByCategory(props){
    let data = props.csvData;
    if(!data){
        return null;
    }

    let users = props.users;
    //console.log(data);
    let userIdentity = {};
    let identities = ["Film Maker", "Influencer", "Music Producer", "Singer/ Songwriter"];
    let paid = [];
    let free = [];
    for (let user of users) {
        if (user.desc != null) {
            if(identities.includes(user.desc.identity)){
                userIdentity[user._id] = user.desc.identity;
            }
            else{
                userIdentity[user._id] = "Other";
            }
        }
        if(user.stripeCheckoutSession != null) {
            paid.push(user._id);
        }
        else{
            free.push(user._id);
        }
    }
    console.log(paid);
    console.log(free);
        // console.log(Object.keys(userIdentity).length);
    //console.log(data);
    let identityTotal = {};
    let identityCount = {};
    let PFTotal = {
      free: 0,
      paid: 0,
    };
    let PFCount = {
      free: 0,
      paid: 0,
    };
    let count = 0;
    let countN = 0;

    for(let index in data){

        let user = data[index];
        if(user[2]=="USER_ID"){
            count++;
            let userId = user[0];
            let identity = userIdentity[userId];
            if (!Object.keys(identityTotal).includes(identity)) {
                identityTotal[identity] = 0;
                identityCount[identity] = 0;
            }
          
            identityTotal[identity] += user[3];
            identityCount[identity] += 1;

            if(paid.includes(userId)){
              PFCount.paid += 1;
              PFTotal.paid += user[3];
            }

            if (free.includes(userId)) {
              PFCount.free += 1;
              PFTotal.free += user[3];
            }
        }
        
    }
    console.log(PFTotal);
    console.log(PFCount);

    let averages = {};
    for(let key of Object.keys(identityTotal)){
        averages[key] = identityTotal[key]/identityCount[key];
    }
    let PFaverages = {};
    PFaverages["free"] = PFTotal.free / PFCount.free;
    PFaverages["paid"] = PFTotal.paid / PFCount.paid;

    console.log(PFaverages);
    delete averages["undefined"];
    const sortObjectEntries = (obj) => {
      let objEntries = Object.entries(obj);
      objEntries.sort((a, b) => b[1] - a[1]);
      return objEntries
    };
    averages = sortObjectEntries(averages);
    let min = Math.floor(Math.min(...Object.values(averages.map((item) => item[1])))/50)*50;
    let max = Math.ceil(Math.max(...Object.values(averages.map((item) => item[1])))/50)*50;

    const absoluteFormatterTouching = (value) => {
      let min = value/60;
      return Math.round(min*100)/100
    };

    const Data = {
      labels: averages.map((item) => item[0]),
      datasets: [
        {
          label: "Average engagement time per user category (Seconds)",
          data: averages.map((item) => item[1]),
          backgroundColor: "rgba(255, 95, 202)",
        },
      ],
    };
    const Options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: "white",
          },
        },
        datalabels: {
          color: "White",
          font: {
            weight: "bold",
            size: 15,
          },
          display: true,
          formatter: absoluteFormatterTouching,
        },
      },
      scales: {
        x: {
          ticks: {
            color: "White",
          },
        },
        y: {
          min: min,
          max: max,
          ticks: {
            stepSize: Math.max(...Object.values(averages)) / 10,
            color: "white",
          },
        },
      },
    };
    return (
      <div className="graphI">
        <Bar data={Data} options={Options} />
      </div>
    );
}

export default EngagementByCategory;