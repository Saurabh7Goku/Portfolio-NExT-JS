import React from 'react';

function InsightsGrid3() {
    return (
        <div className="grid grid-cols-4 gap-4 sm:grid-cols2 xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
            <div className="p-4 rounded-lg shadow-md bg-white">
                <h2 className="flex flex-col items-center text-lg font-bold mb-2 xs:text-sm sm:text-sm text-blue-700">Overview Business Analysis</h2>
                <ul className="list-disc pl-4 text-gray-600">
                    <li className='xs:text-sm sm:text-sm py-2'>
                        <h3 className="font-semibold">Highest Revenue:</h3> Top 4 Cities having highest number of Revenue were from Tirupati, Bangalore, Pune & Raipur.
                    </li >
                    <li className='xs:text-sm sm:text-sm'>
                        <h3 className="font-semibold xs:text-sm sm:text-sm">Sales by Year:</h3> The Sales are comparetively low as compare to previous years which were like &#8377;0.41 Bn in 2018 and &#8377;0.14 Bn in 2020.
                    </li>
                    <li className='xs:text-sm sm:text-sm'>
                        <h3 className="font-semibold xs:text-sm sm:text-sm">Highest Sales Number:</h3> Top 4 Cities having highest number of sales(orders) were from Bangalore, Old Gurgaon, Gorakhpur & Gwalior.
                    </li>
                </ul>
                <div className="pb-2"> </div>
            </div>
            <div className="p-4 rounded-lg shadow-md bg-white">
                <h2 className="text-lg font-bold mb-2 text-green-700 capitalize">Use&apos;s Performances</h2>
                <ul className="list-disc pl-4 text-gray-600">
                    <li className='xs:text-sm sm:text-sm  py-2'>
                        <h3 className="font-semibold xs:text-sm sm:text-sm capitalize">User&apos;s Activity:</h3> Total weekly active users currently are 78K producting 301K orders per week.
                    </li>
                    <li className='xs:text-sm sm:text-sm'>
                        <h3 className="font-semibold xs:text-sm sm:text-sm capitalize">Customer Counts:</h3> The rate of gaining users is 12K which is very low as compared to losing users which is 33K.
                    </li>
                    <li className='xs:text-sm sm:text-sm'>
                        <h3 className="font-semibold xs:text-sm sm:text-sm capitalize">Customers by Age:</h3> Zomato has majority of its users from age group of 20 years to 30 years.
                    </li>
                </ul>
                <div className="pb-2"> </div>
            </div>
            <div className="p-4 rounded-lg shadow-md bg-white">
                <h2 className="text-lg font-bold mb-2 text-orange-700 capitalize">User&apos;s Involvment</h2>
                <ul className="list-disc pl-4 text-gray-600">
                    <li className='xs:text-sm sm:text-sm  py-2'>
                        <h3 className="font-semibold xs:text-sm sm:text-sm capitalize">Category:</h3> The User&apos;s are divided into 4 categories Student, Employee, Self Employee and House Wifes, where Student shares the majority of Orders by 52.6%.
                    </li>
                    <li className='xs:text-sm sm:text-sm'>
                        <h3 className="font-semibold xs:text-sm sm:text-sm capitalize">Gender Specific</h3> Males has more orders and contribution on Sales Price with 171.85 K Orders & around &#8377;120 M spending, where females are with 128.71 K Orders & around &#8377;88 M spending.
                    </li>
                </ul>
                <div className="pb-2"> </div>
            </div>
            <div className="p-4 rounded-lg shadow-md bg-white">
                <h2 className="text-lg font-bold mb-2 text-red-700 capitalize">Miscellaneous</h2>
                <ul className="list-disc pl-4 text-gray-600">
                    <li className='xs:text-sm sm:text-sm  py-2'>
                        <h3 className="font-semibold xs:text-sm sm:text-sm capitalize">Famous Cuisines</h3> Most Selling Food Items Cusines are from North Indian Chinese, Indian Chinese and North Indian.
                    </li>
                    <li className='xs:text-sm sm:text-sm'>
                        <h3 className="font-semibold xs:text-sm sm:text-sm capitalize">Highest Selling</h3> The Cusines with highest selling is North Indian Chinese Cuisine with Sales Price around &#8377;15 M.
                    </li>
                    <li className='xs:text-sm sm:text-sm  py-2'>
                        <h3 className="font-semibold xs:text-sm sm:text-sm capitalize">Business Growth</h3> The Zomato Business took a toll from 2018 to 2020 where its order value and sale price both decreases as compared to 2018 and 2019 lossing 75% of sales value.
                    </li>
                </ul>

            </div>
            <div className="pb-2"> {/* Added bottom padding */} </div>
        </div>
    );
}

export default InsightsGrid3;