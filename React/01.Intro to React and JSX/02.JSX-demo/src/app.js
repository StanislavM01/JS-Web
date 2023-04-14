let rootElement = document.getElementById('root')
let root = ReactDOM.createRoot(rootElement)


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

let reactElement = (
    <header>
        <h1>hello from JSX</h1>
        <h2>hello world</h2>
    </header>
)

root.render(reactElement)