// import Rebase from 're-base';

/*
const base = Rebase.createClass({
    apiKey: "AIzaSyBzRbKHc-J3MZYaTRAPcvtREfQztpm9FVk",
    authDomain: "reacttutorialmarket.firebaseapp.com",
    databaseURL: "https://reacttutorialmarket.firebaseio.com",
});
*/

var Rebase = require('re-base');
var firebase = require('firebase/app');
var database = require('firebase/database');
var app = firebase.initializeApp({
    apiKey: "AIzaSyBzRbKHc-J3MZYaTRAPcvtREfQztpm9FVk",
    authDomain: "reacttutorialmarket.firebaseapp.com",
    databaseURL: "https://reacttutorialmarket.firebaseio.com",  
});
var db = firebase.database(app);
var base = Rebase.createClass(db);

export default base;