import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import "./cssFiles/Genres.css";
import { Chart, registerables } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register(...registerables);
Chart.register(ChartDataLabels);

function Genres(props){
    let genre = {
        "lo-fi": 0,
        "edm": 0,
        "rock": 0,
        "pop": 0,
        "hip hop": 0,
        "rap": 0,
        "r&b": 0,
        "jazz": 0,
        "future bass": 0,
        "country": 0,
        "classical": 0,
        "metal": 0,
        "reggae": 0,
        "funk": 0,
        "soul": 0,
        "blues": 0,
        "indie": 0,
        "techno": 0,
        "house": 0,
        "trance": 0,
        "orchestral": 0,
        "synthwave": 0,
        "meditation": 0,
        "deathcore": 0,
        "christmas": 0,
        "bollywood": 0,
        "phonk": 0,
    };

    let vibe = {
        "happy": 0,
        "sad": 0,
        "chill": 0,
        "energetic": 0,
        "dark": 0,
        "calm": 0,
        "epic": 0,
        "study": 0,
        "cinematic": 0,
        "dramatic": 0,
        "nostalgic": 0,
        "dreamy": 0,
        "hopeful": 0,
        "ethereal": 0,
        "angry": 0,
        "romantic": 0,
        "mysterious": 0,
        "motivational": 0,
        "uplifting": 0,
        "serene": 0,
        "peaceful": 0,
        "glamorous": 0,
        "funny and weird": 0,
        "sexy": 0,
        "euphoric": 0
    }

    let instrument = {
        "piano": 0,
        "pianos": 0,
        "guitar": 0,
        "guitars": 0,
        "glockenspiel": 0,
        "glockenspiels": 0,
        "handpan": 0,
        "handpans": 0,
        "synthesizer": 0,
        "synthesizers": 0,
        "drum": 0,
        "drums": 0,
        "violin": 0,
        "violins": 0,
        "cello": 0,
        "cellos": 0,
        "saxophone": 0,
        "saxophones": 0,
        "trumpet": 0,
        "trumpets": 0,
        "flute": 0,
        "flutes": 0,
        "synth": 0,
        "synths": 0,
        "vocals": 0,
        "vocal": 0,
        "tabla": 0,
        "tablas": 0,
        "bass": 0,
        "basses": 0,
        "harp": 0,
        "harps": 0,
        "strings": 0,
        "string": 0,
        "brass": 0,
        "brasses": 0,
        "woodwind": 0,
        "woodwinds": 0,
        "percussion": 0,
        "percussions": 0,
        "organ": 0,
        "organs": 0,
        "choir": 0,
        "choirs": 0,
        "pad": 0,
        "pads": 0,
        "bell": 0,
        "bells": 0,
        "marimba": 0,
        "marimbas": 0,
    };



    let prompts = props.prompts;
    
    for(let p of prompts){
        p = p.prompt.split(" ")
        for(let word of p){
            word = word.toLowerCase()
            if(word in instrument){
                instrument[word]+=1;
            }
            else if(word in vibe){
                vibe[word]+=1;
            }
            else if(word in genre){
                genre[word]+=1
            }
        }
    }
    const sortObjectEntries = (obj) => {
      let objEntries = Object.entries(obj);
      objEntries.sort((a, b) => b[1] - a[1]);
      return objEntries.slice(0,10);
    }
    let instrumentUpdated = {}
    const singularInstruments = [
      "piano",
      "guitar",
      "glockenspiel",
      "handpan",
      "synthesizer",
      "drum",
      "violin",
      "cello",
      "saxophone",
      "trumpet",
      "flute",
      "synth",
      "vocal",
      "tabla",
      "bass",
      "harp",
      "string",
      "brass",
      "woodwind",
      "percussion",
      "organ",
      "choir",
      "pad",
      "bell",
      "marimba",
    ];
    for(let i of singularInstruments){
        instrumentUpdated[i] = instrument[i];
        if ((i + "s") in instrument){
            instrumentUpdated[i] += instrument[i + "s"];
        }
        else if((i + "es") in instrument){
            singularInstruments[i] += instrument[i + "es"]
        };
    }
    let topIntruments = sortObjectEntries(instrumentUpdated);
    let topGenres = sortObjectEntries(genre);
    let topVibes = sortObjectEntries(vibe);

    
    const instrumentData = {
      labels: topIntruments.map((item) => item[0]),
      datasets: [
        {
          label: "Top Instruments",
          data: topIntruments.map((item) => item[1]),
          backgroundColor: "rgba(255, 99, 132, 0.6)",
        },
      ],
    };
    const instrumentOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        datalabels: {
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
          max: Math.ceil(Math.max(...Object.values(topIntruments))) + 200,
          ticks: {
            stepSize: Math.max(...Object.values(topIntruments)) / 10,
          },
        },
      },
    };

    const vibeData = {
      labels: topVibes.map((item) => item[0]),
      datasets: [
        {
          label: "Top Vibes",
          data: topVibes.map((item) => item[1]),
          backgroundColor: "rgba(20, 99, 20, 0.5)",
        },
      ],
    };
    const vibeOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        datalabels: {
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
          max: Math.ceil(Math.max(...Object.values(topVibes))) + 200,
          ticks: {
            stepSize: Math.max(...Object.values(topVibes)) / 10,
          },
        },
      },
    };
    const genreData = {
      labels: topGenres.map((item) => item[0]),
      datasets: [
        {
          label: "Top Genres",
          data: topGenres.map((item) => item[1]),
          backgroundColor: "rgba(99, 20, 99, 0.4)",
        },
      ],
    };
    const genreOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        datalabels: {
          color: "white",
          font: {
            weight: "bold",
            size: 15,
          },
        }
      },
      scales: {
        y: {
          min: 0,
          max: Math.ceil(Math.max(...Object.values(topGenres))) + 200,
          ticks: {
            stepSize: Math.max(...Object.values(topGenres)) / 10,
          },
        },
      },
    };


    return (
      <div className="tops">
        <div className="row1">
          <div className="instrument">
            <Bar data={instrumentData} options={instrumentOptions} />
          </div>
        </div>
        <div className="row2">
          <div className="vibe">
            <Bar data={vibeData} options={vibeOptions} />
          </div>
          <h4>(Unaffected by time frame)</h4>
          <div className="genre">
            <Bar data={genreData} options={genreOptions} />
          </div>
        </div>
      </div>
    );
}

export default Genres;