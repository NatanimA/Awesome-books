const title = document.querySelector("#title");
const author = document.querySelector("#author");
const btn = document.querySelector("#btn");

let inputData = {
    title:"",
    author:""
};

const objectContainer = [];

btn.addEventListener("click",(event) => {
    event.preventDefault();
    inputData.title = title.value;
    inputData.author = author.value;
    objectContainer.push(inputData);
});

