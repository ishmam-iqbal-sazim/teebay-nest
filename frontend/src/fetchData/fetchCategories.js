const fetchCategories = async () => {
  const apiRes = await fetch(`http://localhost:3001/api/v1/categories`);
  if (!apiRes.ok) {
    throw new Error("Products fetch not ok");
  }
  return apiRes.json();
};

export default fetchCategories;
