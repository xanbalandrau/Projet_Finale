import React from "react";
import Card from "react-bootstrap/Card";
import "../../styles/Cards.css";

const SkillCards = (props) => {
  return (
    <Card className="project-card-view">
      <Card.Img variant="top" src={props.urlImage} alt={props.title} />
      <Card.Body>
        <Card.Title style={{ textAlign: "center" }}>{props.title}</Card.Title>
        <Card.Text style={{ textAlign: "center" }}>
          Category : {props.category} <br />
          Level : {props.level}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default SkillCards;
