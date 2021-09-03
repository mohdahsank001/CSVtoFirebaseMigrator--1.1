CSVtoFireStore Migrator 2.0 


This project is for migrating csv to firebase database. 
----------------------------------------------------------------------------


Instruction to successfully migrate from CSV to Firestore Firebase database :  


1. Convert CSV to JSON using any appropriate tool or csvjson.com/csv2json 
2. Generate Private Key From the Firestore database which can be found under settings -> "Users and permissions".
3. Obtain the Firebase Admin SDK in the form of Node.js json file. 
4. Generate the new private key and store it in your project root folder (in your local machine) and then rename it as "serviceAccountKey.json". 
5. Now within the project folder, there should be 2 files that are present which are : 
a. data. json -> The csv file that was converted to JSON. 
b. serviceAccountKey.json -> The serviceAccountKey downloaded from the firebase console earlier in Step 3. 
NOTE : a. The naming for your service Accounts key must be exaclty as above which is "serviceAccountKey.json" and must not 
be altered .
b. To have auto generated key, change .doc(docKey).set(data[docKey]) to => doc().set(data[docKey]) in the above code within index.js .
6.Now setup a Node.js project inside your root folder. I have already setup for mine.
7.Open root folder and type in "npm init"
8. Follow through the interface and give approprite inputs. 
9.Create a new file called as index.js inside your project folder and copy the code inside index.js within this repo. 
10.Replace the "CollectionKey" and "datatabaseURL" within your index.js file with your collectionkey from the firestore database and the databaseURL which you can get from the FirebaseAdmin SDK.  [const collectionKey = "Your collection key here"; //name of the collection, databaseURL: "Your database URL here." ]
11. Install firebase admin library within your source folder using the command nom install firebase-admin 
12. If the firestore dataset would autogenerate the document key within the index.js file do not provide document key. [.doc() must be left empty.]
13.In the terminal go one level up the project folder, and run the following command which is : node<Your_project_folder_name>
14. Migration Done !  :) 


CHANGE LOG for version 2.0  :  (TESTING PHASE)
_________________________________________________

1. Multiple entries from two seperate input JSON files for Jobs and users [into two seperate Collections in the firebase firestore] . (namely testJob.JSON and testUser.JSON such that ith user in the  TestUser.JSON file is mapped with the ith Job in TestJob.JSON ). 




