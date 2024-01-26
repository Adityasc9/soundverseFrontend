import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

function EngagementDWM(props) {
  const fetchData = async (accessToken) => {
    const propertyId = "406562466";
    try {
      const metrics = [{ name: "averageSessionDuration" }];
      const dimensions = [{ name: "date" }];
      const startDate = "2022-09-01";
      const endDate = "today";

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

      console.log("responseData", responseData);
      return responseData;
    } catch (error) {
      console.error(error);
    }
  };
  fetchData(props.accessToken);
  return <h1>dAU</h1>;
}

export default EngagementDWM;
