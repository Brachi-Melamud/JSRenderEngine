
// demo for a database
class Client {
  firstname;
  lastname;
  id;
}
class Transaction {
  id;
  accountId;
  type; // deposit/withdraw transaction
  sum;
};

class Account {
  id;
  clientId;
  balance;
  transactionList;
};

let bankdatabase = {
  clients: [],
  accounts: [],
  transactions: [],
  api: {
    // useful functions, commonly used
    getAccountById: function (accountId) {
        for (let i = 0; i < bankdatabase.accounts.length; i++) {
          if (bankdatabase.accounts[i].id == accountId) {
            return bankdatabase.accounts[i];
          }
        }
      },//end of function getAccountById;
    
      getTransactionsByAccountId: function (accountId) {
        let transactionsArr = [];
        for (let i = 0; i < bankdatabase.transactions.length; i++) {
          if (bankdatabase.transactions[i].accountId == accountId) {
            transactionsArr.push(bankdatabase.transactions[i]);
          }
        }
        return transactionsArr;
      },//end of function getTransactionsByAccountId
    
      getBalance: function (accountId) {
        let trans = bankdatabase.api.getTransactionsByAccountId(accountId);
        let balance = 0;
         for(let i = 0; i < trans.length; i++){
          let tempTrans= trans[i];
          balance += tempTrans.sum;
        // trans.foreach (tempTrans => balance += tempTrans.sum);
         return balance;
         }
      },//end of function getBalance;

      getClientById (clientId) {
        for (let i=0; i<bankdatabase.clients.length; i++){
        if (bankdatabase.clients[i].id == clientId) {
        return bankdatabase.clients[i];
        }
      }
      },//end of function getClientById
  }//end of api
};//end of bankdatabase


(function initdatabase() {
    // create 5 customers
  for (let i = 3; i < 8; i++) {
    let client = new Client();
    client.id = i * 5125;
    client.firstname = "john benchmarks" + i * 2;
    client.lastname = "Ben Needleman" + i * 3;
    bankdatabase.clients.push(client);
  }

  //create 13 accounts
  for (let i = 3; i < 16; i++) {
    let acc = new Account()
    acc.id = i;
    let clientIndex = rnd(5);
    acc.clientId = bankdatabase.clients[clientIndex].id;
    bankdatabase.accounts.push(acc);
  }

  // cteate 113 transactions
  for (let i = 3; i < 116; i++) {
    let transaction = new Transaction();
    transaction.id = i;
    transaction.type = rnd(2) == 1 ? "Deposit" : "Withdraw";
    transaction.sum = rnd(4000);
    if (transaction.type == "withdraw") {
      transaction.sum *= -1;
    }


    let accountIndex = rnd(13);
    transaction.accountId = bankdatabase.accounts[accountIndex].id;
    bankdatabase.transactions.push(transaction);
  }
    bankdatabase.accounts.forEach(account =>
    account.balance = bankdatabase.api.getBalance(account.id));
    console.log(Account.balance);

  //  for(let i = 0; i <bankdatabase.accounts.length; i++){
  //   Account.balance=bankdatabase.api.getBalance(Account.id)
  //  }
})();// end of function initdatabase, which is encapsulated and starting itself

function rnd(max) {
  return Math.floor(Math.random() * max);
}

