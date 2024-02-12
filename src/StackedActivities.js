import { useState, useEffect } from "react";
import axios from "axios";
import "./cssFiles/StackedActivities.css";
import { Bar } from "react-chartjs-2";


function StackedActivities(props){
    let activities = props.activities;
    let startDate = props.startDate;
    let endDate = props.endDate;

    
    const filteredActivities = activities.filter((item) => {
      const itemDate = new Date(item.createdAt);
      const start = new Date(`${startDate}T00:00:00.000Z`);
      const end = new Date(`${endDate}T23:59:59.999Z`);

      return itemDate >= start && itemDate <= end;
    });
    
    let data = {}
    for (let a of activities) {
      let date = new Date(a.createdAt);
      let activity = a.activity;
      let time = date.toISOString().split("T")[0];
      if (!(time in data)) {
        data[time] = {};
      }
      if (!(activity in data[time])) {
        data[time][activity] = 0;
      }
      data[time][activity] += 1;
    }
    let labels = Object.keys(data);
    const allActivities = {
      "ai_magic_tool_used":[],
      "arranger_closed":[],
      "arranger_opened":[],
      "audio_exported":[],
      "processing_complete":[],
      "processing_start":[],
      "project_created":[],
      "sign_in":[],
      "sign_out":[],
      "studio_closed":[],
      "studio_opened":[],
    };
    for (let entry of Object.keys(data)) {
      for (let activity of Object.keys(allActivities)) {
        //console.log(activity , Object.keys(data[entry]));
        if (Object.keys(data[entry]).includes(activity)) {
          allActivities[activity].push(data[entry][activity]);
        } else {
          allActivities[activity].push(0);
        }
      }
    }
    const absoluteFormatterTouching = (value) => {
      if (value > 50) {
        return value;
      } else {
        return null;
      }
    };

    const Data = {
      labels: labels,
      datasets: [
        {
          label: "Arranger Closed",
          data: allActivities["arranger_closed"],
          backgroundColor: "rgba(99, 20, 20, 0.8)",
        },
        {
          label: "Arranger Opened",
          data: allActivities["arranger_opened"],
          backgroundColor: "rgba(20, 20, 99, 0.8)",
        },
        {
          label: "Audio Exported",
          data: allActivities["audio_exported"],
          backgroundColor: "rgba(255, 69, 0, 0.8)",
        },
        {
          label: "Project Created",
          data: allActivities["project_created"],
          backgroundColor: "rgba(50, 50, 255, 0.8)",
        },
        {
          label: "Studio Closed",
          data: allActivities["studio_closed"],
          backgroundColor: "rgba(255, 192, 203, 1)",
        },
        {
          label: "Studio Opened",
          data: allActivities["studio_opened"],
          backgroundColor: "rgba(0, 128, 128, 0.8)",
        },
        {
          label: "Sign Out",
          data: allActivities["sign_out"],
          backgroundColor: "rgba(148, 0, 211, 0.7)",
        },
        {
          label: "Sign In",
          data: allActivities["sign_in"],
          backgroundColor: "rgba(255, 140, 0, 0.7)",
        },
        {
          label: "AI magic tools",
          data: allActivities["ai_magic_tool_used"],
          backgroundColor: "rgba(20, 99, 20, 0.7)",
        },
        {
          label: "Processing Complete",
          data: allActivities["processing_complete"],
          backgroundColor: "rgba(50, 205, 50, 0.7)",
        },
        {
          label: "Processing Start",
          data: allActivities["processing_start"],
          backgroundColor: "rgba(0, 0, 205, 0.7)",
        },
      ],
    };
    const Options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        datalabels: {
          color: "white",
          font: {
            weight: "bold",
            size: 15,
          },
          display: true,
          formatter: absoluteFormatterTouching,
        },
      },
      scales: {
        y: {
          min: 0,
          max: Math.max(allActivities["studio_opened"])*10,
          ticks: {
            stepSize: 500,
          },
          stacked: true,
        },
        x: {
          stacked: true,
        },
      },
    };
    

    return (
      <div className="graph">
        <h1>User activity counts</h1>
        <div className="stacked">
          <Bar data={Data} options={Options} />
        </div>
      </div>
    );
    
    

}

export default StackedActivities;