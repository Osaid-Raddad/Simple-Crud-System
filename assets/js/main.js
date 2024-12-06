const name = document.querySelector("#courseName");
const category = document.querySelector("#courseCategory");
const price = document.querySelector("#coursePrice");
const description = document.querySelector("#courseDescription");
const capacity = document.querySelector("#courseCapacity");

const invalidNameM = document.querySelector(".invalid-nameM");
const invalidCategoryM = document.querySelector(".invalid-categoryM");
const invalidPriceM = document.querySelector(".invalid-priceM");
const invaliddescriptionM = document.querySelector(".invalid-descriptionM");
const invalidCapacityM = document.querySelector(".invalid-capacityM");

const nameModal = document.querySelector("#courseNameM");
const categoryModal = document.querySelector("#courseCategoryM");
const priceModal = document.querySelector("#coursePriceM");
const descriptionModal = document.querySelector("#courseDescriptionM");
const capacityModal = document.querySelector("#courseCapacityM");


const invalidName = document.querySelector(".invalid-name");
const invalidCategory = document.querySelector(".invalid-category");
const invalidPrice = document.querySelector(".invalid-price");
const invaliddescription = document.querySelector(".invalid-description");
const invalidCapacity = document.querySelector(".invalid-capacity");

const addbtn = document.querySelector("#click");
const deleteAllBtn = document.querySelector("#deleteBtn");
const search = document.querySelector("#search");
const save = document.querySelector(".save");
let courses = [];

if (localStorage.getItem("courses") != null) {
    courses = JSON.parse(localStorage.getItem("courses"));
    displayCourses();
}

addbtn.addEventListener("click", (e) => {

    e.preventDefault();
    let isValid = true;
    const namePattern = /^[A-Z][a-z]{2,10}[0-9]{0,2}$/;

    if (!namePattern.test(name.value)) {
        invalidName.innerHTML = "invalid name, you must star with a capital letter and contain 2-10 small letters";
        name.classList.add("is-invalid");
        isValid = false;
    } else {
        invalidName.innerHTML = "";
        name.classList.remove("is-invalid");
        name.classList.add("is-valid");
    }

    const categoryPattern = /^[A-Z][a-z]{2,3}$/;

    if (!categoryPattern.test(category.value)) {
        invalidCategory.innerHTML = "invalid category, you must star with a capital letter and contain 2-3 small letters";
        category.classList.add("is-invalid");
        isValid = false;
    } else {
        invalidCategory.innerHTML = "";
        category.classList.remove("is-invalid");
        category.classList.add("is-valid");
    }

    const pricePattern = /^([1-9]$|[1-9][0-9]$|[1-9][0-9]{2}$|1000$)$/;

    if (!pricePattern.test(price.value)) {
        invalidPrice.innerHTML = "invalid price, The price start from 1 to 1k dollar";
        price.classList.add("is-invalid");
        isValid = false;
    } else {
        invalidPrice.innerHTML = "";
        price.classList.remove("is-invalid");
        price.classList.add("is-valid");
    }

    const descriptionPattern = /^[A-Z][^0-9]*$/;

    if (!descriptionPattern.test(description.value)) {
        invaliddescription.innerHTML = "invalid Description, The description must start with capital letter and must not contain numbers ";
        description.classList.add("is-invalid");
        isValid = false;
    } else {
        invaliddescription.innerHTML = "";
        description.classList.remove("is-invalid");
        description.classList.add("is-valid");
    }

    const capacityPattern = /^(100|[1-9][0-9]?|0[1-9])$/;

    if (!capacityPattern.test(capacity.value)) {
        invalidCapacity.innerHTML = "invalid Capacity, The capacity be numbers only and between 1-100";
        capacity.classList.add("is-invalid");
        isValid = false;
    } else {
        invalidCapacity.innerHTML = "";
        capacity.classList.remove("is-invalid");
        capacity.classList.add("is-valid");
    }



    if (isValid) {
        course = {
            name: name.value,
            category: category.value,
            price: price.value,
            description: description.value,
            capacity: capacity.value
        }

        courses.push(course);
        localStorage.setItem("courses", JSON.stringify(courses));
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });
        Toast.fire({
            icon: "success",
            title: "Course Added Successfully"
        });

        displayCourses();
        name.value = "";
        category.value = "";
        price.value = "";
        description.value = "";
        capacity.value = "";
        name.classList.remove("is-valid");
        category.classList.remove("is-valid");
        price.classList.remove("is-valid");
        description.classList.remove("is-valid");
        capacity.classList.remove("is-valid");
    }
});


