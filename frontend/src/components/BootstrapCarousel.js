import React, { Component } from "react";
import Carousel from "react-bootstrap/Carousel";

export class BootstrapCarousel extends Component {
  render() {
    return (
      <div>
        <div className="box">
          <div className="container-fluid">
            <Carousel interval={900} keyboard={false} pauseOnHover={true}>
              <Carousel.Item className="carousel box">
                <img
                  className="d-block w-100 carousel"
                  src={require("../images/land1.jpg")}
                />
              </Carousel.Item>
              <Carousel.Item className="carousel">
                <img
                  className="d-block w-100 carousel"
                  src={require("../images/land2.jpg")}
                />
              </Carousel.Item>
              <Carousel.Item className="carousel">
                <img
                  className="d-block w-100 carousel"
                  src={require("../images/land5.jpg")}
                />
              </Carousel.Item>

              <Carousel.Item className="carousel">
                <img
                  className="d-block w-100 carousel"
                  src={require("../images/land4.jpg")}
                />
              </Carousel.Item>

              <Carousel.Item className="carousel">
                <img
                  className="d-block w-100 carousel"
                  src={require("../images/land3.jpg")}
                />
              </Carousel.Item>
              <Carousel.Item className="carousel">
                <img
                  className="d-block w-100 carousel"
                  src={require("../images/land6.jpg")}
                />
              </Carousel.Item>
              <Carousel.Item className="carousel">
                <img
                  className="d-block w-100 carousel"
                  src={require("../images/land7.jpg")}
                />
              </Carousel.Item>
            </Carousel>
          </div>
          <div class="text">
            <div>
              <p>
                Hire the best freelancers for any job, online. Find your job
                with "in a couple of clicks"
              </p>
              <h1>
                Millions of people use JobHunter to turn their ideas into
                reality
              </h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default BootstrapCarousel;
