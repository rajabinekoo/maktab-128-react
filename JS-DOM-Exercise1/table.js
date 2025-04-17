let movies = [];

// auto-increament
let id = 1;

function GenerateMovie(movieName, movieRate) {
  this.id = id;
  this.movieName = movieName;
  this.movieRate = movieRate;
  id += 1;
}

function removeMovie(id) {
  movies = movies.filter((el) => el.id !== id);
  content.innerHTML = renderTable();
}

function sortBy(field) {
  if (field !== "movieName" && field !== "movieRate")
    return alert("Invalid field");
  movies.sort((a, b) => {
    if (typeof a[field] === "string" && typeof b[field] === "string") {
      return a[field].localeCompare(b[field]);
    }
    return a[field] - b[field];
  });
  content.innerHTML = renderTable();
}

function createTableRow({ movieName, movieRate, id }) {
  return `
    <tr>
      <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">${movieName}</td>
      <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">${movieRate}</td>
      <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        <div class="flex justify-end">
          <button onclick="removeMovie(${id})" class="bg-red-400 rounded-lg px-3 py-2 text-white font-semibold text-xs hover:bg-red-500 hover:cursor-pointer">Delete</button>
        </div>
      </td>
    </tr>
  `;
}

function renderTable() {
  const rows = movies.map((el) => createTableRow(el));
  return `
    <div class="px-4 sm:px-6 lg:px-8">
      <div class="mt-8 flow-root">
        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div class="overflow-hidden shadow border border-slate-300 sm:rounded-lg">
              <table class="min-w-full divide-y divide-gray-300">
                <thead class="bg-white">
                  <tr>
                    <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      <button onclick="sortBy('movieName')" class="cursor-pointer">Name</button>
                    </th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      <button onclick="sortBy('movieRate')" class="cursor-pointer">Rate</button>
                    </th>
                    <th scope="col" class="pl-3 pr-6 py-3.5 text-right text-sm font-semibold text-gray-900">Action</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                  ${rows.join("")}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
