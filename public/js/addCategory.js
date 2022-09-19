//get category form
const categoryForm = document.querySelector(".category-form");

const createCategory = (category) =>
  //post new category to server
  fetch("/api/categories", {
    method: "POST",
    body: JSON.stringify(category),
    headers: {
      "Content-Type": "application/json",
    },
  });

const addCategory = async (event) => {
  //prevent submit auto default
  event.preventDefault();

  //get new category name
  const categoryName = document.getElementById("new-category").value;

  //change into object ready for use
  const newCategory = { category_name: categoryName };

  //call create category function with new category name
  createCategory(newCategory);

  //redirect to new category
  document.location.assign("/categories");
};

//add event listner on form submit button
categoryForm.addEventListener("submit", addCategory);
