import imageList from "./Image.js";

// Creating Left box column
const leftListBox = document.querySelector(".leftbox");
const numberOfItems = imageList.length;

// Open Popup
const openPopup = (target) => {
    if(target == null)
        return;
    target.classList.add('active');
    overlay.classList.add('active');
    console.log("pop up opened");
    const formElement = document.querySelector("#popup-form");
    // console.log(submitButton);
    formElement.removeEventListener("submit", (e)=>{
        console.log("event removed");
    });
    formElement.addEventListener("submit", (e) => {
        
        e.preventDefault();
        e.stopImmediatePropagation(); // to stop multiple event firing
        const currentRightImage = document.querySelector(".rightImage")
        const currentSourceImage = currentRightImage.getAttribute("src");
        const currentText = document.querySelector(".textInput").value;

        // update left column element
        const leftItem = document.querySelector(`[src = "${currentSourceImage}"]`);
        const leftItemParent = leftItem.parentElement;
        const leftItemText = leftItemParent.querySelector("p");
        leftItemText.innerHTML = currentText;
        // console.log("form submitted by ", currentText);
        // update right column element
        updateRightBox(currentSourceImage, currentText);
        closePopup(target);
        document.querySelector(".textInput").value = "";

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
        // console.log(target);
        openPopup(target);
    });
}

// Handle close button
const handleCloseButton = (closeButton, updateButton) => {
    closeButton.addEventListener("click", () => {
        const target = document.querySelector(`${updateButton.getAttribute("target")}`);
        // console.log(target);
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
const handleClick = (listItem) => {
    listItem.addEventListener("click", () => {
        
        const imageElement = listItem.querySelector("img");
        let rightImage = imageElement.getAttribute("src");
        
        const rightTextTitle = listItem.querySelector(".imagetext");
        let rightImageTitle = rightTextTitle.innerHTML;

        const selectedItem = document.querySelector(".selected");
        if(selectedItem == null){
            listItem.classList.add("selected");
        }
        else{
            selectedItem.classList.remove("selected");
            listItem.classList.add("selected");
        }
        
        updateRightBox(rightImage, rightImageTitle);
    });

    leftListBox.append(listItem);
}

// function to handle keyboard events on left items
const handleKeyboardEvent = () => {
    window.addEventListener("keydown", (e) => {
        // console.log(e);
        let selectedItem = document.querySelector(".selected");
        if(selectedItem == null){
            return;
        }
        else{
            let currentId = selectedItem.getAttribute("id");
            currentId = Number(currentId);
            if(e.key === "ArrowUp"){
                if(currentId>0)
                    currentId--;
                else
                    currentId = numberOfItems-1;
            }
            else if(e.key === "ArrowDown"){
                if(currentId<numberOfItems-1)
                    currentId++;
                else
                    currentId = 0;
            }
            selectedItem.classList.remove("selected");
            selectedItem = document.querySelector(`[id = "${currentId}"]`);
            selectedItem.classList.add("selected");
            const imageElement = selectedItem.querySelector("img");
            let rightImage = imageElement.getAttribute("src");
        
            const rightTextTitle = selectedItem.querySelector(".imagetext");
            let rightImageTitle = rightTextTitle.innerHTML;
            updateRightBox(rightImage,rightImageTitle);
        }
    })
};

// Displaying all the images info on the left column
imageList.forEach((item, index) => {
    const content = `
        <img src=${item.previewImage} alt ="list image" class="image">
        <p class="imagetext">${item.title}</p>
`;
    const listItem = document.createElement("div");
    listItem.classList.add("listitem");
    listItem.setAttribute("id", index);
    listItem.innerHTML = content;
    handleClick(listItem);
    
});

// Deselect any item on clicking the background
const handleDeselect = () => {
    document.addEventListener("click", (e) => {
        let isClicked = document.querySelector(".leftbox").contains(e.target);
        if(!isClicked){
            const selectedItem = document.querySelector(".selected");
            if(selectedItem !== null)
                selectedItem.classList.remove("selected");
        }
    });
}

// Creating Default Right box column
updateRightBox(imageList[0].previewImage, imageList[0].title);
handleKeyboardEvent();
handleDeselect();