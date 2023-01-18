import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [flightList, setFlightList] = useState([]);
  const FetchFlights = () => {
    axios.get("http://localhost:8090/flights").then((res) => {
      console.log(res);
      setFlightList(res.data);
    });
  };
  useEffect(() => {
    FetchFlights();
  }, []);
  return (
    <div className="App">
      {flightList.map((f) => {
        return (
          <div
            style={{ backgroundColor: "grey", padding: "10px", margin: "10px" }}
          >
            <p>
              {" "}
              you are traveling with{" "}
              {f.validatingAirlineCodes[0] !== "AH"
                ? f.validatingAirlineCodes[0]
                : "Air Algerie"}
            </p>
            <p>
              the cost is : {f.price.total} {f.price.currency}
            </p>
            <p>
              departure from {f.itineraries[0].segments[0].departure.iataCode}{" "}
              at {f.itineraries[0].segments[0].departure.at}{" "}
            </p>
            <p>
              arriving to {f.itineraries[0].segments[0].arrival.iataCode} at{" "}
              {f.itineraries[0].segments[0].arrival.at}{" "}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default App;
