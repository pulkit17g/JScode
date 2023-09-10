const itemsPerPage = 5;
let currentPage = 1;
let filteredUsers = [];

// Simulated user data fetch function (meant to represent an API call)
function fetchUsers(callback) {
  // Simulated asynchronous delay
  setTimeout(() => {
    // Mock user data
    callback([
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ]);
  }, 1000);
}

// Function to display users on the current page
function displayUsers(users) {
  // Get the container for user list
  const userListDiv = document.querySelector('#usersList');
  userListDiv.innerHTML = '';

  // Calculate the range of users to display on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedUsers = filteredUsers.slice(startIndex, endIndex);

  // Create and append user elements to the user list container
  displayedUsers.forEach((user) => {
    const userDiv = document.createElement('div');
    userDiv.innerHTML = `${user.name} <button class="delete-button" data-id="${user.id}">Delete</button>`;
    userListDiv.appendChild(userDiv);
  });

  // Update pagination controls
  updatePagination();
}

// Function to update pagination controls
function updatePagination() {
  const paginationDiv = document.querySelector('#pagination');
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  paginationDiv.innerHTML = '';

  // Create buttons for "Previous" and "Next"
  const prevButton = document.createElement('button');
  prevButton.textContent = 'Previous';
  prevButton.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      displayUsers(filteredUsers);
    }
  });
  paginationDiv.appendChild(prevButton);

  // Create buttons for each page
  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement('button');
    pageButton.textContent = i;
    pageButton.addEventListener('click', () => {
      currentPage = i;
      displayUsers(filteredUsers);
    });
    paginationDiv.appendChild(pageButton);
  }

  // Create "Next" button
  const nextButton = document.createElement('button');
  nextButton.textContent = 'Next';
  nextButton.addEventListener('click', () => {
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      displayUsers(filteredUsers);
    }
  });
  paginationDiv.appendChild(nextButton);
}

// Function to add a new user to the filtered user list
function addNewUser(name) {
  const newUser = {
    id: filteredUsers.length + 1,
    name: name,
  };
  filteredUsers.push(newUser);
  displayUsers(filteredUsers);
}

// Function to delete a user from the filtered user list
function deleteUser(id) {
  filteredUsers = filteredUsers.filter((user) => user.id !== id);
  displayUsers(filteredUsers);
}

// Function to search users by name
function searchUsers(query) {
  filteredUsers = query
    ? filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(query.toLowerCase())
      )
    : [...users]; // Reset to the original user list if the query is empty
  currentPage = 1;
  displayUsers(filteredUsers);
}

// Event listeners for user actions
const addUserForm = document.querySelector('#addUserForm');
const searchUserInput = document.querySelector('#searchUser');

addUserForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const newUserName = document.querySelector('#newUserName').value;
  addNewUser(newUserName);
  document.querySelector('#newUserName').value = '';
});

searchUserInput.addEventListener('input', () => {
  const searchQuery = searchUserInput.value.trim();
  searchUsers(searchQuery);
});

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-button')) {
    const userId = parseInt(e.target.getAttribute('data-id'));
    deleteUser(userId);
  }
});

// Initial data retrieval and display
const usersList = document.querySelector('#usersList');
fetchUsers((users) => {
  filteredUsers = users;
  displayUsers(filteredUsers);
});
