# Onprint-sdk-js
This SDK contains the basic Onprint operations in browserside Javascript, using JQuery. It works with the Onprint API. Don't know Onprint? [Have a look!](http://onprint.com)

The goal is to provide code samples you can test and try. Even if you always can, it was not initially designed to become a library to include in any project. Performance could be improved, and the distribution package creation is not included.

These examples will soon enrich the already well detailed [Onprint developer documentation](http://developer.onprint.com). You may check this documentation before starting.

# Getting Started
The repository is separated into two parts: *sdk* and *test*. The *test* folder contains very simple tests to go through the different steps of the developer quickstart, from enriching an image to searching for it. The *sdk* folder contains the API calls.

## Test
The tests describe 6 steps: Login to Onprint, Search for an image, Enrich an image, Add a zone and actions to the activated image, Search the created image and Cleanup. They are built with [Mocha.js](https://mochajs.org).

You will see several BDD-style tests that call directly the SDK functions.

### Configuration
Before executing the tests you need to have an account on [edition.onprint.com](http://edition.onprint.com) with some page credits and an API Key access. If it is not the case please ask us for a demo account on [the developer website](http://developer.onprint.com), we'll be happy to give you something to play with.

Then, enter you test configuration in the *testconfig.js* file:

```
var testconfig = {
    testerlogin : "[[[your login]]]",
    testerpassword : "[[[your password]]]",
    apikey : "[[[your API Key]]]"
}
```

### Execution
You should now be able to run *test/index.html* in your server and see what's happening.

If you skip the Cleanup step (by replacing `describe()` with `describe.skip()`), you will be able to visualize the created folder in the edition platform. Don't forget to remove the folder manually when you finish to avoid image conflicts.

If you get no image, try with your own one and simply replace rabbits.jpg and rabbitszone.jpg.

## SDK
The SDK is separated into different parts. The first one is onprint-sdk, containing main functions, useful everywhere. The other ones are separated into different domains: login, enrich, nav and scan.

"private / do not call directly" functions are identified with a prefix underscore like in *_getChildren()*.

### Configuration
The Onprint API can be called two different ways: Https most of the time, and Http for Enriched Images search.

In *config.js* you will find both base urls. You may not change them unless we invite you to do so.

```
var config = {
    baseurlenrich : "https://api.onprint.com",
    baseurlscan : "http://api.onprint.com"
};
```

### Login
This file only contains one function: `GET /token`, the oAuth way. Once the token is received it is set as a header for all the next Ajax requests.

### Enrich
Here are grouped all the functions needed to create a document and enrich it. You start by posting a document, getting the images, posting actions you want, titles, zones, and finally activating the document.

### Navigate (Nav)
Here you will find some of the most basic functions to navigate through the Onprint node tree (by GETting organizations, folders, documents, and also actions). There are also two POST creation functions and one DELETE.

### Scan
This file contains the 2 image search functions: `POST /api/EnrichedImages`, `GET /api/EnrichedImages?Id&LanguageCode` and the action click `PUT /api/Clicks`.

# Possible Improvements
## Tests
As you will note, there is no complex assertion in the tests. The only "assertion" we make is checking whether the API response status code has no error. In Mocha, calling the done() callback without parameters makes the test success, and calling it with a parameter results in an error.
Here we should improve this, with [chai.js](http://chaijs.com) and/or [expect.js](https://github.com/Automattic/expect.js).

## SDK
There will always be stuff to improve, but here would be the first things:
* Complete Navigation with all possible GET, POST, PUT and DELETE functions on nodes
* Review Enrich and Navigate structure, maybe merge...
* Add some "industrialization" features to create a real library distribution

# Participating in the project
Onprint aims at improving the paper by adding image recognition everywhere. Our customers are printing companies and agencies, communication agencies, sellers, retailers, book, scholar editions and magazine editors. The Onprint API makes Onprint technology available in any application. If you are already a customer and happy to find this code, your Issues or PRs are more than welcome! And if you are just curious about what we do, we would be happy to help you get started with Onprint.

Any questions, feedback, need --> [email us](mailto:support@onprint.com) or [visit our Website](http://developer.onprint.com).