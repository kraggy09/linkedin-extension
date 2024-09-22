(() => {
  let currentPerson = "";

  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    const { type, personId } = obj;
    if (type === "NEW") {
      console.log("Content script is loaded");
      currentPerson = personId;
      newPersonLoaded();
    }
  });

  async function newPersonLoaded() {
    const msgBox = document.querySelector(
      ".msg-form__contenteditable.t-14.t-black--light.t-normal.flex-grow-1.full-height.notranslate"
    );

    // Check if the button already exists
    const magicButtonExist = document.querySelector(".magicb-button");
    if (!magicButtonExist && msgBox) {
      // Create the button
      let magicButton = document.createElement("button");
      magicButton.innerHTML = "Click Me!";
      magicButton.className = "magicb-button"; // Add class for easy reference

      // Style the button
      magicButton.style.position = "absolute";
      magicButton.style.bottom = "10px";
      magicButton.style.right = "10px";
      magicButton.style.padding = "10px 20px";
      magicButton.style.backgroundColor = "#0073b1"; // LinkedIn blue
      magicButton.style.color = "white";
      magicButton.style.border = "none";
      magicButton.style.borderRadius = "5px";
      magicButton.style.cursor = "pointer";
      magicButton.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";

      // Append button to the message box
      msgBox.appendChild(magicButton);

      // Add event listener to open the dialog box on button click
      magicButton.addEventListener("click", openDialog);
    }
  }

  // Function to open a dialog box to get job link and role
  function openDialog() {
    // Create the dialog box
    const dialog = document.createElement("div");
    dialog.className = "magic-dialog";
    dialog.style.position = "fixed";
    dialog.style.top = "50%";
    dialog.style.left = "50%";
    dialog.style.transform = "translate(-50%, -50%)";
    dialog.style.backgroundColor = "#f9f9f9";
    dialog.style.padding = "20px";
    dialog.style.boxShadow = "0px 4px 8px rgba(0, 0, 0, 0.2)";
    dialog.style.borderRadius = "8px";
    dialog.style.zIndex = "9999"; // Ensure it's on top

    // Add input fields for Job Link and Role
    dialog.innerHTML = `
      <h3>Enter Job Details</h3>
      <label for="jobLink">Job Link:</label><br>
      <input type="text" id="jobLink" placeholder="Enter the job link" style="width: 100%; margin-bottom: 10px;"><br>
      
      <label for="role">Role:</label><br>
      <input type="text" id="role" placeholder="Enter the role" style="width: 100%; margin-bottom: 20px;"><br>

      <button id="submitDetails" style="padding: 10px 20px; background-color: #0073b1; color: white; border: none; border-radius: 5px; cursor: pointer;">
        Submit
      </button>
      <button id="cancelDialog" style="padding: 10px 20px; margin-left: 10px; background-color: #bbb; color: white; border: none; border-radius: 5px; cursor: pointer;">
        Cancel
      </button>
    `;

    // Append dialog to the body
    document.body.appendChild(dialog);

    // Add event listeners for the buttons
    document.getElementById("submitDetails").addEventListener("click", () => {
      const jobLink = document.getElementById("jobLink").value;
      const role = document.getElementById("role").value;

      // Handle the values (you can process them as needed)
      console.log("Job Link:", jobLink);
      console.log("Role:", role);

      // Close the dialog
      document.body.removeChild(dialog);
    });

    document.getElementById("cancelDialog").addEventListener("click", () => {
      // Close the dialog without doing anything
      document.body.removeChild(dialog);
    });
  }

  newPersonLoaded();
})();
