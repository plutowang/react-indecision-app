import React from "react";
import ReactDOM from "react-dom";

class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: props.options
    };

    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);

    this.handleDeleteOption = this.handleDeleteOption.bind(this);

    this.handlePick = this.handlePick.bind(this);

    this.handleAddOption = this.handleAddOption.bind(this);
  }

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

  componentWillUnmount() {
  }

  handleDeleteOptions() {
    this.setState(() => ({ options: [] }));
  }

  handleDeleteOption(option) {
    this.setState(prevState => ({
      options: prevState.options.filter(cad => cad !== option)
    }));
  }

  handlePick() {
    const randomNum = Math.floor(Math.random() * this.state.options.length);

    const option = this.state.options[randomNum];

    alert(option);
  }

  handleAddOption(option) {
    if (!option) {
      return "Enter valid value to add item";
    }
    if (this.state.options.indexOf(option) > -1) {
      return "This option already exists";
    }

    this.setState(prevState => ({ options: prevState.options.concat(option) }));
  }

  render() {
    const title = "Indecision";

    const subtitle = "Put your life in the hands of a computer";

    return (
      <div>
        <Header title={title} subtitle={subtitle} />

        <Action
          hasOptions={this.state.options.length > 0}
          handlePick={this.handlePick}
        />

        <Options
          options={this.state.options}
          handleDeleteOptions={this.handleDeleteOptions}
          handleDeleteOption={this.handleDeleteOption}
        />

        <AddOptions handleAddOption={this.handleAddOption} />
      </div>
    );
  }
}

IndecisionApp.defaultProps = {
  options: []
};

const Header = props => (
  <div>
    <h1>{props.title}</h1>

    {props.subtitle && <h2>{props.subtitle}</h2>}
  </div>
);

Header.defaultProps = {
  title: "Indecision"
};

const Action = props => (
  <div>
    <button disabled={!props.hasOptions} onClick={props.handlePick}>
      What should I do?
    </button>
  </div>
);

const Options = props => (
  <div>
    <button onClick={props.handleDeleteOptions}>Remove All</button>

    {props.options.length === 0 && <p>Please add an option to get started!</p>}

    {props.options.map((option, index) => (
      <Option
        key={index}
        option={option}
        index={index + 1}
        handleDeleteOption={props.handleDeleteOption}
      />
    ))}
  </div>
);

const Option = props => (
  <div>
    <p>
      Option {props.index}: {props.option}
      <button
        onClick={() => {
          props.handleDeleteOption(props.option);
        }}
      >
        Remove
      </button>
    </p>
  </div>
);

class AddOptions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: undefined
    };

    this.handleAddOption = this.handleAddOption.bind(this);
  }

  handleAddOption(e) {
    e.preventDefault();

    const option = e.target.elements.option.value.trim();

    const error = this.props.handleAddOption(option);

    this.setState(() => ({ error }));

    e.target.elements.option.value = "";
  }

  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}

        <form onSubmit={this.handleAddOption}>
          <input type="text" name="option" />

          <button>Add Option</button>
        </form>
      </div>
    );
  }
}

ReactDOM.render(<IndecisionApp options={["YES", "NO"]} />, document.getElementById("app"));
