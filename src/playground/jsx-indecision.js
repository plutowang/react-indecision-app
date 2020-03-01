console.log("app.js is running");

// Create app object title/subtitle
const app = {
  title: "Indecision App",
  subtitle: "Put your lift in the hands of a computer",
  options: []
};
const getSubtitle = subtitle => {
  if (subtitle) {
    return <p>{subtitle}</p>;
  }
};
const getOptions = options => {
  if (options.length > 0) {
    return (
      <div>
        <p>Here are your options</p>
        <ol>{listOptions()}</ol>
      </div>
    );
  } else {
    return <p>No options</p>;
  }
};

const onFormSubmit = e => {
  // e object contain various info about the events and for forms.

  // prevent that default behavior that full page refresh
  e.preventDefault();

  // e.target point to the element that the event started on
  // in this case the target for the event was the form
  // e.target.elements contains a list of all of the elements
  // and they are indexed by name (i.e. "option" here)
  // we're just going to use value to get that value
  const option = e.target.elements.option.value;

  if (option) {
    app.options.push(option);
    e.target.elements.option.value = "";
  }
  render();
  console.log(app.options);
};

const onRemoveAll = () => {
  if (app.options.length > 0) {
    app.options = [];
    render();
  }
};

const listOptions = () =>
  app.options.map((option, index) => <li key={index}>{option}</li>);

const onMakeDecision = () => {
  const randomNum = Math.floor(Math.random() * app.options.length);
  const option = app.options[randomNum];
  alert(option);
};

let appRoot = document.getElementById("app");

const render = () => {
  const template = (
    <div>
      <h1>{app.title}</h1>
      {app && app.subtitle && <p>{app.subtitle}</p>}
      <p>This is info</p>
      <button disabled={app.options.length === 0} onClick={onMakeDecision}>
        What should I do?
      </button>
      <button onClick={onRemoveAll}>Remove All</button>
      {getOptions(app.options)}
      <form onSubmit={onFormSubmit}>
        <input type="text" name="option" />
        <button>Add Option</button>
      </form>
    </div>
  );
  ReactDOM.render(template, appRoot);
};

render();
