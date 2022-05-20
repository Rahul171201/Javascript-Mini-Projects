import imageList from "./Image.js";

const listBox = document.querySelector(".leftbox");

imageList.forEach((item) => {
    const content = `
        <img src=${item.previewImage} alt ="list image" class="image">
        <p class="imagetext">${item.title}</p>
`;
    const listItem = document.createElement("div");
    listItem.classList.add("listitem");
    listItem.innerHTML = content;

    listBox.append(listItem);
});

