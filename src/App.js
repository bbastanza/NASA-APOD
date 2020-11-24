import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./App.css";
import nasaImage from "./images/nasa.png";
import spacexImage from "./images/spacex.png";
import Ticker from "react-ticker";

const App = () => {
    const [data, setData] = useState([]);
    const getPhotoOfTheDay = useRef(() => {});

    const API_KEY = `A4ACJGPvwBJhrAH9QuRTXnUku7LeLcZv8JFd0AiP`;
    const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;

    getPhotoOfTheDay.current = () => {
        axios
            .get(url)
            .then(response => setData(response.data))
            .catch(error => console.log(error));
    };

    useEffect(() => {
        getPhotoOfTheDay.current();
    }, [getPhotoOfTheDay]);

    const appStyle = {
        width: "80%",
        margin: "20px auto",
        justifyContent: "center",
        color: "white",
        background: "#323232",
        textAlign: "center",
    };

    const imgStyle = {
        width: 500,
        height: "auto",
        borderRadius: 30,
    };

    const logoStyle = {
        height: 150,
        width: "auto",
    };

    return (
        <div style={appStyle}>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <img style={logoStyle} src={nasaImage} alt="nasa" />
                <img style={logoStyle} src={spacexImage} alt="spacex" />
            </div>
            <h1>{data.title}</h1>
            <img style={imgStyle} src={data.hdurl} alt={data.title} />
            <div style={{ width: 800, margin: "auto", textAlign: "center" }}>
                {data.explanation ? (
                    <Ticker offset="run-in" speed="7">
                        {() => <h3 style={{ whiteSpace: "nowrap" }}>{data.explanation + "...."}</h3>}
                    </Ticker>
                ) : null}
                <p>{data.date}</p>
                <p>{"©" + data.copyright}</p>
            </div>
        </div>
    );
};

export default App;
