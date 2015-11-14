var Loreen;
(function() {

    //Create a class named Loreen and constructor
    Loreen = function () {
        //Default values.
        this.type = null;
        this.query = null;
        this.data = null;
    };
    //Static variables
    Loreen.IMAGE = 1;
    Loreen.TEXT = 2;
    Loreen.TYPE = {
        PARAGRAPH: 1,
        SENTENCE: 2,
        WORD: 3
    };
    //Words to create euphoric text.
    Loreen.WORDS = [
        "Why", "Why", "can't", "this", "moment", "last", "forever", "more", "Tonight", "Tonight", "eternity's",
        "an", "open", "door", "No", "Don't", "ever", "stop", "doing", "the", "things", "you", "do", "Don't",
        "go", "In", "every", "breath", "I", "take", "I'm", "breathing", "you", "Euphoria", "Forever", "'til",
        "the", "end", "of", "time", "From", "now", "on", "only", "you", "and", "I", "We're", "going",
        "u-u-u-u-u-u-up", "Euphoria", "An", "everlasting", "piece", "of", "art", "A", "beating", "love",
        "within", "my", "heart", "We're", "going", "u-u-u-u-u-u-up", "We", "are", "here", "We", "are", "alone",
        "in", "our", "own", "universe", "We", "are", "free", "Where", "everything's", "aloud", "and", "love",
        "comes", "first", "Forever", "and", "ever", "together", "We", "sail", "into", "infinity", "We're",
        "higher", "and", "higher", "and", "higher", "We're", "reaching", "for", "divinity", "Euphoria", "Forever",
        "'til", "the", "end", "of", "time", "From", "now", "on", "only", "you", "and", "I", "We're", "going",
        "u-u-u-u-u-u-up", "Euphoria", "An", "everlasting", "piece", "of", "art", "A", "beating", "love", "within",
        "my", "heart", "We're", "going", "u-u-u-u-u-u-up", "Forever", "We", "sail", "into", "infinity", "We're",
        "higher", "We're", "reaching", "for", "divinity", "Euphoria", "Euphoria", "We're", "going", "u-u-u-u-u-u-up",
        "Euphoria", "An", "everlasting", "piece", "of", "art", "A", "beating", "love", "within", "my", "heart",
        "We're", "going", "u-u-u-u-u-u-up", "Euphoria", "Euphoria", "We're", "going", "u-u-u-u-u-u-up"
    ];
    //random integer method.
    Loreen.prototype.randomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    //text creator method with parameters: how many, what
    Loreen.prototype.createText = function (count, type) {
        switch (type) {
            //paragraphs are loads of sentences.
            case Loreen.TYPE.PARAGRAPH:
                var paragraphs = new Array;
                for (var i = 0; i < count; i++) {
                    var paragraphLength = this.randomInt(10, 20);
                    var paragraph = this.createText(paragraphLength, Loreen.TYPE.SENTENCE);
                    paragraphs.push('<p>'+paragraph+'</p>');
                }
                return paragraphs.join('\n');
                break;
            //sentences are loads of words.
            case Loreen.TYPE.SENTENCE:
                var sentences = new Array;
                for (var i = 0; i < count; i++) {
                    var sentenceLength = this.randomInt(5, 10);
                    var words = this.createText(sentenceLength, Loreen.TYPE.WORD).split(' ');
                    words[0] = words[0].substr(0, 1).toUpperCase() + words[0].substr(1);
                    var sentence = words.join(' ');

                    sentences.push(sentence);
                }
                return (sentences.join('. ') + '.').replace(/(\.\,|\,\.)/g, '.');
                break;
            //words are words
            case Loreen.TYPE.WORD:
                var wordIndex = this.randomInt(0, Loreen.WORDS.length - count - 1);

                return Loreen.WORDS.slice(wordIndex, wordIndex + count).join(' ').replace(/\.|\,/g, '');
                break;
        }
    };
    Loreen.prototype.createLoreen = function (element) {

        var loreen = new Array;
        var count;
        
        if (/\d+-\d+[psw]/.test(this.query)){
            var range = this.query.replace(/[a-z]/,'').split("-");
            count = Math.floor(Math.random() * parseInt(range[1])) + parseInt(range[0]);
        }else{
            count = parseInt(this.query); 
        }
        
        if (/\d+p/.test(this.query)) {
            var type = Loreen.TYPE.PARAGRAPH;
        }
        else if (/\d+s/.test(this.query)) {
            var type = Loreen.TYPE.SENTENCE;
        }
        else if (/\d+w/.test(this.query)) {
            var type = Loreen.TYPE.WORD;
        }

        loreen.push(this.createText(count, type));
        loreen = loreen.join(' ');

        if (element) {
            if (this.type == Loreen.TEXT)
                element.innerHTML += loreen;
            else if (this.type == Loreen.IMAGE) {
                //TODO: for now, using lorempixum.
                var path = '';
                var options = this.query.split(' ');
                if (options[0] == 'gray') {
                    path += '/g';
                    options[0] = '';
                }
                if (element.getAttribute('width'))
                    path += '/' + element.getAttribute('width');

                if (element.getAttribute('height'))
                    path += '/' + element.getAttribute('height');

                path += '/' + options.join(' ').replace(/(^\s+|\s+$)/, '');
                element.src = 'http://lorempixum.com'+path.replace(/\/\//, '/');
            }
        }

        if (element == null)
            return loreen;
    };

    //Register as jQuery
    if (typeof jQuery != 'undefined') {
        (function($) {
            $.fn.loreen = function () {
                $(this).each(function() {
                    var loreen = new Loreen;
                    loreen.type = $(this).is('img') ? Loreen.IMAGE : Loreen.TEXT;
                    //data-loreen can be taken with data function (thanks to http://forrst.com/people/webking)
                    loreen.query = $(this).data('loreen');
                    loreen.createLoreen(this);
                })
            };

            //If developer run this javascript, then we can run the loreen.js
            $(document).ready(function() {
                $('[data-loreen]').loreen();
            });
        })(jQuery);
    }

})();