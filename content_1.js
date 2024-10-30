var posts = document.getElementsByClassName('s-post-summary--content-title');
var count = 0;

for (var post of posts) {
    console.log('Hare Krishna');
    var url = post.innerHTML;
    var start = url.indexOf('href="') + 6; // 6 is the length of 'href="'

    // Find the ending position of the href attribute value
    var end = url.indexOf('"', start);

    // Extract the substring between the start and end positions
    var hrefValue = 'https://stackoverflow.com' + url.substring(start, end);
    console.log(hrefValue);

    // Fetch the content of the question page
    fetch(hrefValue)
        .then(response => response.text())
        .then(html => {
            // Create a temporary DOM parser
            var parser = new DOMParser();
            var doc = parser.parseFromString(html, 'text/html');

            // Now proceed with your DOM manipulations within this block

            var QUESTION_BODY_CLASSNAME = post.className;

try{
    upvote = doc.querySelector('.js-vote-count').getAttribute('data-value');
    }
    catch(error){
        
    }
    var views =doc.getElementsByClassName('flex--item ws-nowrap mb8')[2].getAttribute('title').replace(/\D/g, '');
var view_count=parseInt(views);

var element = doc.querySelector('h2.mb0');
var anscount =0;
if (element) {
     anscount = element.getAttribute('data-answercount');
} 
var reputation_score=0;
var gold_badges=0;
var silver_badges=0;
var bronze_badges=0;
try{
outer=doc.getElementsByClassName("-flair")[1]
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
    }
    catch(error){

    }
    var user_id=0
    var user_date=0

    try{
        e=doc.getElementsByClassName("user-gravatar32")[1];
        user_id=parseInt(e.querySelector('a').getAttribute('href').replace(/\D/g, ''));
        var e1=doc.getElementsByClassName('user-info')[1]
        f=e1.querySelector('.d-flex .user-action-time.fl-grow1 .relativetime')
        user_date=f.getAttribute('title').slice(0,-1);
    }
    catch(error){

    }

var interval_accepted=0
var accepted_date=0
var ans_id=0;

try{
var e2=doc.getElementsByClassName("answer js-answer accepted-answer js-accepted-answer")[0]
if(e2){
    var inn=e2.querySelector('.post-layout .answercell.post-layout--right .mt24 .d-flex.fw-wrap.ai-start.jc-end.gs8.gsy .post-signature.flex--item.fl0:nth-of-type(3) .user-info .d-flex .user-action-time.fl-grow1 .relativetime')
 accepted_date=inn.getAttribute('title').slice(0,-1);
 ans_id=parseInt(e2.getAttribute('data-answerid'))
const date1 = new Date(user_date);
const date2 = new Date(accepted_date);
const diffInMs = Math.abs(date2 - date1); // Difference in milliseconds
 interval_accepted = diffInMs / (1000); // Convert to seconds
}
}
catch(error){
console.log("answer not accepted");
}
var body = JSON.stringify(
    doc
    .getElementsByClassName('s-prose js-post-body')[0]
    .innerHTML)
    .replace(/\s\s+/g, ' ') 

var title = doc.getElementById('question-header').getElementsByTagName('h1')[0].innerText
var JavaTags = ['java']

var requestURL = "http://localhost:8500/"
tagsAll=""


// Function to verify tags by deep learning posts. 
function checkIfJava() {
    const tagElements = doc.querySelectorAll('.post-taglist .post-tag');
    const tags = Array.from(tagElements).map(tagElement => tagElement.textContent.trim());
    for(let tag in tags){
        tagsAll+=tags[tag]+" ";
    }
    console.log(tagsAll);
    for(let tag in tags){
        if(JavaTags.includes(tags[tag])){
            return true;        
        }
    }
    return false
}
            // Continue with other DOM manipulations...

            // Generate tag and prepend it to the question
            function generateTag(tagname) {
                var e = document.createElement('div');
                e.className = 'Difftag';
                e.innerText = tagname;
                var color = '#32a89b';
                if (tagname == 'Intermediate') color = 'orange';
                if (tagname == 'Advanced') color = '#f0170c';
                e.style.backgroundColor = color;
                e.style.borderRadius = '4px';
                e.style.padding = '4px';
                e.style.textAlign = 'left';
                e.style.fontSize = '10px';
                e.style.fontWeight = 'bold';
                return e;
            }

            function prependTagToQuestion(e) {
                document.getElementsByClassName(QUESTION_BODY_CLASSNAME)[count].prepend(e);
            }

            function tagQuestion(res) {
                if(res.pattern){
                var tagElement = generateTag(res.pattern);
                prependTagToQuestion(tagElement);
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
            count++;
            callback(JSON.parse(xhr.responseText))
       }
   };
    console.log(requestURL)
    xhr.send(JSON.stringify(requestBody)); 
}



        })
        .catch(error => console.error('Error fetching the page:', error)); // Catch any fetch errors
}
