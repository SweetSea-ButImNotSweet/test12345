const inputElement = document.querySelector("body > div > p:nth-child(3) > textarea")
const downloadButton = document.querySelector("body > div > p:nth-child(4) > input.btn.btn-primary");

// By https://codedump.io/share/Fd3DmsM6UAeS/1/creating-a-blob-from-a-base64-string-in-javascript
// Example
// var blob = b64toBlob(b64Data, contentType);
// var blobUrl = URL.createObjectURL(blob);
function b64toBlob(b64Data, contentType, sliceSize) {
  contentType = contentType || 'image/png';
  sliceSize = sliceSize || 512;

  var byteCharacters = atob(b64Data);
  var byteArrays = [];

  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    var slice = byteCharacters.slice(offset, offset + sliceSize);
  
    var byteNumbers = new Array(slice.length);
    for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
    }
  
    var byteArray = new Uint8Array(byteNumbers);
  
    byteArrays.push(byteArray);
  }

  var blob = new Blob(byteArrays, {type: contentType});
  return blob;
}

document.addEventListener('DOMContentLoaded', function () {
  downloadButton.addEventListener('click', function () {
    const replayData = inputElement.value;
    const dataParts = replayData.split('|');

    if(dataParts.length === 4 && dataParts[0] === 'BEGIN_OF_TROMI_REPLAY' && dataParts[3] === 'END_OF_TROMI_REPLAY') {
      const fileName = dataParts[1];
      const base64Content = dataParts[2];
      // Convert the Base64 string back to a Blob
      const blob = b64toBlob(base64Content);

      // Create an anchor element and trigger the download
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = fileName;
      downloadLink.style.display = 'none'; // Hide the link

      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } else {
      alert('Invalid replay data format.');
    }
  });
});