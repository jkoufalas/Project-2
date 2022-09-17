const categoryForm = document.querySelector(".category-form");

const createCategory = (category) =>
  fetch("/api/categories", {
    method: "POST",
    body: JSON.stringify(category),
    headers: {
      "Content-Type": "application/json",
    },
  });

const addCategory = async (event) => {
  event.preventDefault();

  console.log("1----------------------------------------`");

  const categoryName = document.getElementById("new-category").value;

  const newCategory = { category_name: categoryName };

  createCategory(newCategory);

  console.log(newCategory);
};

categoryForm.addEventListener("submit", addCategory);
