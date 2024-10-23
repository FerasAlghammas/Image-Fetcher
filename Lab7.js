const clientId = "00-kDucY22F1Gcc_UmtSoPcY5PIiAByyLRmO-4RRI6U";
let SearchText = document.querySelector('#SearchBar');


function SearchUsingXHR(){

    let SearchText = document.querySelector('#SearchBar').value;
    SearchingResult.innerHTML = "";


    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){

        if(xhr.readyState === 4 && xhr.status === 200){
            const data = JSON.parse(this.responseText);
            processElement(data);
        }else if(xhr.readyState === 4 && xhr.status != 200){
            console.error('Error: ' , xhr.status , xhr.statusText);
        }
    }

    
    xhr.open("GET" , `https://api.unsplash.com/search/photos?query=${SearchText}` , true);
    xhr.setRequestHeader('Authorization', `Client-ID ${clientId}`);
    xhr.send();
}



function SearchUsingFetch(){

    let SearchText = document.querySelector('#SearchBar').value;
    SearchingResult.innerHTML = "";

    fetch(`https://api.unsplash.com/search/photos?query=${SearchText}` , {
        headers: {
            'Authorization': `Client-ID ${clientId}`
        }
    })
    .then(response => response.json())
    .then(data => {
        processElement(data);
    })
    .catch(error => console.error('Error:', error));

}




async function SearchUsingFetchAsyncAwait(){
    let SearchText = document.querySelector('#SearchBar').value;
    SearchingResult.innerHTML = "";

    try{

    const response = await fetch(`https://api.unsplash.com/search/photos?query=${SearchText}` , {
        headers: {
            'Authorization': `Client-ID ${clientId}`
        }
    });

    const data = await response.json();
    processElement(data);
    }catch(error) {
        console.error('Error: ' + error);
    }

}


function processElement(data){

    if(data.results.length === 0){
        SearchingResult.innerHTML = "No image found!";
        return;
    }

    for (let item of data.results){
        let imgElement = document.createElement("img");
        imgElement.src = item.urls.small;
        imgElement.alt = item.alt_description || "Image";
        imgElement.style.width = "150px";
        imgElement.style.margin = "10px";
        SearchingResult.appendChild(imgElement);
    }
}


































