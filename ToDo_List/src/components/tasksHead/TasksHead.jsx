export default function TasksBody({state,setState}) {
    return(
        <div className="mb-3 text-lg font-medium text-center  border-gray-200">
            <ul className="flex flex-wrap -mb-px">
                
                <li className="stat me-2 w-1/5 cursor-pointer"> 
                <a
                    onClick={() => setState("All")}
                    className={`${state == 'All' ? 'text-gray-700 border-gray-700 ' : 'text-gray-500 hover:text-gray-700 hover:border-gray-700 border-transparent'} rounded-t-lg inline-block p-4 border-b-2 active`}
                >
                    All
                </a>
                </li>
                <li className="stat me-2 cursor-pointer">
                <a
                    onClick={() => setState("In progress")}
                    className={`${state == 'In progress' ? 'text-blue-600 border-blue-600' : 'text-gray-500  hover:text-blue-600 hover:border-blue-600 border-transparent'} inline-block p-4 border-b-2 rounded-t-lg active `}
                    aria-current="page"
                >
                    In progress
                </a>
                </li>
                <li className="stat me-2 cursor-pointer">
                <a
                    onClick={() => setState("Completed")}
                    className={`${state == 'Completed' ? 'text-green-600 border-green-600' : 'text-gray-500 hover:text-green-600 hover:border-green-600 border-transparent'} inline-block p-4 border-b-2 rounded-t-lg active`}
                    aria-current="page"
                >
                    Completed
                </a>
                </li>
            </ul>
            
        </div>
    )
}