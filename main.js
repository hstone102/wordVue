let app = new Vue({

    el: "#app",

    data: {
        sentenceNumber: 1,
        wordNumber: 20,
        paragraphNumber: 5,
        characterNumber: 6,
        frequentLetter: "a",
        longestWord: "bat",
        text: "Here I am"
    },

    methods: {

      doCalculations:function () {
        this.sentenceNumber = this.findSentences();
        this.wordNumber = this.findWords();
        this.paragraphNumber = this.findParagraphs();
        this.characterNumber = this.findCharacters();
        this.frequentLetter = this.findLetter();
        this.longestWord = this.findLongestWord();



      },




      findSentences: function () {
        let count = 0;
        for (let i = 0; i < this.text.length; i++){
          if (this.text[i] == ('.' || '?' || '!')){
            count++;
          }
        }
        return count;
      },

      findWords: function () {
        let s = this.text.replace(/(^\s*)|(\s*$)/gi,"");
	      s = s.replace(/[ ]{2,}/gi," ");
	      s = s.replace(/\n /,"\n");

        let num = s.split(' ').length;
        return num;

      },

      findParagraphs: function () {
        let my_data = this.text.split("\n\n");
        var g = my_data.length;
        var i = 0;
        var strip_whitespace = /\s+/gi;
        while (g >=0) {
          g--;
          var tmp = my_data[g];
          tmp = tmp ? tmp .replace(strip_whitespace,"") : tmp;
          if( tmp && tmp.length > 1 ) {
            i++;
          }
        }
        return i;
      },

      findCharacters: function () {
        str = this.text.replace(/\s/g, '');
        let count = 0;
        for (let i = 0; i < str.length; i++){
          count++;
        }
        return count;

      },

      findLetter: function () {
        str = this.text.replace(/\s/g, '');
        str = str.toLowerCase();
        var a = str.split("");
        var obj = {};
        let b = [];
        let largest = 0;
        let index = 0;
        a.forEach(function(s){
          var count=0;
          for(var j=0;j<a.length;j++){
            if(s==a[j]){
              count+=1;
            }
            obj[s]=count;

          }
        });
        for (var key in obj) {
          if (obj.hasOwnProperty(key)) {

            console.log(key + " -> " + obj[key]);
            b.push([key, obj[key]]);
            console.log(b);
          }

        }
        for (let j = 0; j < b.length; j++){
          if (b[j][1] > largest){
            largest = b[j][1];
            letter = b[j][0];
            console.log(largest);
            console.log(b[j]);
          }

        }
        //console.log(b[0]);
        return letter;


      },

      findLongestWord: function () {
        let strSplit = this.text.replace(/\./g,' ')
        strSplit = strSplit.split(" ");
        console.log(strSplit);
        let longestWordNumber = 0;
        let longestWord = "";
        for(let i = 0; i < strSplit.length; i++){
          if(strSplit[i].length > longestWord.length){
	           longestWordNumber = strSplit[i].length;
             longestWord = strSplit[i];
           }
         }
         console.log(longestWord);
         console.log(longestWordNumber);
         return longestWord;
      }

    }

});
