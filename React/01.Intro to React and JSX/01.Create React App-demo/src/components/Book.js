function Book(props) {
    return (
        <li>
            <h2>{props.title}</h2>
            <div>year:{props.year}</div>
            <div>Author:{props.author}</div>

        </li>
    )
}

export default Book