function displayCourses(courseT = courses) {

    const result = courseT.map((course, index) => {
        return `
        <tr>
            <td>${index}</td>
            <td>${course.name}</td>
            <td>${course.category}</td>
            <td>${course.price}</td>
            <td>${course.description}</td>
            <td>${course.capacity}</td>
            <td>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick='currentCourse(${index})'>Update</button>
            </td>
            <td>
            <button class="btn btn-danger" onClick='deleteCourse(${index})'>Delete</button>
            </td>
        </tr>
        `
    }).join(' ');

    document.querySelector("#data").innerHTML = result;

}

function deleteCourse(index) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            courses.splice(index, 1);
            localStorage.setItem("courses", JSON.stringify(courses));
            displayCourses();
            swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "The Data has been deleted.",
                icon: "success"
            });
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire({
                title: "Cancelled",
                icon: "error"
            });
        }
    });

}

search.addEventListener("input", () => {
    const keyword = search.value;
    const resultCourse = courses.filter((course) => {
        return course.name.toLowerCase().includes(keyword.toLowerCase());
    })

    displayCourses(resultCourse);

});

deleteAllBtn.addEventListener("click", () => {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
        title: "ARE YOU SURE OF DELETING ALL THE DATA?",
        text: "You won't be able to revert this action!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            courses = [];
            localStorage.setItem("courses", JSON.stringify(courses));
            displayCourses();
            swalWithBootstrapButtons.fire({
                title: "DELETED!",
                text: "The Data has been deleted.",
                icon: "success"
            });
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire({
                title: "Cancelled",
                icon: "error"
            });
        }
    });
});

function currentCourse(index) {

    const course = courses[index];

    nameModal.value = course.name;
    categoryModal.value = course.category;
    priceModal.value = course.price;
    descriptionModal.value = course.description;
    capacityModal.value = course.capacity;

    save.setAttribute("data-index", index);
}

save.addEventListener("click", (e) => {
    e.preventDefault();
    let isValid = true;
    const namePattern = /^[A-Z][a-z]{2,10}[0-9]{0,2}$/;

    if (!namePattern.test(nameModal.value)) {
        invalidNameM.innerHTML = "Invalid name. It must start with a capital letter and contain 2-10 small letters.";
        nameModal.classList.add("is-invalid");
        isValid = false;
    } else {
        invalidNameM.innerHTML = "";
        nameModal.classList.remove("is-invalid");
        nameModal.classList.add("is-valid");
    }

    const categoryPattern = /^[A-Z][a-z]{2,3}$/;

    if (!categoryPattern.test(categoryModal.value)) {
        invalidCategoryM.innerHTML = "Invalid category. It must start with a capital letter and contain 2-3 small letters.";
        categoryModal.classList.add("is-invalid");
        isValid = false;
    } else {
        invalidCategoryM.innerHTML = "";
        categoryModal.classList.remove("is-invalid");
        categoryModal.classList.add("is-valid");
    }

    const pricePattern = /^([1-9]$|[1-9][0-9]$|[1-9][0-9]{2}$|1000$)$/;

    if (!pricePattern.test(priceModal.value)) {
        invalidPriceM.innerHTML = "Invalid price. The price must be between 1 and 1000 dollars.";
        priceModal.classList.add("is-invalid");
        isValid = false;
    } else {
        invalidPriceM.innerHTML = "";
        priceModal.classList.remove("is-invalid");
        priceModal.classList.add("is-valid");
    }

    const descriptionPattern = /^[A-Z][^0-9]*$/;

    if (!descriptionPattern.test(descriptionModal.value)) {
        invaliddescriptionM.innerHTML = "Invalid description. It must start with a capital letter and not contain numbers.";
        descriptionModal.classList.add("is-invalid");
        isValid = false;
    } else {
        invaliddescriptionM.innerHTML = "";
        descriptionModal.classList.remove("is-invalid");
        descriptionModal.classList.add("is-valid");
    }

    const capacityPattern = /^(100|[1-9][0-9]?|0[1-9])$/;

    if (!capacityPattern.test(capacityModal.value)) {
        invalidCapacity.innerHTML = "Invalid capacity. It must be a number between 1 and 100.";
        capacityModal.classList.add("is-invalid");
        isValid = false;
    } else {
        invalidCapacity.innerHTML = "";
        capacityModal.classList.remove("is-invalid");
        capacityModal.classList.add("is-valid");
    }

    if (isValid) {
        const index = save.getAttribute("data-index");

        courses[index] = {
            name: nameModal.value,
            category: categoryModal.value,
            price: priceModal.value,
            description: descriptionModal.value,
            capacity: capacityModal.value
        };

        localStorage.setItem("courses", JSON.stringify(courses));

        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });
        Toast.fire({
            icon: "success",
            title: "Course Updated Successfully"
        });
        displayCourses();
        const modalElement = document.querySelector("#exampleModal");
        const modalInstance = bootstrap.Modal.getOrCreateInstance(modalElement);
        modalInstance.hide();
    }

});

