$("#downloadButton").click(function () {
	// Getting the generated form
	var form = document.getElementById("generatedForm").value;

	if (!form)	form.innerHTML = "Generate a form!";
    else downloadFile();
});

/* Source: http://jsfiddle.net/vb7z1jeu/ */
function downloadFile(){
	var textToWrite = document.getElementById('generatedForm').value;
	var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
	var fileNameToSaveAs = "CSRF-PoC-Form.html";
	var downloadLink = document.createElement("a");
	downloadLink.download = fileNameToSaveAs;
	downloadLink.innerHTML = "Download File";
	if (window.webkitURL != null){
		// Chrome allows the link to be clicked
		// without actually adding it to the DOM.
		downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
	}
	else{
		// Firefox requires the link to be added to the DOM
		// before it can be clicked.
		downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
		downloadLink.onclick = destroyClickedElement;
		downloadLink.style.display = "none";
		document.body.appendChild(downloadLink);
	}
	downloadLink.click();
}