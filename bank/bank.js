document.onreadystatechange= function(ev){
    if (document.readyState== "complete") {
        bankStart();
    }

    //starter
}
function bankStart(){
    let AccountCustomArray= [];
    bankdatabase.accounts.forEach(acc =>{
let myClient= bankdatabase.api.getClientById(acc.clientId)
let o= {
id: acc.id,
balance: acc.balance,
clientId: acc.clientId,
clientFullName: myClient.lastname+ ' '+ myClient.firstname
}
AccountCustomArray.push(o);
    });
    document.querySelector('.accounts-list').innerHTML=BrachiRender(templates.account,bankdatabase.accounts);
    initEvents();
} //end of function bankStart


//templates

let templates = {
  account: `<div class = "account flex-col">
  <div> <strong> ID: </strong> <span>[id]</span></div>
  <div> <strong> Client ID: </strong> <span>[clientId]</span></div>
  <div> <strong> Balance: </strong> <span>[balance]</span></div>
  </div>`,
  transaction: `<div class = "transaction flex-col">
  <div> <strong> ID: </strong> <span>[id]</span></div>
  <div> <strong> Type: </strong> <span>[type]</span></div>
  <div> <strong> Sum: </strong> <span>[sum]</span></div>
  </div>`,

};

//events
function initEvents(){
    let allAccountsDiv= document.querySelectorAll('.account');
    allAccountsDiv.forEach(accDiv=>{
    accDiv.onclick = function(ev) {

        //set css styles
        let myAccountDiv = ev.target.closest('.account');
        console.log(myAccountDiv);
        document.querySelectorAll('.account.active').forEach(activeDiv=>
        activeDiv.className= activeDiv.className.replace('active', ''))
    
        myAccountDiv.className += "active";

        //get transactions and render:
        let accountId = myAccountDiv.querySelector('span').textContent;
        let accTrans= bankdatabase.api.getTransactionsByAccountId(accountId);
        let detailsPanel = document.querySelector('.details-panel');
        let h= `<h2> Details for account: ${accountId} </h2>`
        h+= BrachiRender(templates.transaction, accTrans);
        console.log(h);
        detailsPanel.innerHTML = h;
        //document.write(h);
    }
    })
}