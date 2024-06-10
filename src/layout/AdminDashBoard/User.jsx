const User = ({ user }) => {
    return (
        <>
            <tr>
                <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                    <div className="inline-flex items-center gap-x-3">
                        <input type="checkbox" className="text-blue-500 border-gray-300 rounded" />

                        <span>#1555</span>
                    </div>
                </td>
                <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">Jan 6, 2022</td>
                <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                    <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>

                        <h2 className="text-sm font-normal">Paid</h2>
                    </div>
                </td>
                <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                    <div className="flex items-center gap-x-2">
                        <img className="object-cover w-8 h-8 rounded-full" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt="" />
                        <div>
                            <h2 className="text-sm font-medium text-gray-800 ">Arthur Melo</h2>
                            <p className="text-xs font-normal text-gray-600 ">authurmelo@example.com</p>
                        </div>
                    </div>
                </td>
                <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">Monthly subscription</td>
                <td className="px-4 py-4 text-sm whitespace-nowrap">
                    <div className="flex items-center gap-x-6">
                        <button className="text-gray-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none">
                            Archive
                        </button>

                        <button className="text-blue-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none">
                            Download
                        </button>
                    </div>
                </td>
            </tr>
        </>
    );
};

export default User;