import { useState } from "react";
import db from "../../config/db.js";

export default function Home({ data }) {
	const [showTable, setShowTable] = useState(false);
	const [inputValue, setInputValue] = useState("");
	const [filteredData, setFilteredData] = useState([]);

	const handleInputChange = (e) => {
		setInputValue(e.target.value);
	};

	const handleButtonClick = () => {
		// Filter the data based on the inputValue
		const filtered = data.filter(
			(employee) =>
				employee.LNAME.toLowerCase() === inputValue.toLowerCase()
		);
		setFilteredData(filtered);
		setShowTable(true);
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen">
			<h1 className="text-2xl font-bold mb-4">SEARCH COMPANY WEBSITE</h1>
			<div className="flex justify-center mb-6">
				<input
					type="text"
					value={inputValue}
					onChange={handleInputChange}
					className="border border-gray-300 p-2 mr-2 rounded leading-tight"
					placeholder="Enter last name"
				/>
				<button
					onClick={handleButtonClick}
					className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
				>
					Show Table
				</button>
			</div>
			{!showTable && (
				<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
					<table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
						<thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
							<tr>
								<th className="px-6 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-400 p-2">
									EMPLOYEE FIRST NAME
								</th>
								<th className="px-6 py-3 border border-gray-400 p-2">
									EMPLOYEE LAST NAME
								</th>
								<th className="px-6 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-400 p-2">
									EMPLOYEE SEX
								</th>
								<th className="px-6 py-3 border border-gray-400 p-2">
									EMPLOYEE DEPARTMENT NUMBER
								</th>
								{/* Add more headers if needed */}
							</tr>
						</thead>
						<tbody>
							<tr>
								<td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800 border border-gray-400 p-2">
									NO DATA
								</td>
								<td className=" px-6 py-4border border-gray-400 p-2">
									NO DATA
								</td>
								<td className="px-6 py-4 bg-gray-50 dark:bg-gray-800 border border-gray-400 p-2">
									NO DATA
								</td>
								<td className="px-6 py-4 border border-gray-400 p-2">
									NO DATA
								</td>
								{/* Add more data cells if needed */}
							</tr>
						</tbody>
					</table>
				</div>
			)}
			{showTable && (
				<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
					<table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
						<thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
							<tr>
								<th className="px-6 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-400 p-2">
									EMPLOYEE FIRST NAME
								</th>
								<th className="px-6 py-3 border border-gray-400 p-2">
									EMPLOYEE LAST NAME
								</th>
								<th className="px-6 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-400 p-2">
									EMPLOYEE SEX
								</th>
								<th className="px-6 py-3 border border-gray-400 p-2">
									EMPLOYEE DEPARTMENT NUMBER
								</th>
								{/* Add more headers if needed */}
							</tr>
						</thead>
						<tbody>
							{filteredData.map((employee) => (
								<tr key={employee.id}>
									<td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800 border border-gray-400 p-2">
										{employee.FNAME}
									</td>
									<td className=" px-6 py-4border border-gray-400 p-2">
										{employee.LNAME}
									</td>
									<td className="px-6 py-4 bg-gray-50 dark:bg-gray-800 border border-gray-400 p-2">
										{employee.SEX === "M"
											? "Male"
											: "Female"}
									</td>

									<td className="px-6 py-4 border border-gray-400 p-2">
										{employee.DNO}
									</td>
									{/* Add more data cells if needed */}
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
}

export async function getServerSideProps() {
	try {
		// Example query to fetch data from the database
		const query = `SELECT * FROM Employee`;
		const [rows, fields] = await db.promise().query(query);
		console.log(rows, fields);

		return {
			props: {
				data: rows,
			},
		};
	} catch (error) {
		console.error("Error fetching data:", error);
		return {
			props: {
				data: [],
			},
		};
	}
}
