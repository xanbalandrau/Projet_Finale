import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Tilt from "react-parallax-tilt";

import myImg from "../../Assets/Images/avatar.svg";

const Home2 = () => {
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              LAISSEZ-MOI <span className="purple"> ME PRÉSENTER </span>
            </h1>
            <p className="home-about-body">
              Je suis tombé amoureux de la programmation et j'ai au moins appris
              quelque chose, je pense… 🤷‍♂️
              <br />
              <br />
              Je suis à l'aise avec des classiques comme
              <i>
                <b className="purple"> C++, Javascript et Go. </b>
              </i>
              <br />
              <br />
              Mes domaines d'intérêt sont la création de nouvelles&nbsp;
              <i>
                <b className="purple">technologies web et produits</b> ainsi que
                des domaines liés à <b className="purple">la Blockchain.</b>
              </i>
              <br />
              <br />
              Quand c'est possible, j'applique aussi ma passion pour le
              développement de produits avec <b className="purple">
                Node.js
              </b>{" "}
              et
              <i>
                <b className="purple">
                  {" "}
                  des bibliothèques et frameworks JavaScript modernes
                </b>
              </i>
              &nbsp; comme
              <i>
                <b className="purple"> React.js et Next.js</b>
              </i>
            </p>
          </Col>
          <Col
            md={4}
            className="myAvtar"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "auto",
              height: "100%",
            }}
          >
            <Tilt>
              <img
                src={myImg}
                className="img-fluid"
                alt="avatar"
                style={{
                  height: "auto",
                }}
              />
            </Tilt>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Home2;
