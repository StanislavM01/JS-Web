var rootElement = document.getElementById('root');
var root = ReactDOM.createRoot(rootElement);

// Native React
// let reactElement = React.createElement(
//     'header',
//     {},
//     React.createElement('h1', {}, 'hello from react'),
//     React.createElement('h2', {}, 'hello world')
//     )
// 

//jsx

// run in console npx babel --watch src --out-dir build --presets react-app/prod

var reactElement = React.createElement(
    'header',
    null,
    React.createElement(
        'h1',
        null,
        'hello from JSX'
    ),
    React.createElement(
        'h2',
        null,
        'hello world'
    )
);

root.render(reactElement);