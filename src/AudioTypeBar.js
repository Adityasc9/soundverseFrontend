//import "./cssFiles/AudioTypes.css";
import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import "./cssFiles/AudioTypeBar.css";
import { Chart, registerables } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register(...registerables);
Chart.register(ChartDataLabels);

function AudioTypeBar(props) {
  let audios = props.audios;
  let audioTypes = props.audioTypes;
  let typeObject = {};
  for (let type of audioTypes) {
    if (type.audioType == "stem_separated") {
      typeObject[type._id] = type.stemType;
    } else {
      typeObject[type._id] = type.audioType;
    }
  }
  let typeCount = {};
  for (let audio of audios) {
    if (!Object.keys(audio).includes("audioType")) {
      if (!Object.keys(typeCount).includes(typeCount["soundverse_default"])) {
        typeCount["65545e7a85c7a3c48460ac03"] = 0;
      }
      typeCount["65545e7a85c7a3c48460ac03"] += 1;
    } else {
      if (!Object.keys(typeCount).includes(audio.audioType)) {
        typeCount[audio.audioType] = 0;
      }
      typeCount[audio.audioType] += 1;
    }
  }
  let data = {};
  for (let id of Object.keys(typeCount)) {
    data[typeObject[id]] = typeCount[id];
  }
  data["exported"] =
    data["arrangement_view_exported_mp3"] +
    data["arrangement_view_exported_wav"];
  delete data["arrangement_view_exported_mp3"];
  delete data["arrangement_view_exported_wav"];

  const sortObjectEntries = (obj) => {
    let objEntries = Object.entries(obj);
    objEntries.sort((a, b) => b[1] - a[1]);
    return objEntries;
  };
  data = sortObjectEntries(data);

  const formatLabels = (value, categories) => {
    let sum = 0;
    let dataArr = categories.chart.data.datasets[0].data;
    dataArr.map((data) => {
      sum += data;
    });
    let percentage = ((value * 100) / sum).toFixed(2) + "%" + "\n  " + value;
    return percentage;
  };


  const barData = {
    labels: data.map((item) => item[0]),
    datasets: [
      {
        label: "Audio counts",
        data: data.map((item) => item[1]),
        backgroundColor: [
          "rgb(255, 165, 0, 0.5)",
          "rgb(0, 128, 255, 0.5)",
          "rgb(255, 0, 0, 0.5)",
          "rgb(128, 0, 128, 0.7)",
          "rgb(200, 100, 100, 0.6)",
          "rgb(0, 200, 150, 0.8)",
        ],
      },
    ],
  };
  
  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Audio types",
        color: "Black",
        font: { size: 16 },
      },
      datalabels: {
        formatter: formatLabels,
        color: "white",
        font: {
          weight: "bold",
          size: 15,
        },
      },
    },
    scales: {
      y: {
        min: 0,
        max: Math.ceil(Math.max(...Object.values(data)) / 500) * 5000,
        ticks: {
          stepSize: 500,
        },
      },
    },
  };
  let contentData = {
    labels: data.map((item) => item[0]),
    datasets: [
      {
        label: "Frequency",
        data: data.map((item) => item[1]),
        borderColor: "black",
        backgroundColor: [
          "rgb(255, 165, 0, 0.5)",
          "rgb(0, 128, 255, 0.5)",
          "rgb(255, 0, 0, 0.5)",
          "rgb(0, 200, 150, 0.8)",
          "rgb(128, 0, 128, 0.7)",
          "rgb(200, 100, 100, 0.6)",
        ],
        hoverOffset: 20,
      },
    ],
  };

  let contentOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "Black", // Set legend text color to white
        },
      },
      title: {
        display: true,
        text: "Audio types",
        color: "Black",
        font: { size: 16 },
      },
      datalabels: {
        formatter: formatLabels,
        color: "white",
        font: {
          size: 16, // Adjust the font size as needed
        },
      },
    },
  };
  return (
    <div>
      <div className="bar">
        <Bar data={barData} options={barOptions} />
      </div>
      {/* <div className="pie">
        <Pie data={contentData} options={contentOptions} />
      </div> */}
    </div>
  );
}

export default AudioTypeBar;
