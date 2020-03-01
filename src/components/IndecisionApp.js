import React from "react";
import AddOptions from "./AddOptions";
import Options from "./Options";
import Header from "./Header";
import Action from "./Action";
import OptionModal from "./OptionModal";
class IndecisionApp extends React.Component {
  // new sytanx
  state = {
    options: [],
    selectedOption: undefined
  };

  // new sytanx
  handleDeleteOptions = () => {
    this.setState(() => ({ options: [] }));
  };

  // new sytanx
  handleDeleteOption = option => {
    this.setState(prevState => ({
      options: prevState.options.filter(cad => cad !== option)
    }));
  };

  // new sytanx
  handlePick = () => {
    const randomNum = Math.floor(Math.random() * this.state.options.length);

    const option = this.state.options[randomNum];

    this.setState(() => ({ selectedOption: option }));
  };

  // new sytanx
  handleAddOption = option => {
    if (!option) {
      return "Enter valid value to add item";
    }
    if (this.state.options.indexOf(option) > -1) {
      return "This option already exists";
    }

    this.setState(prevState => ({ options: prevState.options.concat(option) }));
  };

  handleClearModal = () => {
    this.setState(() => ({ selectedOption: undefined }));
  };

  // constructor(props) {
  //   super(props);

  // old sytanx
  //   this.state = {
  //     options: props.options
  //   };

  // old sytanx
  //   this.handleDeleteOptions = this.handleDeleteOptions.bind(this);

  //   this.handleDeleteOption = this.handleDeleteOption.bind(this);

  //   this.handlePick = this.handlePick.bind(this);

  //   this.handleAddOption = this.handleAddOption.bind(this);
  // }

  componentDidMount() {
    try {
      const json = localStorage.getItem("options");

      const options = JSON.parse(json);

      if (options) {
        this.setState(() => ({ options }));

      }
    } catch (e) {
      // Do nothing at all
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.options.length !== this.state.length) {
      const json = JSON.stringify(this.state.options);

      localStorage.setItem("options", json);

    }
  }

  // componentWillUnmount() {
  // }

  render() {
    const title = "Indecision";

    const subtitle = "Put your life in the hands of a computer";

    return (
      <div>
        <Header title={title} subtitle={subtitle} />
        <div className="container">
          <Action
            hasOptions={this.state.options.length > 0}
            handlePick={this.handlePick}
          />

          <div className="widget">
            <Options
              options={this.state.options}
              handleDeleteOptions={this.handleDeleteOptions}
              handleDeleteOption={this.handleDeleteOption}
            />

            <AddOptions handleAddOption={this.handleAddOption} />
          </div>
        </div>

        <OptionModal
          selectedOption={this.state.selectedOption}
          handleClearModal={this.handleClearModal}
        />
      </div>
    );
  }
}

IndecisionApp.defaultProps = {
  options: []
};

export default IndecisionApp;
