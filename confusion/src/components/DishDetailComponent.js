import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody
} from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Link } from "react-router-dom";

const required = val => val && val.length;
const maxLength = len => val => !val || val.length <= len;
const minLength = len => val => val && val.length >= len;

class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.toggleModal = this.toggleModal.bind(this);
    this.state = {
      isModalOpen: false
    };
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  handleSubmit(values) {
    this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
  }

  render() {
    return (
      <div>
        <Button onClick={this.toggleModal} className="fa fa-comments fa-lg">
          {" "}
          Submit Comments
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}> Write Comments</ModalHeader>
          <ModalBody>
            <div className="container">
              <LocalForm onSubmit={values => this.handleSubmit(values)} toggle={this.toggleModal}>
                <label htmlFor="rating" md={2}>
                  Rating
                </label>

                <div>
                  <Control.select model=".rating" id="rating" name="rating">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </Control.select>
                </div>
                <br />
                <div class="form-group">
                  <label htmlFor="author" md={2}>
                    Your Name
                  </label>

                  <Control.text
                    model=".author"
                    id="author"
                    name="author"
                    className="form-control"
                    validators={{
                      required,
                      minLength: minLength(3),
                      maxLength: maxLength(15)
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".author"
                    show="touched"
                    messages={{
                      required: "Required",
                      minLength: "Must be greater than 2 characters",
                      maxLength: "Must be 15 characters or less"
                    }}
                  />
                </div>
                <div class="form-group">
                  <label htmlFor="comment" md={2}>
                    Your Comment
                  </label>
                  <Control.textarea model=".comment" id="comment" name="comment" className="form-control" />
                </div>
                <div class="form-group">
                  <Button type="submit" value="submit" color="primary">
                    Submit
                  </Button>
                </div>
              </LocalForm>
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

function RenderDish({ dish }) {
  if (dish != null)
    return (
      <Card width="100%">
        <CardImg src={dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    );
  else return <div />;
}

function RenderComments({ comments }) {
  if (comments != null)
    return (
      <div>
        <h3> Comments</h3>
        <ul>
          {comments.map(comment => {
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
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/menu">Menu</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>{props.dish.name}</h3>
          <hr />
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-5 m-1">
          <RenderDish dish={props.dish} />
        </div>
        <div className="col-12 col-md-5 m-1">
          <RenderComments comments={props.comments} addComment={props.addComment}  dishId={props.dish.id} />
          <CommentForm comments={props.comments} addComment={props.addComment} dishId={props.dish.id} />
        </div>
      </div>
    </div>
  );
};

export default DishDetail;
