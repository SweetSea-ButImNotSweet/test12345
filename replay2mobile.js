const resultElement = document.querySelector("body > div > p:nth-child(4) > textarea");
const inputElement = document.querySelector("body > div > p:nth-child(2) > input");
const copyButton = document.querySelector("body > div > p:nth-child(3) > input:nth-child(1)")
const clearAllButton = document.querySelector("body > div > p:nth-child(3) > input:nth-child(2)")

document.addEventListener('DOMContentLoaded', function () {
  inputElement.addEventListener('change', function () {
    const file = inputElement.files[0];

    // Check if the file name ends with '_replay.sav'
    if (file.name.endsWith('_replay.sav')) {
      const reader = new FileReader();

      reader.onloadend = function () {
        const base64String = reader.result.replace(/^data:.+;base64,/, '');
        const formattedString = `BEGINNING_OF_TROMI_REPLAY|${file.name}|${base64String}|END_OF_TROMI_REPLAY`;
        resultElement.readOnly = false
        resultElement.value = formattedString; // Writing the result to the 'replay_result' text field
        resultElement.readOnly = true
      };

      reader.readAsDataURL(file);
      return true
    } else {
      alert('Please select a replay file with the correct format (_replay.sav).');
      return true
    }
  });
});

document.addEventListener('DOMContentLoaded', function () {
  copyButton.addEventListener('click', function () {
    resultElement.select(); // Select the content of the replay_result field
    document.execCommand('copy'); // Copy the selected text
    alert('Content copied!'); // Alert the user that the content has been copied
    return true;
  });
});

document.addEventListener('DOMContentLoaded', function () {
  clearAllButton.addEventListener('click', function () {
    resultElement.select();
    resultElement.value = ""  // Clear all contents
    return true;
  })
});