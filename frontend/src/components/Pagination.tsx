export type Props = {
    page: number,
    pages: number,
    onPageChange: (page: number) => void,
};

const Pagination = ({ page, pages, onPageChange }: Props) => {
    const pageNumbers = [];
    for (let i = 1; i <= pages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="flex justify-center">
            <ul className="flex border border-gray-300 rounded-md overflow-hidden">
                {pageNumbers.map((number) => (
                    <li key={number}>
                        <button
                            className={`px-3 py-2 focus:outline-none ${page === number ? 'bg-gray-200 text-gray-800' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                            onClick={() => onPageChange(number)}
                        >
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Pagination;