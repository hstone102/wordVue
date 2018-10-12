Vue.component("line-chart", {
  extends: VueChartJs.Line,
  props: ["chartData", "options"],
  mixins: [VueChartJs.mixins.reactiveProp],
  mounted() {
    this.renderChart(this.chartData, this.options);
  }
});

let app = new Vue({

    el: "#app",

    data: {
        chartData: null,
        options: { responsive: true, maintainAspectRatio: false},
        sentenceNumber: 0,
        wordNumber: 3,
        paragraphNumber: 1,
        characterNumber: 7,
        frequentLetter: "e",
        longestWord: "here",
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
        str = str.replace(/[.,\/1234567890#!$%\^&\*;:{}=\-_`'~()]/g,"");
        str = str.toLowerCase();
        var a = str.split("");
        var obj = {};
        let b = [];
        let largest = 0;
        let index = 0;
        let c = [];
        let d = [];

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
            b.push([key, obj[key]]);
            b.sort((a,b) => a[0].localeCompare(b[0]));
            console.log(b);
            c.push([key]);
            d.push([obj[key]]);
          }
        }

        this.chartData = {
          labels: c,
          datasets: [
            {
              label: "Most Frequent Letter",
              fontSize: 20,
              backgroundColor: "#f879e9",
              fontColor: 'white',
              data: d,
            }
          ]
        };

        var ctx = this.$refs.myChart.getContext('2d');
        var myChart = new Chart(ctx, {
          type: 'bar',
          data: this.chartData,
          options: {
                legend: {
                    labels: {
                // This more specific font property overrides the global property
                    fontColor: 'white',
                    fontSize: 20
                    }
                  },
                  scales: {
                    xAxes: [{
                      ticks: {
                        beginAtZero: true,
                        fontColor: 'white', // labels such as 10, 20, etc
                        fontSize: 14,
                        showLabelBackdrop: false // hide square behind text
                      },
                        gridlines: {
                            color: 'white'
                        },
                        display: true,
                        stacked: true,
                        scaleLabel: {
                          display: true,
                          fontColor: 'white',
                          labelString: 'Letter'
                        }
                    }],
                      yAxes: [{
                        ticks: {
                          beginAtZero: true,
                          fontColor: 'white', // labels such as 10, 20, etc
                          fontSize: 14,
                          showLabelBackdrop: false // hide square behind text
                        },
                          gridlines: {
                              color: 'white'
                          },
                          pointLabels: {
                            fontColor: 'white' // labels around the edge like 'Running'
                          },
                          display: true,
                          stacked: true,
                          scaleLabel: {
                            display: true,
                            fontColor: 'white',
                            labelString: 'Frequency'
                          }
                      }]
                  }
                }

        });
        for (let j = 0; j < b.length; j++){
          if (b[j][1] > largest){
            largest = b[j][1];
            letter = b[j][0];
            //console.log(largest);
            //console.log(b[j]);
          }

        }
        //console.log(b[0]);
        return letter;


      },

      findLongestWord: function () {
        let strSplit = this.text.replace(/\./g,' ')
        strSplit = strSplit.split(" ");
        //console.log(strSplit);
        let longestWordNumber = 0;
        let longestWord = "";
        for(let i = 0; i < strSplit.length; i++){
          if(strSplit[i].length > longestWord.length){
	           longestWordNumber = strSplit[i].length;
             longestWord = strSplit[i];
           }
         }
         return longestWord;
      }

    }

});
