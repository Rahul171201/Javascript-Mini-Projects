import imageList from "./Image.js";

// Creating Left box column
const leftListBox = document.querySelector(".leftbox");

// Updating right box column on click
const updateRightBox = (rightImage, rightImageTitle) => {
    const rightListBox = document.querySelector(".rightbox");

    const rightContent = `
    <div class="imageContainer">
        <img src=${rightImage} alt="right-image" class="rightImage">
    </div>
    <div class="textBox">
     <p class="imageTitle">${rightImageTitle}</p>
     <button class="updateButton">UPDATE</button>
    <div>
    
    `;
    rightListBox.innerHTML = rightContent;
}

// function to handle the click event on any left list item
const handleClick = (leftListBox, listItem) => {
    listItem.addEventListener("click", () => {
        
        const imageElement = listItem.querySelector("img");
        let rightImage = imageElement.getAttribute("src");
        
        const rightTextTitle = listItem.querySelector(".imagetext");
        let rightImageTitle = rightTextTitle.innerHTML;
        updateRightBox(rightImage, rightImageTitle);
    });

    leftListBox.append(listItem);
}

// Displaying all the images info on the left column
imageList.forEach((item) => {
    const content = `
        <img src=${item.previewImage} alt ="list image" class="image">
        <p class="imagetext">${item.title}</p>
`;
    const listItem = document.createElement("div");
    listItem.classList.add("listitem");
    listItem.innerHTML = content;
    handleClick(leftListBox, listItem);

});

// Creating Default Right box column
const rightListBox = document.querySelector(".rightbox");

const rightContent = `
    <div class="imageContainer">
        <img src="default.jpeg" alt="right-image" class="rightImage">
    </div>
    <div class="textBox">
     <p class="imageTitle">MAC OS</p>
     <button class="updateButton">UPDATE</button>
    <div>
`;

rightListBox.innerHTML = rightContent;