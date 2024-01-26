import axios from "axios";
import { useState, useEffect } from "react";

function MongoConnection() {
  const [activities, setActivities] = useState([]);
  const [users, setUsers] = useState([]);
  const [audios, setAudios] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/userA")
      .then((response) => setActivities(response.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/audios")
      .then((response) => setAudios(response.data))
      .catch((error) => console.log(error));
  }, []);

  let usersByIdentity = {
    other: [],
    music_producer: [],
    singer_songwriter: [],
    influencer: [],
    film_maker: []
  }
  for(let user of users){
    if(user.desc != null){
        if(user.desc.identity === "Singer/ Songwriter"){
            usersByIdentity.singer_songwriter.push(user);
        }
        else if(user.desc.identity === "Influencer"){
            usersByIdentity.influencer.push(user);
        }
        else if (user.desc.identity === "Music Producer") {
        usersByIdentity.music_producer.push(user);
        }
        else if (user.desc.identity === "Film Maker") {
        usersByIdentity.film_maker.push(user);
        }
        else{
            usersByIdentity.other.push(user);
        }
    }
  }
  console.log("users:", usersByIdentity);
  //console.log("activities Items:", activities);

  return <h1>connected and displayed response</h1>;
}

