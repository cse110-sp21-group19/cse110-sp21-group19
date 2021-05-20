# indexedDB notes:
indexedDB is noSQL or document-based database meaning it doesn't actually have any relational tables but instead something called **object stores**.

## Obejct Stores:
Object store is the foundation of indexedDB. Similar to relational databases, **an object store is basically the same as a database table**. "Object stores include one or more indices that operate as a key/pair value in the store and provide a way to quickly locate data". 

You must select a key type for an object store. There are two types of keys: "in-line" and "out-of-line". An in-line key is dependent on the data. For example, the emailAddress column can be used as an in-line key. This key cannot be repeated and enforces uniqueness. So only one unique email can exist in the database. Out-of-line keys are unique keys that are independent of the data (in other words no related to the data).

## Transactions:
Interaction with the database must be in the context of a transaction. "Transaction scopes affect one or more object stores at a time and you define this by passing in an array of object store names in to the function that creates a transaction scope. The secondary argument involved in creating a transaction is the transaction mode."

Transactions use up a lot of resources, so when we are not chaging any of the data, specify as *read-only mode*.

~~~
// mode can either be 'readonly' or 'readwrite'
transaction = db.transaction([list of objectStores], mode);
~~~

## Request-Based
 "Each operation against the database is described as involving a request to open the database, access an object store, and so on."