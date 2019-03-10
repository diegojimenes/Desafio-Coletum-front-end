import { Form, Row, Container, Col, Button } from "react-bootstrap";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { StyleSheet, css } from "aphrodite";
import StarRatings from "react-star-ratings";
import DatePicker from "react-date-picker";

import { get_Forms } from "./redux/actions/forms";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.get_Forms();
  }

  renderInputs() {
    return this.props.inputs.map(({ label, componentId, type, helpBlock }) => {
      switch (type) {
        case "textfield":
          return this.inputComum(label, componentId, helpBlock, "text");

        case "datefield":
          return this.inputDate(label, componentId, helpBlock);

        case "ratingfield":
          return this.inputRating(label, componentId, helpBlock);

        case "urlfield":
          return this.inputComum(label, componentId, helpBlock, "url");

        default:
          console.log("Input não encontrado");
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const formData = {};
    for (const field in this.refs) {
      formData[field] = this.refs[field].value;
    }
    console.table(formData);
  }

  inputComum(label, componentId, helpBlock, type) {
    return (
      <Form.Group key={componentId}>
        <div className={css(styles.inputContainer)}>
          <Form.Label className={css(styles.label)}>{label} </Form.Label>
          <Form.Control
            className={css(styles.input)}
            type={type}
            placeholder={label}
            name={componentId}
            ref={componentId}
          />
        </div>
        <Form.Text className={css(styles.help)}>{helpBlock}</Form.Text>
      </Form.Group>
    );
  }

  inputRating(label, componentId, helpBlock) {
    return (
      <Fragment key={componentId}>
        <div className={css(styles.inputContainer)}>
          <Form.Label className={css(styles.label)}>{label} </Form.Label>
          <StarRatings
            rating={this.state[componentId]}
            starDimension="30px"
            starSpacing="10px"
            starRatedColor="#3a3a3a"
            starHoverColor="#8a8a8a"
            changeRating={s => this.setState({ [componentId]: s })}
            numberOfStars={5}
            name="rating"
          />
        </div>
        <Form.Text className={css(styles.help)}>{helpBlock}</Form.Text>
        <input
          type="number"
          ref={componentId}
          value={this.state[componentId]}
          name={componentId}
          style={{ display: "none" }}
        />
      </Fragment>
    );
  }

  inputDate(label, componentId, helpBlock) {
    return (
      <Fragment key={componentId}>
        <Form.Group>
          <div className={css(styles.inputContainer)}>
            <Form.Label className={css(styles.label)}>{label} </Form.Label>
            <DatePicker
              className={css(styles.date)}
              onChange={s => this.setState({ [componentId]: s })}
              value={this.state[componentId]}
            />
          </div>
          <Form.Text className={css(styles.help)}>{helpBlock}</Form.Text>
        </Form.Group>
        <input
          type="text"
          ref={componentId}
          value={this.state[componentId]}
          name={componentId}
          style={{ display: "none" }}
        />
      </Fragment>
    );
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <div className="App">
              <header className={css(styles.header)}>
                <h1>Cadastro de Pokémon</h1>
              </header>
              <hr />
              <form onSubmit={this.handleSubmit}>
                {this.renderInputs()}
                <Button
                  variant="dark"
                  type="submit"
                  className={css(styles.submit)}
                >
                  Enviar
                </Button>
                <hr />
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 50,
    paddingBottom: 10
  },
  inputContainer: {
    display: "flex",
    flexdirection: "row",
    textAlign: "right",
    "@media (max-width: 500px)": {
      display: "block",
      textAlign: "left"
    }
  },
  input: {
    width: "50%",
    "@media (max-width: 500px)": {
      width: "100%"
    }
  },
  label: {
    width: 200,
    marginRight: 30,
    "@media (max-width: 500px)": {
      width: "auto",
      marginRight: 10
    }
  },
  help: {
    marginLeft: 230,
    marginBottom: 10,
    "@media (max-width: 500px)": {
      marginLeft: 0
    }
  },
  submit: {
    marginLeft: 230,
    "@media (max-width: 500px)": {
      marginLeft: 0
    }
  },
  date: {
    width: "50%"
  }
});

const mapStateToProps = state => {
  return {
    inputs: state.form.inputs
  };
};

export default connect(
  mapStateToProps,
  { get_Forms }
)(App);
