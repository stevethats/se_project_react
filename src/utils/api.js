const baseUrl = "http://localhost:3001";
// run this to use local database:
// json-server --watch db.json --id _id --port 3001

function getItems() {
  return fetch(`${baseUrl}/items`).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
}

function createClothingCard(item) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  }).catch(console.error);
}

function deleteClothingCard(id) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  }).catch(console.error);
}

export { getItems, createClothingCard, deleteClothingCard };
