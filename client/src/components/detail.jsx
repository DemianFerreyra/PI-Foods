import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetDetail } from "../actions";
import { useParams } from "react-router-dom";

const Detail = () => {
  const id = useParams();
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.recipe);

  React.useEffect(() => {
    dispatch(GetDetail(id.id));
  }, []);

  function handleClick() {
    
  }

  return (
    <div style={{ height: "100vh" }}>
      {detail.length === 0 ? (
        <div className="pizza" style={{ marginTop: "25%", marginLeft: "45%" }}>
          <img src={require("../icons/pizza.svg").default} alt="pizza" />
          <p>loading...</p>
        </div>
      ) : (
        <div className="Detail">
          <div className="Left">
            <h1>{detail[0].title}</h1>
            <div className="summary">
              <p style={{ marginBottom: "5vw" }}>{detail[0].summary}</p>
              <p>Diets: {detail[0].diets.join(", ")}</p>
            </div>
            <button className="Detailbutton" onClick={() => handleClick()}>See the summary</button>
          </div>
          <div className="Right">
            <img
              className="imagecontainer"
              src={detail[0].image}
              alt="imagen"
            />
            <ul style={{ display: "flex", flexDirection: "row", gap: "2vw" }}>
              <li style={{ width: "13vw", height: "4vw" }}>
                <p>score: {detail[0].spoonacularScore}</p>
              </li>
              <li style={{ width: "20vw", height: "4vw" }}>
                <p>health score: {detail[0].healthScore}</p>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
export default Detail;
