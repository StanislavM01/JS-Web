import Book from "./Book"

function BookList(props) {
    return (
        <article>
            <ul>
                <Book
                    title={props.books[0].title}
                    year={props.books[0].year}
                    author={props.books[0].author}
                />
                <Book
                    title={props.books[1].title}
                    year={props.books[1].year}
                    author={props.books[1].author}
                />
                <Book
                    title={props.books[2].title}
                    year={props.books[2].year}
                    author={props.books[2].author}
                />
            </ul>
        </article>
    )
}

export default BookList