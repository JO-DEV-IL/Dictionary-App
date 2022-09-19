// Global Variables
const wrapper = document.querySelector('.wrapper')
searchInput = wrapper.querySelector('input')
infoText = wrapper.querySelector('.info-text')
synonyms = wrapper.querySelector('.synonyms .list'),

// On a key up event if the input field isn't empty and the Enter key was pressed then call the fetchApi function
// Otherwise alert an empty input field
searchInput.addEventListener('keyup', e =>{
    if(e.key === 'Enter' && e.target.value){
        fetchApi(e.target.value)
    }else if(e.key === 'Enter' && searchInput.value == 0){
        alert('Please enter a valid search')
    }
})

// fetchApi function
// References url to API and fetches it 
// It then gets parsed into JSON format
// Then calls on the data function
function fetchApi(word){
    infoText.style.color = '#000';
    infoText.innerHTML = `Looking up the word <span>""${word}"</span> for you...`
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    fetch(url).then(res => res.json()).then(result => data(result,word))
}

// data function
// If the API can't find a word in its database then it notifies us
function data(result,word){
    if(result.title){
        infoText.innerHTML = `Can't find the word <b>"${word}"</b>. Please search for another word.`
    }else{
        wrapper.classList.add('active') // If the searched word exists then .active will get added to the .wrapper div
        let definitions = result[0].meanings[0].definitions[0],phonetics = `${result[0].meanings[0].partOfSpeech} /${result[0].phonetics[0].text}`
        
        
        document.querySelector('.word p').innerText = result[0].word
        document.querySelector('.word span').innerText = phonetics
        document.querySelector('.meaning span').innerText = definitions.definition
        document.querySelector('.example span').innerText = definitions.example
        synonyms.innerHTML = ''

        // For loop only grabs 5 synonyms from the API
        // Inserts synonyms into the span tag
        // https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML
        for(let i = 0; i < 5; i++) {
            let tag = `<span>${result[0].meanings[0].synonyms[i]},</span>`
            synonyms.insertAdjacentHTML("beforeend", tag);
        }
    }
}