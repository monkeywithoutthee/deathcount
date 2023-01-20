/*.-.. --- ...- . / .--. . .- -.-. . / ..- -. -.-. . .-. ... - .- -. -.. .. -. --.
.-.. --- ...- . / .--. . .- -.-. . / ..- -. -.-. . .-. ... - .- -. -.. .. -. --.
.-.. --- ...- . / .--. . .- -.-. . / ..- -. -.-. . .-. ... - .- -. -.. .. -. --.
.-.. --- ...- . / .--. . .- -.-. . / ..- -. -.-. . .-. ... - .- -. -.. .. -. --.*/

'use strict';
const okey = {"headers":{"Accept":"application/json","Content-Type":"application/json","monKey":"BoomBoomBoom"},"path":"https://apiapi.monkeywithoutthee.com/deathcount/g"};

var aDAT = [];
window.onload = (()=>{
    (async()=>{
      console.log('init innit!!');
        try {
          const aData = new Promise((resolve, reject) => {resolve(returnGetData());reject('problem')});
          aDAT = await aData.then((data)=>{return data});
          const sortedData = new Promise((resolve,reject)=>{resolve(sortData(aDAT));reject((error)=>{console.log('error sorting images!')})});
          await sortedData.then((data)=>{
            drawraph(data);
            return data})
          .then((data)=>{
            drawTabular(data);
            //console.log(aData,'<<chart::',window.Chart);
          });
          }catch(error){
          console.log('init error::',error);
        }
      })();
  })
    var chart;
    var ctx = document.getElementById('myChart').getContext('2d');
    const ifirstYear=2006;//the year of the first dataset
