import { Link } from "react-router";

function Pagination({currentPage, totalPages}) {
    
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }

    return (
        <div className="flex justify-center mt-10">

            <ol className="flex justify-center gap-1 text-xs font-medium">
                
                <li>
                    <Link
                        to={ currentPage > 1 ? `?page=${currentPage - 1}` : `?page=${currentPage}` }
                        className="inline-flex size-8 items-center justify-center rounded-sm border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
                    >
                        <span className="sr-only">Prev Page</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="size-3"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </Link>
                </li>

                {
                    pages.map((page) => (
                        <li key={page}>
                            <Link
                                to={`?page=${page}`}
                                className={`block size-8 rounded-sm border text-center leading-8 ${currentPage == page ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-100 bg-white text-gray-900'}`}
                            >
                                {page}
                            </Link>
                        </li>
                    ))
                }

                <li>
                    <Link
                        to={ currentPage < totalPages ? `?page=${parseInt(currentPage) + 1}` : `?page=${currentPage}` }
                        className="inline-flex size-8 items-center justify-center rounded-sm border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
                    >
                        <span className="sr-only">Next Page</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="size-3"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </Link>
                </li>
            </ol>
        </div>
    )
}

export default Pagination
