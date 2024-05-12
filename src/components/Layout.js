import React from 'react'

function Layout({ children, className = "" }) {
    return (
        <div className={`w-full h-full inline-block z-0 bg-light px-32 xl:p-20 lg:p-16 md:p-12 sm:p-8${className}`}>
            {children}
        </div>
    )
}

export default Layout