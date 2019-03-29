import React, { Component } from "react";

import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";

class Dish extends Component {
  renderAllDish(dish) {
    return (
      <Card width="100%">
        <CardImg top src={dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    );
  }

  renderAllComments(comments) {
    return (
      <ul>
        {comments.map(comment => {
          return (
            <li key={comment.id}>
              <div>{comment.comment}</div>
       
              <div>
                 {"-"}{comment.author} {} {comment.date}
              </div>
            </li>
          );
        })}
      </ul>
    );
  }

  render() {
    const dish = this.props.dish;

    return (
      <div class="row">
        <div className="col-12 col-md-5 m-1">{this.renderAllDish(dish)}</div>
        <div className="col-12 col-md-5 m-1">
          <h4>Comments</h4>
          {this.renderAllComments(dish.comments)}
        </div>
      </div>
    );
  }
}

export default Dish;
