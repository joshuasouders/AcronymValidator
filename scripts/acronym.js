function isValid(acronym, productName){
	//If we kick into this statement, we've reached the end of the recursive calls and we're returning true.
	if((acronym.length === 0) && (productName.length === 0)){
		return true;
	}
	//if we kick into this statement, there's leftover acronym letters and we need to return false.
	else if(((acronym.length === 0) || (productName.length === 0)) || ((typeof acronym == "undefined") || (typeof productName == "undefined"))){
		return false;
	}

	//Tests if the first acronym letter is in the first entry in productName.
	//This is recursive so the characters being compared here are going to change every time.
	var index = productName[0].indexOf(acronym.substring(0,1));
	if(index >= 0){
		var valueToReturn = false;

		//Passes in the acronym minus the first character. If we've gotten this far we know that the first character of the acronym is a recursive match.
		//Also passes in the first word in productName minus however many characters in we found the match with our acronym character (we've also already
		//determined that it's a recursive match). This is then concatenated with the rest of the productNames array.
		if(isValid(acronym.substring(1), [productName[0].substring(index + 1)].concat(productName.slice(1)))){
			valueToReturn = true;
		}

		//Sets up another branch of recusion by calling the recursive function without the first string in productName. We need this to transition to
		//other words within our split productName.
		if(isValid(acronym.substring(1), productName.slice(1))){
			valueToReturn = true;
		}

		//If either of those cases are true, return true. Otherwise there wasn't a match and this branch of recursion is dead.
		return valueToReturn;
	}

	//If the first first letter of the acronym isn't within the first string in productName, we need to return false
	return false;
}


//Attaches a click event listener to the submit button in index.html, then passes a function as the argument that calls isValid with the arguments of the
//acronym value and the product name value, which is turned into an array by splitting it at each space. Then the result of the function is placed into a
//ternery statement that outputs an alert based on whether the function returns true or false.
document.getElementById("submit-btn").addEventListener("click", function(){(isValid(document.getElementById("acronym").value.toUpperCase(), document.getElementById("product-name").value.toUpperCase().split(" ")) == true) ? alert("This is an acronym of the product name. Congrats!") : alert("This is NOT an acronym of the product name. Sorry!")});