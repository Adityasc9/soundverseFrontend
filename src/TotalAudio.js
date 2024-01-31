import { useState, useEffect } from "react";
import axios from "axios";
import "./cssFiles/TotalAudio.css";

function TotalAudio() {
  const [duration, setDuration] = useState(0);
  useEffect(() => {
    axios
      .get("https://soundverse-backend-lac.vercel.app//api/total")
      .then((response) => setDuration(response.data.total.split(" ")))
      .catch((error) => console.log(error));
  }, []);
  let seconds = Math.round(duration[0] * 10) / 10;
  let minutes = Math.round((seconds / 60) * 10) / 10;
  let hours = Math.round((minutes / 60) * 10) / 10;
  let days = Math.round((hours / 24) * 100) / 100;

  return (
    <div className="duration">
      <h1>{seconds} s</h1>
      <h1>{minutes} m</h1>
      <h1>{hours} h</h1>
      <h1>{days} d</h1>
      {/* <h1>worth of audio!</h1> */}
    </div>
  );
}

export default TotalAudio;
