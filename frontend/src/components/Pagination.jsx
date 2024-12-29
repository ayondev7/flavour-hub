import React from 'react';

const Pagination = ({ totalRecipes, recipesPerPage, currentPage, paginate }) => {
    const totalPages = Math.ceil(totalRecipes / recipesPerPage);

    // Function to generate the pagination items with ellipsis
    const renderPageNumbers = () => {
        const pages = [];
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                pages.push(1, 2, 3, '...', totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
            }
        }
        return pages;
    };

    return (
        <div className="flex justify-center mt-4 join">
            <div className="inline-flex items-center bg-hotPink text-white rounded-full mb-16 mt-5">
                <button
                    onClick={() => paginate(currentPage - 1)}
                    className={`join-item border-none btn btn-outline text-white 
                                text-sm lg:text-base 
                                ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={currentPage === 1}
                >
                    Previous page
                </button>
                {renderPageNumbers().map((number, index) => (
                    typeof number === 'string' ? (
                        <button 
                            key={index} 
                            className="join-item border-none btn btn-disabled bg-hotPink text-white text-sm lg:text-base">
                            {number}
                        </button>
                    ) : (
                        <button 
                            key={number} 
                            onClick={() => paginate(number)} 
                            className={`join-item border-none btn 
                                        ${currentPage === number ? 'bg-pink-400' : 'bg-hotPink'} 
                                        text-white text-sm lg:text-base rounded-full`}>
                            {number}
                        </button>
                    )
                ))}
                <button
                    onClick={() => paginate(currentPage + 1)}
                    className={`join-item border-none btn btn-outline text-white 
                                text-sm lg:text-base 
                                ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={currentPage === totalPages}
                >
                    Next Page
                </button>
            </div>
        </div>
    );
};

export default Pagination;