//aspectRatio
    const drawraph = (dataSets)=>{
              //  ctx.style.backgroundColor = 'rgba(255,0,0,255)';

        chart = new window.Chart(window.ctx, {
            // The type of chart we want to create
            type: 'line',
            // The data for our dataset
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: dataSets
            },
            options: {
              maintainAspectRatio:true,
              responsive: true,
              events:['mousemove','mouseout','click','touchstart','touchmove'],
                  layout: {
                      padding: {
                          left: 2,
                          right: 2,
                          top: 5,
                          bottom: 5
                        }
                    },
                elements:{
                  point:{
                    pointStyle:'round',
                    pointRadius:2
                  },
                  line:{
                    tension:0.3,
                    borderWidth:2
                  }
                },
                scales: {
                    xAxes: {
                      grid: {
                        color:'rgba(255,255,0,0.2)'
                      },
                      ticks: {
                          font: {
                              size: 10,
                          }
                      },
                    },
                    yAxes: {
                      grid: {
                        color:'rgba(255,255,0,0.2)'
                      },
                      ticks: {
                          font: {
                              size: 8,
                          }
                      },
                    },
                  },

                plugins: {
                  lables:{
                    font: {
                        size: 10
                    }
                  },
                  legend: {
                      display: true,
                      position:'bottom',
                      maxHeight:50,
                      labels:{
                        boxWidth:2,
                        padding:6,
                        textAlign:'left',
                        font: {
                            size: 10
                        }
                      }
                    },
                      tooltip: {
                          enabled: false,
                          external: function(tooltipModel) {
                            //console.log('tooltipModel:', tooltipModel);
                              // Tooltip Element -
                            },
                            callbacks: {
                                label: function(context) {
                              const el = document.querySelector('.popover');
                              //{value:context.raw,year:context.dataset.label,monthNo:context.dataIndex,month:context.element.label}
                                    el.innerHTML = returnDataExt({value:context.raw,year:context.dataset.label,monthNo:context.dataIndex,month:context.label});
                                  //  el.style.zindex = 5000;
                                    el.style.position = 'absolute';
                                    el.style.display = 'block';
                                    el.style.opacity = 1;
                                    el.style.top = context.element.y+'px';
                                    el.style.left = context.element.x*1+20+'px';
                                    if (context.element.x*1+150>=this._chart.width){
                                      el.style.left = context.element.x-270+'px';
                                    };
                                  //console.log(el,'<<label::',context);
                                  return;
                                  },
                              },
                          },
                      },
                  },
        });
      //  console.log(window.Chart,'drawraph;;',window.Chart.options,window.Chart.defaults);
        const oStyle = document.getElementById('myChart');
        oStyle.style.backgroundColor = 'rgba(0,0,0,0.4)';
        oStyle.style.color='white';

    }
    const sortData = function(data){
    //  console.log('sort data::', data);
      var iminYear = 0;
      var imaxYear = 0;
      var aDataSets = [];
      for (var i = 0; i < data.length; i++) {
        if (i === 0) {iminYear = parseInt(data[i].year);imaxYear = parseInt(data[i].year);}
        if (parseInt(data[i].year) < iminYear) {iminYear = parseInt(data[i].year);}

        if (parseInt(data[i].year) > imaxYear) {imaxYear = parseInt(data[i].year);}

      };
      const loopLength = (imaxYear - iminYear);

      //  console.log('iminYear::', iminYear, '  imaxYear::', imaxYear, '   loopLength::', loopLength, '   iThisYear::', iThisYear.getFullYear());

        for (var i = imaxYear; i >= iminYear; i--) {//loops through each year--max to min means the latest is on top!
          var colorNo = i.toString();
          colorNo = (colorNo.substring(2) * 5);

          //we have 14 years before 2020, gradient change the colour from white to yellow over 14 years
          //new plan, we draw out in 5 year blocks
          //starts at 2006 - 2010 - yellows
          //2011 - 2015 - greens
          //2016 - 2020 -blues
          //2020 - RED
          //2021 to current
          //use switch

          let sBGCol = '';
        //  console.log('switching::',i);
        switch (i) {
          case 2006:
            sBGCol = 'rgb(255,0,255,0.7)';
            break;
          case 2007:
            sBGCol = 'rgb(235,0,255,0.7)';
            break;
          case 2008:
            sBGCol = 'rgb(215,0,255,0.7)';
            break;
          case 2009:
            sBGCol = 'rgb(195,0,255,0.7)';
            break;
          case 2010:
            sBGCol = 'rgb(175,0,255,0.7)';
            break;
          case 2011:
            sBGCol = 'rgb(0,255,0,0.7)';
            break;
          case 2012:
            sBGCol = 'rgb(0,255,20,0.7)';
            break;
          case 2013:
            sBGCol = 'rgb(0,255,40,0.7)';
            break;
          case 2014:
            sBGCol = 'rgb(0,255,60,0.7)';
            break;
          case 2015:
            sBGCol = 'rgb(0,255,80,0.7)';
            break;
          case 2016:
            sBGCol = 'rgb(0,0,255,0.7)';
            break;
          case 2017:
            sBGCol = 'rgb(20,0,255,0.7)';
            break;
          case 2018:
            sBGCol = 'rgb(40,0,255,0.7)';
            break;
          case 2019:
            sBGCol = 'rgb(60,0,255,0.7)';
            break;
          case 2020:
            sBGCol = 'rgb(255,0,0,0.7)';
            break;
          case 2021:
            sBGCol = 'rgb(255,255,0,0.7)';
            break;
          case 2022:
            sBGCol = 'rgb(255,255,255,0.9)';//i know!
            break;
          case 2023:
            sBGCol = 'rgb(255,255,40,0.7)';
            break;
          case 2024:
            sBGCol = 'rgb(255,255,60,0.7)';
            break;
          case 2024:
            sBGCol = 'rgb(255,255,80,0.7)';
            break;
          case 2024:
            sBGCol = 'rgb(255,255,100,0.7)';
            break;
          case 2024:
            sBGCol = 'rgb(255,255,120,0.7)';
            break;
          default:
            sBGCol = 'rgb(255,255,140,0.7)';
        };


          var usedYear = i


          //do this then return dataset
          for (var j = 0; j < data.length; j++) {
            if (data[j].year === i && usedYear === i) {
              const sObject = {
                label: data[j].year,
                borderColor: sBGCol,
                data: dataReturn(i, data),
                hoverBorderColor:'rgba(0,255,0, 0.3)',
                hoverBorderWidth:30,
                pointBorderWidth:10,
                hitRadius:10
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
    const dataReturn = function(year, data) {
    //  console.log('dataamounts::', year);
      var aMonthlyData = [];
      for (var i = 1; i < 13; i++) {//return each months data
        var iamount = returnamounts(year, i, data);
        aMonthlyData.push(iamount);
      }
      //console.log('retiurning data for year::', JSON.stringify(aMonthlyData));
      return aMonthlyData;
    }
    const returnamounts = function(year, month, data) {
    //  var aReturnamounts = '';
      for (var i = 0; i < data.length; i++) {
        if (parseInt(data[i].year) === year && parseInt(data[i].month) === month) {
            var iReturn = data[i].amount;
            return iReturn;
            break;
        }
      }
      //return aReturnamounts;
      //  return [0, 10, 5, 2, 20, 30, 45, 0, 10, 5, 88, 20];
    }
    const returnGetData = (()=>{
        return window.fetch(okey.path, {
          method: 'GET',
          headers: okey.headers
        })
      .then(response => response.json())
        .then(data => {
          //console.log('returnGetData RETURN::',data)
          return data;
       })
       .catch(error => {
        //  toastSuccess("There was an error!");
          console.log("error::;", error);
       })
    });
    const getRandomNumber = function(hi, lo) {
        //returns a randon number between hi and lo
        return Math.floor(Math.random() * (hi - lo)) + lo;
    }

    const returnDataExt = function(data){
    //  console.log(aDAT,'<<returnDataExt::', data);
      //data={value:0,year:'',monthNo:0,month:''}
      //var ireturnMonthNo = returnMonthNo(month);
      for (var i = 0; i < aDAT.length; i++) {
        //console.log('comparing::' + aDAT[i].month + ' = ' + data.monthNo + ' year::'+ aDAT[i].year + ' = ' + data.year);
          if (aDAT[i].month === data.monthNo*1+1 && aDAT[i].year === data.year && aDAT[i].rType === 2) {
              var oReturnMobject = aDAT[i];
              var sflux = '+ ' + oReturnMobject.flux;
              if (oReturnMobject.flux < 0) {
                //sflux = '- ' + Math.abs(oReturnMobject.flux);
                sflux = oReturnMobject.flux;
              };
              const iPerc = (oReturnMobject.flux / oReturnMobject.lastyear) * 100;//gets the percentage rise from last year
                //console.log(oReturnMobject.lastyear,oReturnMobject.flux,'working the perc::')
              const thisRs = returnCumulative({year:data.year,month:data.month,monthNo:data.monthNo*1+1,thisRow:i,data:aDAT});
              const thatRs = returnCumulative({year:data.year-1,month:data.month,monthNo:data.monthNo*1+1,thisRow:i,data:aDAT});
              const diff = thisRs-thatRs;
              const percDif = (diff / thatRs) * 100;
            //  console.log(thisRs,thatRs,'<thisthat:',percDif);
              //(100 * iaverage * averagePeriod) / (icumulat);//gets the percentage rise from last data.year
              var sHTML = `<div class='popovercontent'>
                            <div class='toolTipInfo'><b>${data.month} ${data.year} : ${nwCs(data.value)}</b> deaths</div>`
                            if (data.year > ifirstYear){
                              sHTML += `<div class='toolTipInfo'>prev yr <i>(${data.month}&nbsp;${data.year-1})</i> : ${nwCs(oReturnMobject.lastyear)}\n deaths</div>
                              <div class='toolTipInfo'>fluctuation : ${nwCs(sflux)}&nbsp;(${iPerc.toFixed(2)}%)</div>
                              <div class='toolTipInfo'>cumulative : ${nwCs(thisRs)} in ${data.year}</div>
                              <div class='toolTipInfo'>${percDif.toFixed(2)}% (against prev yr: ${nwCs(thatRs)})&nbsp;</div>`;
                              sHTML += return5YearAvarage({year:data.year,month:data.month,monthNo:data.monthNo,amount:data.value});// `<div class='toolTipInfo'>get info</div>`      `
                            }
                  sHTML += `</div>`;
              return sHTML;
          };
      };
    };

    const returnMonthNo = function(month) {
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
    const returnCumulative=((data)=>{
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
    const return5YearAvarage = (function(data){
      //loop through dataset
//data = {year:year,month:month,monthNo:ireturnMonthNo}
//console.log('return5YearAvarage::',data);
      var averagePeriod = 5;
      const startYear = data.year-averagePeriod;
      if (startYear < ifirstYear){
        averagePeriod = averagePeriod-(ifirstYear-startYear);
      }
      const iTotal = data.year-startYear;
      var iaverage = 0;
      var icumulat = 0;
      var sHTML = ``;

      for (var i=data.year-1;i>=startYear;i--){
          for (var j=0;j<aDAT.length;j++){
            var iPerc = 0;
            //look forn the month of the year in // QUESTION:
      //    console.log('comparing year>>',aDAT[j].year,i,'  month>>',aDAT[j].month,data.month)
            if (aDAT[j].year===i&&aDAT[j].month===data.monthNo*1+1){
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
              const t = iaverage * averagePeriod;
              iPerc = (t / icumulat) * 100;//gets the percentage rise from last year
              //(100 * partialValue) / totalValue;
              return `<div class='toolTipInfo'>Avr last ${averagePeriod} years : ${sFlux}&nbsp;(${iPerc.toFixed(2)}%)</div>${sHTML}`;
          }
      }
    });
    const returnanualfiveYearavarage = (function(year,data){
    //objective to to return the 5 year previouse as a single figures
    //loop throughn data less than year and >
      var averagePeriod = 5;
      const startYear = year-averagePeriod;
      if (startYear < ifirstYear){
        averagePeriod = averagePeriod-(ifirstYear-startYear);
      }
    //  console.log(year,startYear,'<<start year  averagePeriod::',averagePeriod)
      const iTotal = year-startYear;
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


    const drawTabular = ((data)=>{
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
          if (data[i].label){

            sHTML += `<div class='tabRow ${sHighlight}'>
              <div class='tabBlock'>${data[i].label} : ${nwCs(returnYearTotal(data[i].data))} deaths</div>`;
              if (i < data.length-1){
                var row = i*1+1;
                var prevYr = returnYearTotal(data[row].data);
                var flux = returnYearTotal(data[i].data)-prevYr;
                var fluxPerc = (flux / prevYr) * 100;
                sHTML += `<div class='tabBlock'>fluctuation : ${nwCs(flux)}&nbsp;(${fluxPerc.toFixed(2)}%)</div>`
              }else{
                sHTML += `<div class='tabBlock'>fluxuation : no more data</div>`
              }
              sHTML += `</div>`
                    }
        }
      document.querySelector('.tabular').innerHTML = `<div class='yearEndHead'>Year End Figures</div>${sHTML}`;
    });
    const returnYearTotal = ((data)=>{
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
    const formatNumber = function(num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }

    function nwCs(num) {
    //  console.log('nwCs::',num)
      if(num){
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };
  };

    document.addEventListener('click',(event)=>{
      //console.log('click::',event.target);
      if (event.target.id!=='myChart'){
        if (!event.target.className.includes('popovercontent')){
          const el = document.querySelector('.popover');
          if (el){
            el.style.display = 'none';
          };
        };
      };
    })


    function kFormatter(num) {
        return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
    };

    let timeoutID = 0;
    let isHeld = false;
    document.addEventListener('touchstart',(event)=>{
      //event.preventDefault();
      event.stopPropagation();
      //console.log('touchstart::',event);
      if (event.target.id==='myChart'&&!isHeld){
        isHeld = true;
        timeoutID = setTimeout(function() {
          //console.log(timeoutID,isHeld,'<<touchstart ::',event,document.getElementsByTagName( 'html' ));
          var root = document.getElementsByTagName('html')[0];
          var el = document.querySelector('.pagetext');
          if (el){el.classList.add('lockBody');};
          root.classList.add('lockBody');
          document.body.classList.add('lockBody');
          return;
        }, 500);
        return;
        };
      });
    document.addEventListener('touchmove',(event)=>{
      //event.preventDefault();
      event.stopPropagation();
      //console.log(timeoutID,isHeld,'<<touchmove::',event);
      return;
    });
    document.addEventListener('touchend',(event)=>{
      isHeld = false;
      clearTimeout(timeoutID);
      var root = document.getElementsByTagName('html')[0];
      root.classList.remove('lockBody');
      var el = document.querySelector('.pagetext');
      if (el){el.classList.remove('lockBody');};
      document.body.classList.remove('lockBody');
    //  console.log(timeoutID,isHeld,'<<touchend::',event);
      return;
    });
