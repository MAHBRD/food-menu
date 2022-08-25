import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import React from "react";

function Recipe() {
  let params = useParams();
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState("instructions");
  const [loading, setLoading] = useState(true);
  const fetchDetails = async () => {
    setLoading(true);
    const data = await fetch(
      `https://api.spoonacular.com/recipes/${
        params.name
      }/information?apiKey=${"d35a4f3ad85f48258a420f267b698394"}`
    );
    const detailData = await data.json();
    setDetails(detailData);
    setLoading(false);
  };
  console.log("sala");

  useEffect(() => {
    fetchDetails();
  }, []);
  console.log(details);
  if (loading) {
    return <h3>fdwafw</h3>;
  }
  return (
    <DetailWrapper>
      <div>
        <h2>{details.title}</h2>
        <img src={details.image} alt="" />
      </div>
      <Info>
        <Button
          className={activeTab === "  Instructions" ? "active" : ""}
          onClick={() => {
            setActiveTab("instructions");
          }}
        >
          Instructions
        </Button>
        <Button
          className={activeTab === "ingredients" ? "active" : ""}
          onClick={() => {
            setActiveTab(" Ingredients");
          }}
        >
          Ingredients
        </Button>
        <>
          <div dangerouslySetInnerHTML={{ __html: details.summary }} />
          <div dangerouslySetInnerHTML={{ __html: details.instructions }} />

          <ul>
            {details.extendedIngredients.map((ingredients) => {
              return <li key={ingredients.id}>{ingredients.original}</li>;
            })}
          </ul>
        </>
      </Info>
    </DetailWrapper>
  );
}
const DetailWrapper = styled.div`
  margin-top: 10rem;
  margin-bottom: 5rem;
  display: flex;
  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }
  h2 {
    margin-bottom: 2rem;
  }
  li {
    font-size: 1.2rem;
    line-height: 2.5rem;
  }

  ul {
    margin-top: 2rem;
  }
`;
const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  margin-right: 2rem;
  font-weight: 600;
`;
const Info = styled.div`
  marginleft: 10rem;
`;

export default Recipe;
