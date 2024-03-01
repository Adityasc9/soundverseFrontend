import "./cssFiles/ActiveUsers.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const fetchData = async (accessToken, startTime, endTime) => {
  const propertyId = "406562466";
  try {
    const metrics = [
      { name: "active1DayUsers" },
      { name: "active7DayUsers" },
      { name: "active28DayUsers" },
    ];
    let endDate = endTime;
    let startDate = startTime;
    const dimensions = [{ name: "date" }];

    const requestBody = {
      dateRanges: [{ startDate, endDate }],
      metrics,
      dimensions,
    };

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };

    const apiResponse = await axios.post(
      `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
      requestBody,
      { headers }
    );

    const responseData = apiResponse.data;

    return responseData;
  } catch (error) {
    console.error(error);
    return null;
  }
};

function ActiveUsers(props) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const result = await fetchData(
          props.accessToken,
          props.startTime,
          props.endTime
        );

        // Sort the data by dimension values in ascending order
        const sortedRows = result.rows.sort((a, b) => {
          const dateA = parseInt(a.dimensionValues[0].value, 10);
          const dateB = parseInt(b.dimensionValues[0].value, 10);
          return dateA - dateB;
        });

        setData(sortedRows);
      } catch (error) {
        console.error("Error fetching data:", error);
        setData(null); // Handle the error by setting data to null or providing an appropriate error state
      }
    };

    fetchDataAsync();
  }, [props.accessToken]);

  if (!data) {
    // Loading state or error handling
    return <div>Loading...</div>;
  }
  const labels = data.map((entry) => {
    const dateString = entry.dimensionValues[0].value;
    const year = dateString.slice(0, 4);
    const month = dateString.slice(4, 6);
    const day = dateString.slice(6, 8);
    return `${year}-${month}-${day}`;
  });
  const DAU = data.map((entry) => parseInt(entry.metricValues[0].value, 10));
  const WAU = data.map((entry) => parseInt(entry.metricValues[1].value, 10));
  const MAU = data.map((entry) => parseInt(entry.metricValues[2].value, 10));
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "DAU",
        data: DAU,
      },
      {
        label: "WAU",
        data: WAU,
      },
      {
        label: "MAU",
        data: MAU,
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        labels: {
          color: "white",
        },
      },
      datalabels: {
        display: false, // Hide data labels
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          color: "grey", // Set X axis grid line color to white
        },
        ticks: {
          color: "White",
        },
      },
      y: {
        min: 0,
        max: Math.max(...MAU) + 100,
        grid: {
          color: "grey", // Set X axis grid line color to white
        },
        ticks: {
          color: "White",
          // forces step size to be 50 units
          stepSize: 200,
        }, // Set the desired Y-axis scale step
      },
    },
  };
  const size = DAU.length;
  const DAUsum = DAU.reduce((partialSum, a) => partialSum + a, 0) / size;
  const MAUsum = MAU.reduce((partialSum, a) => partialSum + a, 0) / size;
  const WAUsum = WAU.reduce((partialSum, a) => partialSum + a, 0) / size;
  return (
    <div className="line">
      <div className="averages">
        <h2>Average DAU: {Math.round(DAUsum * 10) / 10}</h2>
        <h2>Average WAU: {Math.round(WAUsum * 10) / 10}</h2>
        <h2>Average MAU: {Math.round(MAUsum * 10) / 10}</h2>
      </div>
      <div className="graphL">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}

export default ActiveUsers;
