// Global Variables
var CUTOFF = 0.5
var QUESTION_BODY_CLASSNAME =  'post-layout'
var TAGS_CLASSNAME = "ml0 list-ls-none js-post-tag-list-wrapper d-inline"
var BASE_URL = 'https://rishalab.github.io/dl_energy_patterns/'

var body = JSON.stringify(
    document
    .getElementsByClassName('s-prose js-post-body')[0]
    .innerHTML)
    .replace(/\s\s+/g, ' ') 

var title = document.getElementById('question-header').getElementsByTagName('h1')[0].innerText
var JavaTags = ['java']

var requestURL = "http://localhost:8500/"
tagsAll=""


// Function to verify tags by deep learning posts. 
function checkIfJava() {
    const tagElements = document.querySelectorAll('.post-taglist .post-tag');
    const tags = Array.from(tagElements).map(tagElement => tagElement.textContent.trim());
    for(let tag in tags){
        tagsAll+=tags[tag]+" ";
    }
    for(let tag in tags){
        if(JavaTags.includes(tags[tag])){
            return true;        }
    }
    return false
}

function getPatternURLOffset(tagname){
    switch(tagname){
        case 'checkpoint': return 'checkpoint.html';
        case 'pruning': return 'pruning.html';
        case 'quantization': return 'quantization.html'; 
        case 'distillation': return 'distillation.html';
        case 'efficient read write': return 'read-write.html';
        case 'memory leaks': return 'leaks.html'; 
        case 'pretrained networks': return 'pretrained.html';
        case 'tensor operations': return 'tensor-operations.html';
        default: return '';
    }
}

function generateTag(tagname){
    e = document.createElement('div')
    e.className = 'Difftag'
    e.innerText = tagname
    //a.target = '_blank'
    color='#32a89b'
    if(tagname=='Intermediate')
    color='orange'
    if(tagname=='Advanced')
    color='#f0170c'
    e.style.backgroundColor = color;
    e.style.borderRadius = '10px';
    e.style.padding = '10px';
    e.style.textAlign = 'center';
    e.style.fontSize = '20px';
    e.style.fontWeight = 'bold';
    
   // a.appendChild(e)
    return e
}

function prependTagToQuestion(e){
    document.getElementsByClassName(QUESTION_BODY_CLASSNAME)[0].prepend(e)
}

function tagQuestion(res){
    if (res.pattern){
            tagElement = generateTag(res.pattern)
            prependTagToQuestion(tagElement)
        }
    
}

if(checkIfJava()){
    var requestBody = {
        "title": title, 
        "body": body,
        "tags" : tagsAll
        }
    var xhr = new XMLHttpRequest();  
    xhr.open("POST", requestURL);  
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.onreadystatechange = function() { 
      if (xhr.readyState == 4)
        if (xhr.status == 200){
            res = JSON.parse(xhr.responseText)
            tagQuestion(res)
            // callback(JSON.parse(xhr.responseText))
        }
    };
    // console.log(requestURL)
    xhr.send(JSON.stringify(requestBody)); 
}
