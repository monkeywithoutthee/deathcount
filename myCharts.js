/*.-.. --- ...- . / .--. . .- -.-. . / ..- -. -.-. . .-. ... - .- -. -.. .. -. --.
.-.. --- ...- . / .--. . .- -.-. . / ..- -. -.-. . .-. ... - .- -. -.. .. -. --.
.-.. --- ...- . / .--. . .- -.-. . / ..- -. -.-. . .-. ... - .- -. -.. .. -. --.
.-.. --- ...- . / .--. . .- -.-. . / ..- -. -.-. . .-. ... - .- -. -.. .. -. --.*/
window.addEventListener("resize", function () {
//  console.log('update resize:', document.getElementById('chartjs-tooltip'));
 if (document.getElementById('chartjs-tooltip') !== null) {
   document.getElementById('chartjs-tooltip').style.opacity = 0;
 };
});

window.addEventListener("mouseover", function () {
  console.log('mouse over resize:', chart.tooltip);

});
/*!function() {
	function detectDevTool(allow) {
  //  console.log('allow::', allow);
  	if(isNaN(+allow)) allow = 100;
    var start = new Date();
    debugger;
    var end = new Date();
    if(isNaN(start) || isNaN(end) || end - start > allow) {//<<this is the genius
    	alert('DEVTOOLS detected. all operations will be terminated. Please disable developer tools to view this graph');
      document.write('DEVTOOLS DETECTED. PLEASE DISABLE DEV TOOLS AND REFRESH YOUR BROWSER!');
      //add message with time and divert
    //  window.location.href = 'https://www.google.com';
    }
  }
  if(window.attachEvent) {
  	if (document.readyState === "complete" || document.readyState === "interactive") {
    	detectDevTool();
      window.attachEvent('onresize', detectDevTool);
      window.attachEvent('onmousemove', detectDevTool);
      window.attachEvent('onfocus', detectDevTool);
      window.attachEvent('onblur', detectDevTool);
    } else {
    	setTimeout(argument.callee, 0);
    }
  } else {
  	window.addEventListener('load', detectDevTool);
    window.addEventListener('resize', detectDevTool);
    window.addEventListener('mousemove', detectDevTool);
    window.addEventListener('focus', detectDevTool);
    window.addEventListener('blur', detectDevTool);
  }
}();*/
var aDAT = [];
window.onload = init();

    function init(){

        //var aData = new Promise(returnGetData, reject);
        const aData = new Promise((resolve, reject) => {
            resolve(returnGetData());
            reject('problem')
        })
        aData.then((data) => {
          //gets the data
        //  console.log("promise data:: ", data);
          aDAT = data;//our data used in popover
          sortData(data);//data formated for chart
          drawraph();
        })
      /*  .then(() => {
            drawraph();
        })*/
        .catch((error) => {
            console.log("ERROR", error);
        })
    }

    var aDataSets = [];
    var chart;
    function drawraph(){
        //get client width
        var ctx = document.getElementById('myChart').getContext('2d');
        chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'line',
            maintainAspectRatio:true,
            responsive: true,
            //objective
            //get data and loop anto dataset as below
            //get min and max year
            //loop from min to max ithisYear
            //make data string for each year by looping in order of date

            // The data for our dataset
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                datasets: aDataSets
            },
            // Configuration options go here
            options: {
              events:['mousemove', 'mouseout', 'click', 'touchstart', 'touchmove'],
              legend: {
                display: true,
                labels: {
                    fontColor: 'rgb(0, 0, 0)'
                },
                boxWidth:400
              },
              tooltips: {
                  mode: 'nearest',
                  // Disable the on-canvas tooltip
                  enabled: true,
                /*  custom: function(tooltipModel) {
                  //  console.log('tooltipModel:', tooltipModel);
                      // Tooltip Element - make enabled:false and work the data into here
                      var tooltipEl = document.getElementById('chartjs-tooltip');

                            // Create element on first render
                        if (!tooltipEl) {
                            tooltipEl = document.createElement('div');
                            tooltipEl.id = 'chartjs-tooltip';
                            tooltipEl.innerHTML = '<div></div>';
                            document.body.appendChild(tooltipEl);
                        }

                        // Hide if no tooltip
                        if (tooltipModel.opacity === 0) {
                            tooltipEl.style.opacity = 0.8;
                            return;
                        }

                        // Set caret Position
                        tooltipEl.classList.remove('above', 'below', 'no-transform');
                        if (tooltipModel.yAlign) {
                            tooltipEl.classList.add(tooltipModel.yAlign);
                        } else {
                            tooltipEl.classList.add('no-transform');
                        }

                        function getBody(bodyItem) {
                            return bodyItem.lines;
                        }

                        // Set Text
                        if (tooltipModel.body) {
                            var titleLines = tooltipModel.title || [];
                            var bodyLines = tooltipModel.body.map(getBody);

                            var innerHtml = '<div>';

                            titleLines.forEach(function(title) {
                                innerHtml += '<div>' + title + '</div>';
                            });
                            innerHtml += '</div><div>';
                            //  console.log('bodyLines::', bodyLines);
                            bodyLines.forEach(function(body, i) {
                                var colors = tooltipModel.labelColors[i];
                                var style = 'background:' + colors.backgroundColor;
                                style += '; border-color:' + colors.borderColor;
                                style += '; border-width: 2px';
                                var span = '<span style="' + style + '"></span>';
                                innerHtml += '<div>' + span + body + '</div>';
                            });
                            innerHtml += '</div>';

                            var tableRoot = tooltipEl.querySelector('div');
                            tableRoot.innerHTML = innerHtml;
                        }

                        // `this` will be the overall tooltip
                        var position = this._chart.canvas.getBoundingClientRect();

                        // Display, position, and set styles for font
                        //tooltipEl.style.opacity = 1;
                        tooltipEl.style.backgroundColor = 'rgba(0,0,0,0.8)';
                        tooltipEl.style.color = '#FAFAFA';
                        tooltipEl.style.maxWidth = '100%';
                        tooltipEl.style.position = 'absolute';
                        tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
                        tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';
                        tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
                        tooltipEl.style.fontSize = tooltipModel.bodyFontSize + 'px';
                        tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
                        tooltipEl.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
                        tooltipEl.style.pointerEvents = 'none';
                    }*/
                }
            }
        });
    }
    function sortData(data){
    //  console.log('sort data::', data);
      var iminYear = 0;
      var imaxYear = 0;

      for (var i = 0; i < data.length; i++) {
        if (i === 0) {
          iminYear = parseInt(data[i].year);
          imaxYear = parseInt(data[i].year);
        //  console.log('in zero:', iminYear, '   ',  imaxYear);
        }

        if (parseInt(data[i].year) < iminYear) {
          iminYear = parseInt(data[i].year);
        //      console.log('iminYear::', iminYear);
        }
        if (parseInt(data[i].year) > imaxYear) {
          imaxYear = parseInt(data[i].year);
      //  console.log('imaxYear::', imaxYear);
        }
      }
      var loopLength = (imaxYear - iminYear);
      var iThisYear = new Date();
      var tenCount = 0;
      //  console.log('iminYear::', iminYear, '  imaxYear::', imaxYear, '   loopLength::', loopLength, '   iThisYear::', iThisYear.getFullYear());
        //var usedYear = 0;
      //  for (var i = iminYear; i <= imaxYear; i++) {//loops through each year
        for (var i = imaxYear; i >= iminYear; i--) {//loops through each year--max to min means the latest is on top!
          var colorNo = i.toString();
          colorNo = (colorNo.substring(2) * 5);

        //  console.log('colorNo::', colorNo);
          var usedYear = i
          var strBackgroundColour = '';
          if (i === iThisYear.getFullYear()) {
            strBackgroundColour = 'rgb(255, 0, 0)'
          } else {
          //  strBackgroundColour = 'rgb(' + getRandomNumber(255, 0) + ', ' + getRandomNumber(255, 0) + ', ' + getRandomNumber(255, 0) + ')'
            strBackgroundColour = 'rgb(255, 255, ' + colorNo + ')'
            tenCount += 10;
          }
          for (var j = 0; j < data.length; j++) {
            if (data[j].year === i && usedYear === i) {
              var sObject = {
                label: data[j].year,
                borderColor: strBackgroundColour,
                data: dataReturn(i, data),
                hoverBorderColor:'rgba(0,255,0, 0.3)',
                hoverBorderWidth:30,
                pointBorderWidth:10,
                hitRadius:5
              }
              aDataSets.push(sObject);
              usedYear = 0;
            }
          }
    //
        }
      //  console.log('aDataSets::', JSON.stringify(aDataSets))
    }
    function dataReturn(year, data) {
    //  console.log('dataamounts::', year);
      var aMonthlyData = [];
      for (var i = 1; i < 13; i++) {//return each months data
        var iamount = returnamounts(year, i, data);
      /*  if (iamount == null) {
          iamount = 0;
        }*/
        aMonthlyData.push(iamount);
      }
      //console.log('retiurning data for year::', JSON.stringify(aMonthlyData));
      return aMonthlyData;
    }
    function returnamounts(year, month, data) {
    //  var aReturnamounts = '';
      for (var i = 0; i < data.length; i++) {
        if (parseInt(data[i].year) === year && parseInt(data[i].month) === month) {
        //  console.log(data[i].year, '<<in year month>>', data[i].month);
            iReturn = data[i].amount;
        //    console.log('hellloooo   ' + iReturn);
          /*  if ((data[i].amount).toString() === 'null') {
              iReturn = 0;
            }*/
            return iReturn;
            break;

        }
      }
      //return aReturnamounts;
      //  return [0, 10, 5, 2, 20, 30, 45, 0, 10, 5, 88, 20];
    }
    function returnGetData(){
        return window.fetch(okey.path, {
          method: 'GET',
          headers: okey.headers
        })
      .then(response => response.json())
        .then(data => {
        // closeModal();
        //  console.log('deathcount return;;', data);
          return data;
        //  sortData(data);
       })
       .catch(error => {
        //  toastSuccess("There was an error!");
          console.log("error::;", error);
       })
    }
    function drawGraph(){

    }
    function getRandomNumber(hi, lo) {
        //returns a randon number between hi and lo
        return Math.floor(Math.random() * (hi - lo)) + lo;
    }

    function returnDataExt(value, year, month){
    //  console.log('aDAT::', aDAT);
      var ireturnMonthNo = returnMonthNo(month);
      for (var i = 0; i < aDAT.length; i++) {
      //  console.log('comparing::' + JSON.stringify(aDAT[i].month) + ' = ' + month + ' year::', JSON.stringify(aDAT[i].year) + ' = ' + year);
          if (aDAT[i].month == ireturnMonthNo && aDAT[i].year == year && aDAT[i].rType == 2) {
              oReturnMobject = aDAT[i];
          //    console.log('in break::', oReturnMobject);
          //          console.log('aDAT::', aDAT);
              //return oReturnMobject;
              var sflux = 'PLUS ' + oReturnMobject.flux;
              if (oReturnMobject.flux < 0) {
                sflux = 'MINUS ' + Math.abs(oReturnMobject.flux);
              }
              var sHTML = ': ' + value + ' people died, previous year: ' + oReturnMobject.lastyear + '\n people died - fluctuation: ' + sflux;
              return sHTML;
          }
      }
    }

    function returnMonthNo(month) {
      //returns the month number from strings
    //  console.log('returning month', month)
      var returnValue = '';
      switch(month.toLowerCase()) {
        case 'january':
          returnValue = 1;
          break;

        case 'february':
          returnValue = 2;
          break;

        case 'march':
          returnValue = 3;
          break;

        case 'april':
          returnValue = 4;
          break;

        case 'may':
          returnValue = 5;
          break;

        case 'june':
          returnValue = 6;
          break;

        case 'july':
          returnValue = 7;
          break;

        case 'august':
          returnValue = 8;
          break;

        case 'september':
          returnValue = 9;
          break;

        case 'october':
          returnValue = 10;
          break;

        case 'november':
          returnValue = 11;
          break;

        case 'december':
          returnValue = 12;
          break;
        default:
          returnValue = 1;
        }
        return returnValue;
    }
