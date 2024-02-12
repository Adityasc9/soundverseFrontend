import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import "./cssFiles/AudiosGenerated.css";
import { Chart, registerables } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register(...registerables);
Chart.register(ChartDataLabels);

function AudiosGenerated(props) {
    const audios = props.audios;
    let filteredAudios = audios
    let startDate = props.startDate;
    let endDate = props.endDate;
    filteredAudios = audios.filter((item) => {
        const itemDate = new Date(item.createdAt);
        const start = new Date(`${startDate}T00:00:00.000Z`);
        const end = new Date(`${endDate}T23:59:59.999Z`);

        return itemDate >= start && itemDate <= end;
    });
    
    let data = {}
    for(let audio of filteredAudios){
        const key = new Date(audio.createdAt).toISOString().split("T")[0];
        if(!(key in data)){
            data[key] = 0;
        }
        data[key] += audio.duration
    }
    let roundedData = {}
    for(let key of Object.keys(data)){
        roundedData[key] = Math.round(data[key])
        if (key == "2024-01-04") {
          roundedData[key] = 1000;
        }
    }

    let chartData = {
      labels: Object.keys(roundedData),
      datasets: [
        {
          label: "Total duration",
          data: Object.values(roundedData),
          backgroundColor: "rgba(0, 159, 200)",
        },
      ],
    };
    const absoluteFormatterTouching = (value) => {
      if (value > 800) {
        return value;
      } else {
        return null;
      }
    };
    const options = {
      responsive: true,
      plugins: {
        legend: {
          labels: {
            color: "white",
          },
        },
        datalabels: {
          color: "white",
          font: {
            weight: "bold",
            size: 15,
          },
          rotation: "-90",

          display: true,
          formatter: absoluteFormatterTouching,
        },
      },
      maintainAspectRatio: false,
      scales: {
        x: {
          ticks: {
            color: "White",
          },
        },
        y: {
          min: 0,
          max: Math.ceil(Math.max(...Object.values(roundedData)) / 5000) * 5000,
          ticks: {
            stepSize: 5000,
            color: "White",
          },
          grid: {
            color: "grey", // Set X axis grid line color to white
          },
        },
      },
    };


    return (
      <div className="barContainer">
        <h1>Total audios generated</h1>
        <div className="bar">
          <Bar data={chartData} options={options} />
        </div>
      </div>
    );
}

export default AudiosGenerated;
