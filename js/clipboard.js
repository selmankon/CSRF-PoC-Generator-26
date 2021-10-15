async function copyToClipboard(){
	var copyText = document.getElementById("generatedForm");
	copyText.select();
  	copyText.setSelectionRange(0, 99999);  // For mobile devices
	await navigator.clipboard.writeText(copyText.value);
	var elem = document.getElementById("copyButton");

	// Copied! animation for the button
    elem.innerHTML = "Copied!";
	await sleep(1200);
	elem.innerHTML = "Copy to Clipboard";
}

async function pasteFromClipboard(){
	var pasteButton = document.querySelector('#pasteButton');
	var pasteTextarea = document.querySelector('#request');

	var error = true;

	// Paste from clipboard
	navigator.clipboard.readText()
		.then((text) => {
			var error = false;
			pasteTextarea.textContent = text;

			// For Done. animation
			var pasteButton = document.getElementById("pasteButton");
			pasteButton.innerHTML = "Done.";
		})
	// For Read permission denied. animation
	var pasteButton = document.getElementById("pasteButton");
	if (error) pasteButton.innerHTML = "Read permission denied.";
	await sleep(1200);
	pasteButton.innerHTML = "Paste from Clipboard";	
}

// For button animations
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}