import React from 'react';

function InsightsGrid() {
    return (
        <div className="grid grid-cols-4 gap-4 sm:grid-cols2 xs:grid-cols-1 md:grid-cols-2  lg:grid-cols-2">
            <div className="p-4 rounded-lg shadow-md bg-white">
                <h2 className="flex flex-col items-center text-lg font-bold mb-2 xs:text-sm sm:text-sm text-blue-700">BUSIEST DAYS & TIMES</h2>
                <ul className="list-disc pl-4 text-gray-600">
                    <li className='xs:text-sm sm:text-sm py-2'>
                        <h3 className="font-semibold xs:text-sm sm:text-sm">DAYS:</h3> Orders are Highest on weekends, Friday/Saturday evenings.
                    </li>
                    <li className='xs:text-sm sm:text-sm'>
                        <h3 className="font-semibold xs:text-sm sm:text-sm">MONTHLY:</h3> There are Maximum orders from month of July and January.
                    </li>
                </ul>
                <div className="pb-2"> </div>
            </div>
            <div className="p-4 rounded-lg shadow-md bg-white">
                <h2 className="flex flex-col items-center text-lg font-bold mb-2 text-green-700 xs:text-xs sm:text-sm">SALES PERFORMANCE</h2>
                <ul className="list-disc pl-4 text-gray-600">
                    <li className='xs:text-sm sm:text-sm  py-2'>
                        <h3 className="font-semibold xs:text-sm sm:text-sm">CATEGORY:</h3> Classic Category contributed to Maximum sales & total orders.
                    </li>
                    <li className='xs:text-sm sm:text-sm'>
                        <h3 className="font-semibold xs:text-sm sm:text-sm">SIZE Large:</h3> Size contributed to Maximum sales.
                    </li>
                </ul>
                <div className="pb-2"></div>
            </div>
            <div className="p-4 rounded-lg shadow-md bg-white">
                <h2 className="flex flex-col items-center text-lg font-bold mb-2 text-orange-700 xs:text-xs sm:text-sm">BEST SELLERS PIZZA</h2>
                <ul className="list-disc pl-4 text-gray-600">
                    <li className='xs:text-sm sm:text-sm  py-2'>
                        <h3 className="font-semibold xs:text-sm sm:text-sm">REVENUE:</h3> The Thai Chicken Pizza Contribute to maximum Revenue.
                    </li>
                    <li className='xs:text-sm sm:text-sm'>
                        <h3 className="font-semibold xs:text-sm sm:text-sm">QUANTITY:</h3> The Classic Deluxe Pizza Contributes to maximum Total Quantities.
                    </li>
                    <li className='xs:text-sm sm:text-sm  py-2'>
                        <h3 className="font-semibold xs:text-sm sm:text-sm">TOTAL ORDERS:</h3> The Classic Deluxe Pizza Contribute to maximum Total Orders.
                    </li>
                </ul>
                <div className="pb-2"></div>
            </div>
            <div className="p-4 rounded-lg shadow-md bg-white">
                <h2 className="flex flex-col items-center text-lg font-bold mb-2 text-red-700 xs:text-xs sm:text-sm">WORST SELLERS PIZZA</h2>
                <ul className="list-disc pl-4 text-gray-600">
                    <li className='xs:text-sm sm:text-sm  py-2'>
                        <h3 className="font-semibold xs:text-sm sm:text-sm">REVENUE:</h3> The Brie Carre Pizza Contribute to minimum Revenue.
                    </li>
                    <li className='xs:text-sm sm:text-sm'>
                        <h3 className="font-semibold xs:text-sm sm:text-sm">QUANTITY:</h3> The Brie Carre Pizza Contributes to minimum Total Quantities.
                    </li>
                    <li className='xs:text-sm sm:text-sm  py-2'>
                        <h3 className="font-semibold xs:text-sm sm:text-sm">TOTAL ORDERS:</h3> The Brie Carre Pizza Contribute to minimum Total Orders.
                    </li>
                </ul>

            </div>
            <div className="pb-2">
            </div>
        </div>
    );
}



export default InsightsGrid;
