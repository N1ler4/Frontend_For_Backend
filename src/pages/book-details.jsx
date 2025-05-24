import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useBooksStore from "../store/library";

const BookDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getBookById } = useBooksStore();
    const [book, setBook] = useState(null);

    const fetchBooks = async () => {
        const fetchedBook = await getBookById(id);
        setBook(fetchedBook);
    };

    useEffect(() => {
        fetchBooks();
    }, [id]);

    if (!book) {
        return <p className="text-center text-gray-500 mt-10">Книга не найдена...</p>;
    }

    return (
        <div className="flex justify-center items-center" style={{ minHeight: "calc(100% - 100px)", backgroundColor: "#f3f4f6" }}>
            <div className="bg-white shadow-lg rounded-lg p-6 w-96">
                <h1 className="text-2xl font-bold mb-4 text-center">{book.title}</h1>
                <p className="text-gray-700 mb-2">
                    <strong>Автор:</strong> {book.author}
                </p>
                <p className="text-gray-700 mb-2">
                    <strong>Жанр:</strong> {book.genre}
                </p>
                <p className="text-gray-700 mb-4">
                    <strong>Год публикации:</strong> {book.published_year}
                </p>
                <button
                    onClick={() => navigate("/main/library")}
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                >
                    Назад к списку
                </button>
            </div>
        </div>
    );
};

export default BookDetails;
