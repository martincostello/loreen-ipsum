Loreen.js Eurphoric Dummy Text/Image Generator jQuery and Native JS
========================================================

A Lorem Ipsum creator service written in JavaScript that uses the [lyrics](http://www.eurovision.tv/event/lyrics?song=26903) of the 2012 [Eurovision](http://www.eurovision.tv) hit [Euphoria](https://www.youtube.com/watch?v=t5qURKt4maw) by [Loreen](http://www.loreen.se/).

Forked and adapter from [f/loremjs](https://github.com/f/loremjs).

Implementation
--------------

Implementation of Loreen.js is so simple,

You just download and add

    <script src="path/to/loreen.js"></script>

into your website/application and run.

If you want to put euphoric text inside a DIV (etc.) tag just write:

    <div data-loreen="2p"></div>

If you want a random length of loreen text within a range just write:

    <div data-loreen="2-4p"></div>

Querying
--------

Loreen.js has a simple query language: "how many?, what?"

    2p = 2 paragraphs
    5s = 5 sentences
    6w = 6 words
    1-6w = between 1 and 6 words

That's it.

Dummy Images
------------

And Loreen.js uses lorempixum.com for images for now.

Usage:

    <img src="" data-loreen="sports/1/Test message" width="223" height="223">
    <img src="" data-loreen="gray" width="100" height="124">
    <img src="" data-loreen="gray animals" width="100" height="124">

And watch what happens :)

Native JavaScript (without any framework)
----------------------------------------

If you want to use Loreen generator natively, (without jQuery).

With Native support, you can loreen.js into your framework.

Usage:

    var loreen = new Loreen;
    loreen.type = Loreen.TEXT;
    loreen.query = '2p';
    loreen.createLoreen(document.getElementById('loreen'));

Inspiration
-----------

[![Euphoria](https://img.youtube.com/vi/t5qURKt4maw/0.jpg)](https://www.youtube.com/watch?v=t5qURKt4maw "Euphoria")
