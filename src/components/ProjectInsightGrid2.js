import React from 'react';

function InsightsGrid2() {
    return (
        <div className="grid grid-cols-4 gap-4 sm:grid-cols2 xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
            <div className="p-4 rounded-lg shadow-md bg-white">
                <h2 className="flex flex-col items-center text-lg font-bold mb-2 xs:text-sm sm:text-sm text-blue-700">Sum of Amount analysis</h2>
                <ul className="list-disc pl-4 text-gray-600">
                    <li className='xs:text-sm sm:text-sm py-2'>
                        <h3 className="font-semibold">SUM:</h3> Overall Sum of Amount is currently at $161,288.
                    </li >
                    <li className='xs:text-sm sm:text-sm'>
                        <h3 className="font-semibold xs:text-sm sm:text-sm">Highest Amount:</h3> Sum of Amount for Order ID B-26055 and other segments are significantly higher that others.
                    </li>
                </ul>
                <div className="pb-2"> </div>
            </div>
            <div className="p-4 rounded-lg shadow-md bg-white">
                <h2 className="text-lg font-bold mb-2 text-green-700 capitalize">Sum Of Quantity Analysis</h2>
                <ul className="list-disc pl-4 text-gray-600">
                    <li className='xs:text-sm sm:text-sm  py-2'>
                        <h3 className="font-semibold xs:text-sm sm:text-sm capitalize">Ouantity:</h3> Overall Sum Of Quantity is currently at 2008 Units.
                    </li>
                    <li className='xs:text-sm sm:text-sm'>
                        <h3 className="font-semibold xs:text-sm sm:text-sm capitalize">Highest Quantity Segment:</h3> Sum Of Quantity for Order-ID B-26055 and other segments are significantly higer than others.
                    </li>
                </ul>
                <div className="pb-2"> </div>
            </div>
            <div className="p-4 rounded-lg shadow-md bg-white">
                <h2 className="text-lg font-bold mb-2 text-orange-700 capitalize">Sum Of Profit Analysis</h2>
                <ul className="list-disc pl-4 text-gray-600">
                    <li className='xs:text-sm sm:text-sm  py-2'>
                        <h3 className="font-semibold xs:text-sm sm:text-sm capitalize">Overall:</h3> Overall Sum Of Profit is currently as $25,942.
                    </li>
                    <li className='xs:text-sm sm:text-sm'>
                        <h3 className="font-semibold xs:text-sm sm:text-sm capitalize">Less Profit Segment</h3> Sum of Profit for Order-ID B-26097 is significantly lower than other segments.
                    </li>
                    <li className='xs:text-sm sm:text-sm  py-2'>
                        <h3 className="font-semibold xs:text-sm sm:text-sm capitalize">High Profit Segment:</h3> Sum of Profit for Order-ID B-25973 and 16 other segments is significantly Higher.
                    </li>
                </ul>
                <div className="pb-2"> </div>
            </div>
            <div className="p-4 rounded-lg shadow-md bg-white">
                <h2 className="text-lg font-bold mb-2 text-red-700 capitalize">Customer & City</h2>
                <ul className="list-disc pl-4 text-gray-600">
                    <li className='xs:text-sm sm:text-sm  py-2'>
                        <h3 className="font-semibold xs:text-sm sm:text-sm capitalize">Economic growth</h3> Sum of Profit is greater in city Indore and Pune than other cities.
                    </li>
                    <li className='xs:text-sm sm:text-sm'>
                        <h3 className="font-semibold xs:text-sm sm:text-sm capitalize">Best Quarter</h3> Sum of Profit is can be seen more in the first Quarter(qtr1).
                    </li>
                    <li className='xs:text-sm sm:text-sm  py-2'>
                        <h3 className="font-semibold xs:text-sm sm:text-sm capitalize">High Profitable Sub-Categories</h3> Sum of Profit by Sub-Category is high on Printers and Bookcase Sales.
                    </li>
                </ul>

            </div>
            <div className="pb-2"> {/* Added bottom padding */} </div>
        </div>
    );
}

export default InsightsGrid2;