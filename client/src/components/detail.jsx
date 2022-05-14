import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetDetail } from "../actions";
import { Link, useParams } from "react-router-dom";

const Detail = () => {
  const id = useParams();
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.recipe);
  const [slideIndex, setSlideIndex] = useState(1);
  let Button = document.getElementById("Detailbutton");

  
  React.useEffect(() => {
    dispatch(GetDetail(id.id));
  }, []);

  function handleClick() {
    if (!Button) {
      Button = document.getElementById("Detailbutton");
    }

    if (slideIndex === 1) {
      Button.innerHTML = "See the summary";
      setSlideIndex(0);
    } else {
      Button.innerHTML = "See the step by step";
      setSlideIndex(1);
    }
  }

  return (
    <div style={{height: "100vh", overflow: 'hidden' }}>
      {detail.length === 0 ? (
        <div className="pizza">
          <img src={require("../icons/pizza.svg").default} alt="pizza" />
          <p>loading...</p>
        </div>
      ) : (
        <div className="DetailZone">
          <div className="SimpleNavBar" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Link to ='/inicio'><a href="#" className="NavBarButton">Go to main page</a></Link>
          </div>

          <div className="Detail">
          <div className="Left">
            <h1>{detail[0].title}</h1>

            {slideIndex === 1 ? (
              <div className="summary">
                <p style={{ marginBottom: "5vw" }}>{detail[0].summary}</p>
                <p>Diets: {detail[0].diets.join(", ")}</p>
                {
                  detail[0].dishTypes?(<p>Dish type/s: {detail[0].dishTypes.join(', ')}</p>):(console.log('no dishtype'))
                }
              </div>
            ) : (
              <div className="steps">
                <ul className="stepbystep">
                  {detail[0].steps?.map((step, index) => (
                    <li>
                      <b>{index})</b> {step.step}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <button className="Detailbutton" id="Detailbutton" onClick={() => handleClick()}>
              See the summary
            </button>
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

        </div>
      )}
    </div>
  );
};
export default Detail;
