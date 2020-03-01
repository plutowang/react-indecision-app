class VisibilityToggle extends React.Component {
  constructor(props) {
    super(props);
    this.handleToggleVisibility = this.handleToggleVisibility.bind(this);
    this.state = {
      visibility: false
    };
  }
  handleToggleVisibility() {
    this.setState(prevState => {
      return {
        visibility: !prevState.visibility
      };
    });
    console.log("handleToggleVisibility");
  }
  render() {
    return (
      <div>
        <h1>Visibility Toggle</h1>
        <button onClick={this.handleToggleVisibility}>
          {this.state.visibility ? "Hide detials" : "Show"}
        </button>
        {this.state.visibility && (
          <div>
            <p>Hey. These are some details you can now see!</p>
          </div>
        )}
      </div>
    );
  }
}

ReactDOM.render(<VisibilityToggle />, document.getElementById("app"));

// let isShown = false;
// const onShown = () => {
//   isShown = !isShown;
//   render();
// };
// const showDetails = () => {
//   if (isShown) {
//     return <p>Hey. These are some details you can now see!</p>;
//   }
// };
// const appRoot = document.getElementById("app");
// const render = () => {
//   const toggleTemplate = (
//     <div>
//       <h1>Visibility Toggle</h1>
//       <button onClick={onShown}>{isShown ? "Hide detials" : "Show"}</button>
//       {/* optiton1: {showDetails()} */}
//       {isShown && (
//         <div>
//           <p>Hey. These are some details you can now see!</p>
//         </div>
//       )}
//     </div>
//   );
//   ReactDOM.render(toggleTemplate, appRoot);
// };
// render();
