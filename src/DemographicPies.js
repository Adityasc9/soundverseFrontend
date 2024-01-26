import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import "./cssFiles/DemographicPies.css";
import { Chart, registerables } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register(...registerables);
Chart.register(ChartDataLabels);


function DemographicPies(props) {
  let proficiencies = props.proficiencies;
  let categories = props.categories;
  let contentTypes = props.contentTypes;
  const lineFont = 22;

  const formatLabels = (value, categories) => {
    let sum = 0;
    let dataArr = categories.chart.data.datasets[0].data;
    dataArr.map((data) => {
      sum += data;
    });
    let percentage = ((value * 100) / sum).toFixed(2) + "%";
    return percentage;
  };

  let proficiencyData = {
    labels: Object.keys(proficiencies).map(String),
    datasets: [
      {
        label: "Frequency",
        data: Object.values(proficiencies),
        borderColor: "black",
        backgroundColor:['rgb(255, 165, 0,0.5)','rgb(0, 128, 255,0.5)','rgb(255, 0, 0,0.5)','rgb(0, 200, 150,0.8)'],
        hoverOffset: 20,
      },
    ],
  };
  let proficiencyOptions = {
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
        text: "Proficiency distribution",
        color: "Black",
        font: { size: lineFont },
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
  let contentData = {
    labels: Object.keys(contentTypes).map(String),
    datasets: [
      {
        label: "Frequency",
        data: Object.values(contentTypes),
        borderColor: "black",
        backgroundColor: ['rgb(255, 165, 0, 0.5)', 'rgb(0, 128, 255, 0.5)', 'rgb(255, 0, 0, 0.5)', 'rgb(0, 200, 150, 0.8)', 'rgb(128, 0, 128, 0.7)', 'rgb(200, 100, 100, 0.6)'],
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
        text: "Content type distribution",
        color: "Black",
        font: { size: lineFont },
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
  let categoryData = {
    labels: Object.keys(categories).map(String),
    datasets: [
      {
        label: "Frequency",
        data: Object.values(categories),
        borderColor: "black",
        backgroundColor: ['rgb(255, 165, 0, 0.5)', 'rgb(0, 128, 255, 0.5)', 'rgb(255, 0, 0, 0.5)', 'rgb(0, 200, 150, 0.8)', 'rgb(128, 0, 128, 0.7)'],
        hoverOffset: 20,
      },
    ],
  };
  let categoryOptions = {
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
        text: "Onboarding category distribution",
        color: "Black",
        font: { size: lineFont },
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
    <div className="pieContainer">
      <div className="proficiency">
        <Pie data={proficiencyData} options={proficiencyOptions} />
      </div>

      <div className="content">
        <Pie data={contentData} options={contentOptions} />
      </div>
      
      <div className="category">
        <Pie data={categoryData} options={categoryOptions} />
      </div>
    </div>
  );
}

export default DemographicPies;
