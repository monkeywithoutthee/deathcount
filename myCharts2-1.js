/*.-.. --- ...- . / .--. . .- -.-. . / ..- -. -.-. . .-. ... - .- -. -.. .. -. --.
.-.. --- ...- . / .--. . .- -.-. . / ..- -. -.-. . .-. ... - .- -. -.. .. -. --.
.-.. --- ...- . / .--. . .- -.-. . / ..- -. -.-. . .-. ... - .- -. -.. .. -. --.
.-.. --- ...- . / .--. . .- -.-. . / ..- -. -.-. . .-. ... - .- -. -.. .. -. --.*/
document.addEventListener("resize", function () {
//  console.log('update resize:', document.getElementById('chartjs-tooltip'));
 if (document.getElementById('chartjs-tooltip') !== null) {
   document.getElementById('chartjs-tooltip').style.opacity = 0;
 };
});

document.addEventListener("mouseover", function(event){
  //console.log('mouse over resize:', event);
});
document.addEventListener('click',function(event){
  document.getElementById('myChart').selected = true;
  event.preventDefault();
  //console.log('clickevent;;',event.target);
  if(event.target.tagName==='A'){window.open(event.target.href, '_blank')}
});

document.addEventListener('mousedown', function(event) {
  // simulating hold event
  setTimeout(function() {
    // You are now in a hold state, you can do whatever you like!
    document.getElementById('myChart').selected = true;
  //  console.log(document.getElementById('myChart').selected,'<<in hold::',event);
  }, 500);
});
var aDAT = [];
window.onload = init();
function init(){
    (async()=>{
        try {
          const aData = new Promise((resolve, reject) => {resolve(returnGetData());reject('problem')});
          aDAT = await aData.then((data)=>{return data});
          const sortedData = new Promise((resolve,reject)=>{resolve(sortData(aDAT));reject((error)=>{console.log('error sorting images!')})});
          await sortedData.then((data)=>{drawraph(data);return data}).then((data)=>{drawTabular(data);
            //console.log(aDAT,'<<chart::',sortedData);
          })
          }catch(error){
          console.log('init error::',error);
        }
      })();
  }
    var chart;

    const ifirstYear=2006;//the year of the first dataset
    var ctx = document.getElementById('myChart').getContext('2d');
    function drawraph(dataSets){
        //get client width
      //  console.log('drawraph;;',dataSets);
        Chart.defaults.global.defaultColor = 'rgba(0,0,0,0.8)';
        Chart.defaults.global.defaultFontColor = 'rgba(255,255,255,0.9)';
        Chart.defaults.global.fontColor = '#fafafa';
      //  var ctx = document.getElementById('myChart').getContext('2d');
              //  ctx.style.backgroundColor = 'rgba(255,0,0,255)';
        chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'line',
            maintainAspectRatio:true,
            responsive: true,

            // The data for our dataset
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: dataSets
            },
            // Configuration options go here
            options: {
              events:['mousemove','mouseout','click','touchstart','touchmove'],
              legend: {
                  display: true,
                  position:'bottom',
                  labels: {
                      fontColor: 'rgb(255, 255, 255,0.9)'
                  },
                  onHover:function(e){
                  e.target.style.cursor='pointer';},
                  onLeave:function(e){
                  e.target.style.cursor='default';}
                },
              scales: {
                  xAxes: [{
                    gridLines: {
                      color:'rgba(255,255,0,0.3)'
                    }
                  }],
                  yAxes: [{
                    gridLines: {
                      color:'rgba(255,255,0,0.3)'
                    }
                  }],
                },
                layout: {
                    padding: {
                        left: 50,
                        right: 50,
                        top: 50,
                        bottom: 50
                    }
                },
                tooltips: {
                  mode: 'nearest',
                  // Disable the on-canvas tooltip
                  enabled: false,
                  custom: function(tooltipModel) {
                  //  console.log('tooltipModel:', tooltipModel);
                      // Tooltip Element - make enabled:false and work the data into here
                      var tooltipEl = document.getElementById('chartjs-tooltip');

                            // Create element on first render
                        if (!tooltipEl) {
                            tooltipEl = document.createElement('div');
                            tooltipEl.id = 'chartjs-tooltip';
                            tooltipEl.innerHTML = '<div style=\"border-radius:10px;\"></div>';
                            tooltipEl.style = 'border-radius:10px;border-style:solid;border-width:0.5px;z-index:2000;';
                            document.body.appendChild(tooltipEl);
                        }

                        // Hide if no tooltip
                        if (tooltipModel.opacity === 0) {
                            tooltipEl.style.opacity = 0.8;
                            return;
                        }

                        // Set caret Position
                        tooltipEl.classList.remove('above', 'below', 'no-transform');

                        //if tooltipModel.yAlign == bottom then move it up
                        //caretY
                        var iWidth = this._chart.width;
                        //if caretX + widthof tooltip > width then move caretX left by width - 20
                        tooltipModel.caretX = tooltipModel.caretX+10;

                      //  console.log(this,'<<tooltipModel::',tooltipModel,this._chart.width,tooltipModel.caretX+10);
                        if (tooltipModel.caretX+200 >this._chart.width){
                          tooltipModel.caretX = tooltipModel.caretX-200;
                        }
                        if (tooltipModel.yAlign === 'bottom'){

                          tooltipModel.caretY = tooltipModel.caretY-190;
                        }
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
                                innerHtml += '<div>'+title+'</div>';
                            });
                            innerHtml += '</div><div>';
                            //  console.log('bodyLines::', bodyLines);
                            bodyLines.forEach(function(body, i) {
                                var colors = tooltipModel.labelColors[i];
                                var style = 'background:'+colors.backgroundColor;
                                style += '; border-color:'+colors.borderColor;
                                style += '; border-width:2px';
                                var span = '<span style="'+style+'"></span>';
                                innerHtml += '<div>'+body+'</div>';
                            });
                            innerHtml += '</div>';

                            var tableRoot = tooltipEl.querySelector('div');
                            tableRoot.innerHTML = innerHtml;
                        }

                        // `this` will be the overall tooltip
                        var position = this._chart.canvas.getBoundingClientRect();

                        // Display, position, and set styles for font
                        //tooltipEl.style.opacity = 1;
                        tooltipEl.style.backgroundColor = 'rgba(0,0,0,0.9)';
                        tooltipEl.style.color = '#FAFAFA';
                        tooltipEl.style.maxWidth = '50%';
                        tooltipEl.style.position = 'absolute';
                        tooltipEl.style.left = position.left+window.pageXOffset+tooltipModel.caretX+'px';
                        tooltipEl.style.top = position.top+window.pageYOffset+tooltipModel.caretY+'px';
                        tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
                        tooltipEl.style.fontSize = tooltipModel.bodyFontSize+'px';
                        tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
                        tooltipEl.style.padding = tooltipModel.yPadding + 'px '+tooltipModel.xPadding+'px';
                        tooltipEl.style.pointerEvents = 'none';
                    }
                }
            }

        });



        var oStyle = document.getElementById('myChart');
        oStyle.style.backgroundColor = 'rgba(0,0,0,0.4)';
        oStyle.style.color='white';
      //  document.querySelector('.navConHolder').style.zindex = 3000;

    }
    var sortData = function(data){
    //  console.log('sort data::', data);
      var iminYear = 0;
      var imaxYear = 0;
      var aDataSets = [];
      for (var i = 0; i < data.length; i++) {
        if (i === 0) {iminYear = parseInt(data[i].year);imaxYear = parseInt(data[i].year);}
        if (parseInt(data[i].year) < iminYear) {iminYear = parseInt(data[i].year);}

        if (parseInt(data[i].year) > imaxYear) {imaxYear = parseInt(data[i].year);}};
      var loopLength = (imaxYear - iminYear);
      var iThisYear = new Date();
      //  console.log('iminYear::', iminYear, '  imaxYear::', imaxYear, '   loopLength::', loopLength, '   iThisYear::', iThisYear.getFullYear());
        //var usedYear = 0;
      //  for (var i = iminYear; i <= imaxYear; i++) {//loops through each years
        var iFade = 18;//note 255/14 rounds to 18
        var iFull = 200;
        for (var i = imaxYear; i >= iminYear; i--) {//loops through each year--max to min means the latest is on top!
          var colorNo = i.toString();
          colorNo = (colorNo.substring(2) * 5);

        //  console.log('colorNo::', colorNo);
          var usedYear = i
          var strBackgroundColour = '';
          if (i === 2020) {
            strBackgroundColour = 'rgb(255,0,0,0.8)';
          } else if (i > 2020){
            strBackgroundColour = 'rgb(0,0,255,0.8)';
          } else {
            //we have 14 years before 2020, gradient change the colour from white to yellow over 14 years
            strBackgroundColour = `rgb(255,255,${iFull},0.7)`;
            iFull -= iFade;
          }


          //do this then return dataset
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
          if (i === iminYear){
              return aDataSets;
          }
        }

      //  console.log('aDataSets::', JSON.stringify(aDataSets))
    }
    var dataReturn = function(year, data) {
    //  console.log('dataamounts::', year);
      var aMonthlyData = [];
      for (var i = 1; i < 13; i++) {//return each months data
        var iamount = returnamounts(year, i, data);
        aMonthlyData.push(iamount);
      }
      //console.log('retiurning data for year::', JSON.stringify(aMonthlyData));
      return aMonthlyData;
    }
    var returnamounts = function(year, month, data) {
    //  var aReturnamounts = '';
      for (var i = 0; i < data.length; i++) {
        if (parseInt(data[i].year) === year && parseInt(data[i].month) === month) {
            iReturn = data[i].amount;
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
          return data;
       })
       .catch(error => {
        //  toastSuccess("There was an error!");
          console.log("error::;", error);
       })
    }
    var getRandomNumber = function(hi, lo) {
        //returns a randon number between hi and lo
        return Math.floor(Math.random() * (hi - lo)) + lo;
    }

    var returnDataExt = function(value, year, month){
      //console.log('aDAT::', aDAT);
      var ireturnMonthNo = returnMonthNo(month);
      for (var i = 0; i < aDAT.length; i++) {
      //  console.log('comparing::' + JSON.stringify(aDAT[i].month) + ' = ' + month + ' year::', JSON.stringify(aDAT[i].year) + ' = ' + year);
          if (aDAT[i].month == ireturnMonthNo && aDAT[i].year == year && aDAT[i].rType == 2) {
              oReturnMobject = aDAT[i];
              var sflux = '+ ' + oReturnMobject.flux;
              if (oReturnMobject.flux < 0) {
                //sflux = '- ' + Math.abs(oReturnMobject.flux);
                sflux = oReturnMobject.flux;
              };
              var iPerc = (oReturnMobject.flux / oReturnMobject.lastyear) * 100;//gets the percentage rise from last year
              //  console.log(oReturnMobject.lastyear,oReturnMobject.flux,'working the perc::')
              const thisRs = returnCumulative({year:year,month:month,monthNo:ireturnMonthNo,thisRow:i,data:aDAT});
              const thatRs = returnCumulative({year:year-1,month:month,monthNo:ireturnMonthNo,thisRow:i,data:aDAT});
              const diff = thisRs-thatRs;
              const percDif = (diff / thatRs) * 100;
            //  console.log(thisRs,thatRs,'<thisthat:',percDif);
              //(100 * iaverage * averagePeriod) / (icumulat);//gets the percentage rise from last year
              var sHTML = `<div>
                            <div class='toolTipInfo'><b>${month} ${year} : ${nwCs(value)}</b> deaths</div>`
                            if (year>ifirstYear){
                              sHTML += `<div class='toolTipInfo'>prev yr <i>(${month}&nbsp;${year-1})</i> : ${nwCs(oReturnMobject.lastyear)}\n deaths</div>
                              <div class='toolTipInfo'>fluctuation : ${nwCs(sflux)}&nbsp;(${iPerc.toFixed(2)}%)</div>
                              <div class='toolTipInfo'>cumulative : ${nwCs(thisRs)} in ${year}</div>
                              <div class='toolTipInfo'>${percDif.toFixed(2)}% (against prev yr: ${nwCs(thatRs)})&nbsp;</div>`;
                              sHTML += return5YearAvarage({year:year,month:month,monthNo:ireturnMonthNo,amount:value});// `<div class='toolTipInfo'>get info</div>`      `
                            }
                  sHTML += `</div>`;
              return sHTML;
          }


      }
    }

    var returnMonthNo = function(month) {
      //returns the month number from strings
    //  console.log('returning month', month)
      var returnValue = '';
      switch(month.toLowerCase()) {
        case 'jan':
          returnValue = 1;
          break;

        case 'feb':
          returnValue = 2;
          break;

        case 'mar':
          returnValue = 3;
          break;

        case 'apr':
          returnValue = 4;
          break;

        case 'may':
          returnValue = 5;
          break;

        case 'jun':
          returnValue = 6;
          break;

        case 'jul':
          returnValue = 7;
          break;

        case 'aug':
          returnValue = 8;
          break;

        case 'sep':
          returnValue = 9;
          break;

        case 'oct':
          returnValue = 10;
          break;

        case 'nov':
          returnValue = 11;
          break;

        case 'dec':
          returnValue = 12;
          break;
        default:
          returnValue = 1;
        }
        return returnValue;
    };
    var returnCumulative=((data)=>{
      //console.log('returnCumulative::',data);
      var returnAmount = 0;
      for (var i = 0; i < data.data.length; i++) {
        //console.log(data.data[i].year,data.year,'<<years months::',data.data[i].month,data.monthNo)
        if(data.data[i].year===data.year&&data.data[i].month<=data.monthNo){
          returnAmount += data.data[i].amount;
        }
      }
      return returnAmount;
    });
    var return5YearAvarage = (function(data){
      //loop through dataset
//data = {year:year,month:month,monthNo:ireturnMonthNo}
      var averagePeriod = 5;
      var startYear = data.year-averagePeriod;
      if (startYear < ifirstYear){
        averagePeriod = averagePeriod-(ifirstYear-startYear);
      }
      var iTotal = data.year-startYear;
      var iaverage = 0;
      var icumulat = 0;
      var sHTML = ``;

      for (var i=data.year-1;i>=startYear;i--){
          for (var j=0;j<aDAT.length;j++){
            var iPerc = 0;
            //look forn the month of the year in // QUESTION:
      //    console.log('comparing year>>',aDAT[j].year,i,'  month>>',aDAT[j].month,data.month)
            if (aDAT[j].year===i&&aDAT[j].month===data.monthNo){
              icumulat+=aDAT[j].amount;
              sHTML+=`<div class='toolTipInfo'>${data.month}&nbsp;${aDAT[j].year} : ${nwCs(aDAT[j].amount)}</div>`;

            };
          };
          if (i===startYear){
              //data.amount - iaverage
              iaverage = Math.ceil(data.amount-(icumulat/averagePeriod));
              var sFlux = '+ '+nwCs(iaverage);
              if (iaverage < 0){
                sFlux = nwCs(iaverage);
              };
              var t = iaverage * averagePeriod;
              iPerc = (t / icumulat) * 100;//gets the percentage rise from last year
              //(100 * partialValue) / totalValue;
              return `<div class='toolTipInfo'>Avr last ${averagePeriod} years : ${sFlux}&nbsp;(${iPerc.toFixed(2)}%)</div>${sHTML}`;
          }
      }
    });
    var returnanualfiveYearavarage = (function(year,data){
    //objective to to return the 5 year previouse as a single figures
    //loop throughn data less than year and >
      var averagePeriod = 5;
      var startYear = year-averagePeriod;
      if (startYear < ifirstYear){
        averagePeriod = averagePeriod-(ifirstYear-startYear);
      }
    //  console.log(year,startYear,'<<start year  averagePeriod::',averagePeriod)
      var iTotal = year-startYear;
      var iaverage = 0;
      var sHTML = ``;
      for (var i=year;i>=startYear;i--){
          for (var j=0;j<data.length;j++){
            if (data[j].label<i && data[j].label>=startYear){
              iaverage += returnYearEnd(data[j].data)
            }
          }
          break;
      }
      iaverage = Math.ceil(iaverage/averagePeriod);
      return [iaverage,averagePeriod];
    });


    var drawTabular = ((data)=>{
      var sHTML = '';

        for (var i=0;i<data.length;i++){
          const iYearEnd = returnYearEnd(data[i].data);
          const iLastYear = returnLastYear(data[i].label,data);
          var lastYearFlux = 0;
          if (data[i].label>ifirstYear){lastYearFlux = iYearEnd-iLastYear;}
          var sfiveYearAverage = returnanualfiveYearavarage(data[i].label,data);
          //console.log('sfiveYearAverage::',sfiveYearAverage);
          const avCompare = sfiveYearAverage[1];
          sfiveYearAverage = sfiveYearAverage[0];
          var oneFlux = 'PLUS';
          if (lastYearFlux<0){oneFlux = 'MINUS';};
          var fivePlus = 'PLUS';
          var fiveYearFlux = iYearEnd-sfiveYearAverage;
          if (fiveYearFlux<0){fivePlus = 'MINUS';};
        //console.log('sfiveYearAverage::',sfiveYearAverage)
        var sHighlight = ``;
        //console.log('comparing::',data[i].label,2015)
        if (data[i].label===2015||data[i].label===2020){
          sHighlight= 'sHighlight';
        }
          if (data[i].label !== 2021){

            sHTML += `<div class='tabRow ${sHighlight}'>
              <div class='tabBlock'>${data[i].label} : ${nwCs(returnYearTotal(data[i].data))} deaths</div>`;
              if (i < data.length-1){
                var row = i*1+1;
                var prevYr = returnYearTotal(data[row].data);
                var flux = returnYearTotal(data[i].data)-prevYr;
                var fluxPerc = (flux / prevYr) * 100;
                sHTML += `<div class='tabBlock'>fluctuation : ${flux}&nbsp;(${fluxPerc.toFixed(2)}%)</div>`
              }else{
                sHTML += `<div class='tabBlock'>fluxuation : no more data</div>`
              }
              sHTML += `</div>`
                    }
        }
      document.querySelector('.tabular').innerHTML = `<div class='yearEndHead'>Year End Figures</div>${sHTML}`;
    });
    var returnYearTotal = ((data)=>{
        var returnMount = 0;
        for (var i = 0; i < data.length; i++) {
          returnMount += data[i];
        }
        return returnMount;
    });
    function returnLastYear(thisYear,data){
      var lastYear = thisYear-1;
      var returnData = 0;
      for (var i=0;i<data.length;i++){
        if (data[i].label===lastYear){
          returnData = returnYearEnd(data[i].data);
          break;
        }
      }
      return returnData;
    }
    function returnYearEnd(data){
        //console.log('returnYearEnd::',data);
        var iReturn = 0;
        for (var i=0;i<data.length;i++){
            iReturn += data[i];
        }
        return iReturn;
    }
    var formatNumber = function(num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }

    function nwCs(num) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
