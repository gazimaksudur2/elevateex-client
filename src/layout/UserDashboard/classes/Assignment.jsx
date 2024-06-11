const Assignment = ({assign}) => {
    console.log(assign);
    return (
        <>
            <tr>
                <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                    <div>
                        <h2 className="font-medium text-gray-800 ">Catalog</h2>
                    </div>
                </td>
                <td className="px-4 py-4 text-sm whitespace-nowrap">
                    <div>
                        <p className="text-gray-500">Brings all your news into one place</p>
                    </div>
                </td>
                <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
                    <div className="inline px-3 py-1 text-sm font-normal rounded-full text-emerald-500 gap-x-2 bg-emerald-100/60">
                        submitted
                    </div>
                </td>
                <td className="px-4 py-4 text-sm whitespace-nowrap">
                    20-05-2024
                </td>

                <td className="px-4 py-4 text-sm whitespace-nowrap">
                    12-06-2024
                </td>

                <td className="px-4 py-4 text-sm whitespace-nowrap">
                    <button className="btn btn-info">
                        Submit
                    </button>
                </td>
            </tr>
        </>
    );
};

export default Assignment;