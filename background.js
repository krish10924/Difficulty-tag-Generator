// chrome.tabs.onUpdated.addListener((tabId, tab) => {
//     if (tab.url && tab.url.includes("stackoverflow.com/questions")) {
//       const queryParameters = tab.url.split("stackoverflow.com/questions/")[1];
//       var query="";
//       for (let i in queryParameters){
//         if(queryParameters[i]!='/'){
//             query+=queryParameters[i];
//         }
//         else 
//         break;
//       }
//     //   const urlParameters = new URLSearchParams(queryParameters);
//   console.log(query);
//       chrome.tabs.sendMessage(tabId, {
//         type: "NEW",
//         questionId: query,
//       });
//     }
//   });
  