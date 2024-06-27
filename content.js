var QUESTION_BODY_CLASSNAME =  'post-layout'

var upvote = document.querySelector('.js-vote-count').getAttribute('data-value');
var views =document.getElementsByClassName('flex--item ws-nowrap mb8')[2].getAttribute('title').replace(/\D/g, '');
var view_count=parseInt(views);

var element = document.querySelector('h2.mb0');
var anscount =0;
if (element) {
     anscount = element.getAttribute('data-answercount');
} 
var reputation_score=0;
var gold_badges=0;
var silver_badges=0;
var bronze_badges=0;
outer=document.getElementsByClassName("-flair")[1]
var innerSpans = outer.querySelectorAll('span');
        
        // Iterate through the inner span elements
        innerSpans.forEach(function(innerSpan) {
            if(innerSpan.className=="reputation-score")
            {var rep_score=innerSpan.textContent.trim().replace(/\D/g, '');
        reputation_score=parseInt(rep_score);
        }
        var inner=innerSpan.querySelectorAll('span');
             inner.forEach(function(i) {
                 if(i.className=="badge1")
                     {var s=innerSpan.title;
                       s= s.replace(/\D/g, '');
                        gold_badges=parseInt(s);
                    }
                 if(i.className=="badge2")
                     {var s=innerSpan.title;
                        s=s.replace(/\D/g, '');
                        silver_badges=parseInt(s);
                    }
                 if(i.className=="badge3")
                     {var s=innerSpan.title;
                        s=s.replace(/\D/g, '');
                        bronze_badges=parseInt(s);
                    }
             });
        });

        e=document.getElementsByClassName("user-gravatar32")[1];
        user_id=parseInt(e.querySelector('a').getAttribute('href').replace(/\D/g, ''));

var e=document.getElementsByClassName("answer js-answer accepted-answer js-accepted-answer")[0]
var inn=e.querySelector('.post-layout .answercell.post-layout--right .mt24 .d-flex.fw-wrap.ai-start.jc-end.gs8.gsy .post-signature.flex--item.fl0:nth-of-type(3) .user-info .d-flex .user-action-time.fl-grow1 .relativetime')
var accepted_date=inn.getAttribute('title').slice(0,-1);

var e=document.getElementsByClassName("answer js-answer accepted-answer js-accepted-answer")[0]
var ans_id=e.getAttribute('data-answerid')

var e=document.getElementsByClassName('user-info user-hover')[1]
f=e.querySelector('.d-flex .user-action-time.fl-grow1 .relativetime')
var user_date=f.getAttribute('title').slice(0,-1);

const date1 = new Date(user_date);
const date2 = new Date(accepted_date);
const diffInMs = Math.abs(date2 - date1); // Difference in milliseconds
var interval_accepted = diffInMs / (1000); // Convert to seconds

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
    console.log(tagsAll);
    for(let tag in tags){
        if(JavaTags.includes(tags[tag])){
            return true;        }
    }
    return false
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
        "tags" : tagsAll,
        "reputation_score": reputation_score,
        "gold_badge":gold_badges,
        "silver_badge":silver_badges,
        "bronze_badge":bronze_badges,
        "user_id":user_id,
        "answer_id":ans_id,
        "interval_accepted":interval_accepted,
        "score":upvote,
        "ans_count":anscount,
        "view_count":view_count

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
