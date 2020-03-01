class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddOne = this.handleAddOne.bind(this);
    this.handleMinusOne = this.handleMinusOne.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.state = {
      count: props.count
    };
  }
  componentDidMount() {
    const count = parseInt(localStorage.getItem("count"), 10);
    if (!isNaN(count)) {
      this.setState(() => ({ count }));
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.count !== this.state.count) {
      localStorage.setItem("count", this.state.count);
    }
  }
  handleAddOne() {
    // we have to access to current state values
    // via the first argument which is commonly called
    // `prevState`.
    // You also could technically name it anything you like
    this.setState(prevState => {
      return {
        count: prevState.count + 1
      };
    });
  }
  handleMinusOne() {
    this.setState(prevState => {
      return {
        count: prevState.count - 1
      };
    });
  }
  handleReset() {
    // this.setState({ count: 0 });
    // this.setState({ count: this.state.count + 1 });
    this.setState(() => {
      return { count: 0 };
    });
  }
  render() {
    return (
      <div>
        <h1>Count: {this.state.count}</h1>
        <button onClick={this.handleAddOne}>+1</button>
        <button onClick={this.handleMinusOne}>-1</button>
        <button onClick={this.handleReset}>reset</button>
      </div>
    );
  }
}
Counter.defaultProps = {
  count: 0
};

ReactDOM.render(<Counter count={0} />, document.getElementById("app"));
