import React from "react";

import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";

function RenderDish({ dish }) {
  if (dish != null)
    return (
      <div className="col-12 col-md-5 m-1">
        <Card width="100%">
          <CardImg src={dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      </div>
    );
  else return <div />;
}

function RenderComments({ comments }) {
  if (comments != null)
    return (
      <div className="col-12 col-md-5 m-1">
        <h3> Comments</h3>
        <ul>
          {comments.comments.map(comment => {
            return (
              <li key={comment.id}>
                <div>{comment.comment}</div>
                <div>
                  {"-"}
                  {comment.author} {","}{" "}
                  {new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit"
                  }).format(new Date(Date.parse(comment.date)))}
                </div>
                <br />
              </li>
            );
          })}
        </ul>
      </div>
    );
  else return <div />;
}

const DishDetail = props => {
  return (
    <div className="container">
      <div className="row">
        <RenderDish dish={props.dish} />
        <RenderComments comments={props.dish} />
      </div>
    </div>
  );
};

export default DishDetail;
