const fetchAllProducts = async (userId) => {
  const apiRes = await fetch(
    `http://localhost:3001/api/v1/users/${userId}/products/1`
  );
  if (!apiRes.ok) {
    throw new Error("Products fetch not ok");
  }
  return apiRes.json();
};

export default fetchAllProducts;
