import imageList from "./Image.js";

// Creating Left box column
const leftListBox = document.querySelector(".leftbox");

// Handle submit
const handleSubmit = (target) => {
    const currentRightImage = document.querySelector(".rightImage").getAttribute("src");
    const currentText = document.querySelector(".textInput").value;
    updateRightBox(currentRightImage, currentText);
    closePopup(target);
}

// Open Popup
const openPopup = (target) => {
    if(target == null)
        return;
    target.classList.add('active');
    overlay.classList.add('active');
    const submitButton = document.querySelector(".submitButton");
    console.log(submitButton);
    submitButton.addEventListener("click", (e) => {
        e.preventDefault();
        handleSubmit(target);
    })
}

// Close Popup
const closePopup = (target) => {
    if(target == null)
        return;
    target.classList.remove('active');
    overlay.classList.remove('active');
}

// Handle update button
const handleUpdateButton = (updateButton) => {
    updateButton.addEventListener("click", () => {
        const target = document.querySelector(`${updateButton.getAttribute("target")}`);
        console.log(target);
        openPopup(target);
    });
}

// Handle close button
const handleCloseButton = (closeButton, updateButton) => {
    closeButton.addEventListener("click", () => {
        const target = document.querySelector(`${updateButton.getAttribute("target")}`);
        console.log(target);
        closePopup(target);
    });
}

// Updating right box column on click
const updateRightBox = (rightImage, rightImageTitle) => {
    const rightListBox = document.querySelector(".rightbox");

    const rightContent = `
    <div class="imageContainer">
        <img src=${rightImage} alt="right-image" class="rightImage">
    </div>
    <div class="textBox">
     <p class="imageTitle">${rightImageTitle}</p>
     <button class="updateButton" target="#popup">UPDATE</button>
    <div>
    
    `;

    rightListBox.innerHTML = rightContent;

    const updateButton = rightListBox.querySelector(".updateButton");
    const closeButton = document.querySelector(".popup_close_button");

    handleUpdateButton(updateButton);
    handleCloseButton(closeButton, updateButton);
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
updateRightBox("default.jpeg", "MAC OS");