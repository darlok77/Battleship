'use strict';

/**
 * Class BattleShip
 * @constructor
 */
var BattleShip = function BattleShip () {
  this._currentAction='';
  this._currentValue='';
  this.Impact='';
  this.tabCountShip=new Array(0,0,0,0,0);
  this.sumShipDown='';
  this.tabNb=new Array(2,3,3,4,5);
  this.tabShip=new Array("Destroyer","Submarine","Cruiser","Battleship","Carrier");
  
  this._initialize();
}

/**
 * Initialize
 * @return {BattleShip}
 */
BattleShip.prototype._initialize = function () {
  this.matrixGrid = [
               [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
               [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
               [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
               [0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0],
               [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0],
               [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0],
               [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0],
               [0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 4, 0],
               [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
               [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
               [0, 0, 0, 0, 0, 5, 5, 5, 5, 5, 0, 0],
               [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
              ];
  
  this._renderDisplayScreen(this.matrixGrid);
 // this._renderDisplayInfo(key);
  return this;
}

/**
 * Run
 * @return {BattleShip}
 */
BattleShip.prototype.run = function () {
  this._onClickDigits(function(key) {
    if (document.getElementById(key).style.backgroundColor == 'blue' || document.getElementById(key).style.backgroundColor == 'red'){
      alert('impossible to play here');
    }
    else{
      this._setCurrentAction(key);

      if (this._getAction(key)) {
        this._getAction(key)();
      }
    }
  }.bind(this));
  return this;
}

/**
 * Get action
 * @param {string} key
 * @return {function} actions[action]
 * @return {bool} false
 */
BattleShip.prototype._getAction = function (key) {
  
 var action = key.toLowerCase();
  var actions = {
    'fire': function () {
      
      if (this._currentAction == '') {
          alert('vous n\'avez pas séléctioner de case');
          return;
        }
      
     this.impact(this._currentAction);
     this._currentAction='';
      return;
    }.bind(this)
    
  };

  if (! actions[action]) {
    return false;
  }

  return actions[action];
}

/**
 * set current Action
 * @param {string} key
 * @return {bool} true/false
 */
BattleShip.prototype._setCurrentAction = function (key) {
  if (key === 'FIRE')  {
    return false;
  }

  this._currentAction = ! this._currentAction ? this._currentAction = key : this._currentAction = key;

  return false
}

/**
* On click digits
 * @param {function} callback
 * @return {BattleShip}
 */
BattleShip.prototype._onClickDigits = function (callback) {
  var elButtons = document.querySelectorAll('button');

  elButtons.forEach(function(elButton) {
    elButton.addEventListener('click', function(e) {
      callback(e.target.id);
    });
  });

  return this;
}


/**
 * Template display screen
 * @param [array] matrix
 * @return {string} dom
 */
BattleShip.prototype._tplDisplayScreen = function (matrix) {
    var dom = '<table>';
    var tab=['A','B','C','D','E','F','G','H','I','J','K','L'];
  
    dom += '<tr>';
    for(var i =0;i<13;i++){
      dom += '<td class = "position">'+i+'</td>';
      
    }
    for (var i=0; i<matrix.length; i++){
      
      dom += '<tr>'; //ligne
      dom+='<td class= "position">'+tab[i]+'</td>'
      
          for (var j=0; j<matrix[0].length; j++ ){
              
               var elList = '<td><button id ="'+i+' '+j+'" class = btnGrid style="background:black" value="'+matrix[i][j]+'"></button> </td>'; //colonne
               dom += elList;

          }
          dom = dom +' </tr>';
      }
      dom = dom +' </table>';

  return dom;
}


/**
 * Render display screen
 * @param [array] matrix
 * @return {BattleShip}
 */
BattleShip.prototype._renderDisplayScreen = function (matrix){
  
    var el = document.querySelector('.grid');
      el.innerHTML = this._tplDisplayScreen(matrix);

    return this;
}

/**
 * impact
 * @param {string} key 
 * @return {BattleShip}
 */
BattleShip.prototype.impact = function (key){
  
 


  if (document.getElementById(key).value == 0){
      document.getElementById(key).style.backgroundColor = 'blue';
      console.log('plouf');
    return;
  }
  document.getElementById(key).style.backgroundColor = 'red';
  
  for (var i=1;i<=5;i++){
     if (document.getElementById(key).value == i){
          this.tabCountShip[i-1]+=1;
       
        if (this.tabCountShip[i-1]==this.tabNb[i-1]){
            //this.sumShipDown+= (this.tabShip[i-1]);
           //this._renderDisplayInfo(this.sumShipDown);
           this._renderDisplayInfo(key);
        }
    }

  }
  console.log('Boom');
    return this;
}

/**
 * Template display Info
 * @param {string} key 
 * @return {string} dom
 */
BattleShip.prototype._tplDisplayInfo = function (key) {
  var dom = '';
  var countShipDestroy=0;
  
  for (var i=1;i<=5;i++){
  
      if (this.tabCountShip[i-1]==this.tabNb[i-1]){
        dom+= '<strike class= "Info">'+this.tabShip[i-1]+' ('+this.tabNb[i-1]+' cases)</strike><br>';
        countShipDestroy++;
      }
      else{
        dom+= '<p class= "Info">'+this.tabShip[i-1]+' ('+this.tabNb[i-1]+' cases)</p>';
      }
    
      if(countShipDestroy==5){
       dom= '<h3 class= "Info">Vous avez gagnez</h3>';
       }
  }
  
  return dom;
}
  /*  
  if(sumShipDown.length ==117){
    dom += '<p class=Info>'+sumShipDown+'</p>';
    dom += '<h3 class=Info>félicitation tous les bateaux sont coulés</h3>';
  }
  else{
    dom += '<p class=Info>'+sumShipDown+'</p>';
  }
  return dom;
}
*/

/**
 * Render display Info
 * @param {string} sumShipDown
 * @return {BattleShip}
 */
BattleShip.prototype._renderDisplayInfo = function (sumShipDown){
  
    var el = document.querySelector('.info');
      el.innerHTML = this._tplDisplayInfo(sumShipDown);

    return this;
}




var battleShip = new BattleShip();

battleShip.run();