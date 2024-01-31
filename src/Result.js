import { useLocation } from "react-router-dom";
import ActiveUsers from "./ActiveUsers.js";
import TotalAudio from "./TotalAudio.js";
import AudiosGenerated from "./AudiosGenerated.js";
import Genres from "./Genres.js";
import StackedActivities from "./StackedActivities.js";
import EngagementByCategory from "./EngagementByCategory";
import EngagementDWM from "./EngagementDWM";
import PowerUsers from "./PowerUsers";
import DemographicPies from "./DemographicPies";
import axios from "axios";
import "./cssFiles/Result.css";
import { useState, useEffect } from "react";
import AudioTypeBar from "./AudioTypeBar.js";

function Result() {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [complete, setComplete] = useState(false);
  let state = useLocation().state;
  if (state == null) {
    alert("log in first");
    window.location.href = "/";
    return null;
  }
  let accessToken = state.accessToken;
  let data = MongoConnection();
  const changeComplete = () => {
    setComplete(!complete);
    if (endTime === "") {
      let d = new Date();
      setEndTime(d.toISOString().split("T")[0]);
    }
    if (startTime === "") {
      let d = new Date(new Date() - 30 * 24 * 60 * 60 * 1000);
      setStartTime(d.toISOString().split("T")[0]);
    }
  };

  if (!complete) {
    return (
      <div className="home">
        <label htmlFor="startTime">Start Time:</label>
        <input
          type="text"
          id="startTime"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          placeholder="YYYY-MM-DD"
          required
        />

        <label htmlFor="endTime">End Time:</label>
        <input
          type="text"
          id="endTime"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          placeholder="YYYY-MM-DD"
          required
        />

        <button className="button-1" onClick={changeComplete}>
          Fetch Metrics
        </button>
      </div>
    );
  } else {
    return (
      <div className="graphs">
        <button className="button-1" onClick={changeComplete}>
          Reset
        </button>
        <TotalAudio />
        <DemographicPies
          proficiencies={data.proficiencies}
          categories={data.catagories}
          contentTypes={data.contentTypes}
        />
        <ActiveUsers
          accessToken={accessToken}
          startTime={startTime}
          endTime={endTime}
        />
        <AudiosGenerated
          audios={data.audios}
          startDate={startTime}
          endDate={endTime}
        />
        <Genres prompts={data.prompts} />
        <StackedActivities
          activities={data.activities}
          startDate={startTime}
          endDate={endTime}
        />

        <AudioTypeBar audios={data.audios} audioTypes={data.audioTypes} />
        <button className="button-1" onClick={changeComplete}>
          Reset
        </button>
        {/* <EngagementDWM accessToken={accessToken} /> */}
        {/* <EngagementByCategory users={data.usersByCategory} activities={data.activities} /> */}
        <PowerUsers activities={data.activities} users={data.users} />
      </div>
    );
  }
}

function MongoConnection() {
  const [activities, setActivities] = useState([]);
  const [users, setUsers] = useState([]);
  const [audios, setAudios] = useState([]);
  const [prompts, setPrompts] = useState([]);
  const [audioTypes, setAudioTypes] = useState([]);

  useEffect(() => {
    axios
      .get("https://soundverse-backend-lac.vercel.app//api/audioTypes")
      .then((response) => setAudioTypes(response.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    axios
      .get("https://soundverse-backend-lac.vercel.app//api/userA")
      .then((response) => setActivities(response.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    axios
      .get("https://soundverse-backend-lac.vercel.app//api/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    axios
      .get("https://soundverse-backend-lac.vercel.app//api/audios")
      .then((response) => setAudios(response.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    axios
      .get("https://soundverse-backend-lac.vercel.app//api/prompts")
      .then((response) => setPrompts(response.data))
      .catch((error) => console.log(error));
  }, []);

  let usersByCategory = {
    "Film Maker": [],
    Other: [],
    Influencer: [],
    "Music Producer": [],
    "Singer/ Songwriter": [],
  };
  let proficiencies = {
    expert: 0,
    beginner: 0,
    advanced: 0,
    some_experience: 0,
  };
  let contentTypes = {
    "Full Songs": 0,
    Other: 0,
    "Podcasts/ Audio Narratives": 0,
    "Sound Effects": 0,
    Vocals: 0,
    "Instrumental Tracks": 0,
  };
  let catagories = {
    "Film Maker": 0,
    Other: 0,
    Influencer: 0,
    "Music Producer": 0,
    "Singer/ Songwriter": 0,
  };
  for (let user of users) {
    if (user.desc != null) {
      //console.log(user.desc.proficiency)
      if (user.desc.proficiency == "I’m an advanced creator") {
        proficiencies.advanced += 1;
      } else if (user.desc.proficiency == "I have some experience") {
        proficiencies.some_experience += 1;
      } else if (user.desc.proficiency == "I’m beginning my journey") {
        proficiencies.beginner += 1;
      } else if (user.desc.proficiency == "I’m an expert") {
        proficiencies.expert += 1;
      }

      if (user.desc.content in contentTypes) {
        contentTypes[user.desc.content] += 1;
      } else {
        contentTypes["Other"] += 1;
      }
      if (user.desc.identity in usersByCategory) {
        usersByCategory[user.desc.identity].push(user);
        catagories[user.desc.identity] += 1;
      }
    } else {
      usersByCategory["Other"].push(user);
      catagories["Other"] += 1;
    }
  }
  const data = {
    audioTypes: audioTypes,
    usersByCategory: usersByCategory,
    users: users,
    prompts: prompts,
    audios: audios,
    activities: activities,
    proficiencies: proficiencies,
    contentTypes: contentTypes,
    catagories: catagories,
  };
  return data;
}

export default Result;
