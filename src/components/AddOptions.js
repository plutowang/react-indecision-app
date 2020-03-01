import React from "react";
export default class AddOptions extends React.Component {
  // new syntax - support by `babel-plugin-transform-class-properties`
  state = {
    error: undefined
  };
  // new syntax - support by `babel-plugin-transform-class-properties`
  handleAddOption = e => {
    e.preventDefault();

    const option = e.target.elements.option.value.trim();

    const error = this.props.handleAddOption(option);

    this.setState(() => ({ error }));

    e.target.elements.option.value = "";
  };

  // constructor(props) {
  //   super(props);
  //   // old syntax
  //   // this.state = {
  //   //   error: undefined
  //   // };

  //   // old syntax
  //   // this.handleAddOption = this.handleAddOption.bind(this);
  // }

  // old syntax
  // handleAddOption(e) {
  //   e.preventDefault();

  //   const option = e.target.elements.option.value.trim();

  //   const error = this.props.handleAddOption(option);

  //   this.setState(() => ({ error }));

  //   e.target.elements.option.value = "";
  // }

  render() {
    return (
      <div>
        {this.state.error && <p className="add-option__error">{this.state.error}</p>}

        <form className="add-option" onSubmit={this.handleAddOption}>
          <input className="add-option__input" type="text" name="option" />

          <button className="button">Add Option</button>
        </form>
      </div>
    );
  }
}
