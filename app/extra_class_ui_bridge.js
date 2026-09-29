/* Общий мост UI для закрытой ветки Extra-классов. */
(function(g){
  'use strict';
  function refresh(){
    var h=g.currentCharacter||g.currentChar;
    if(!h)return;
    if(typeof g.renderParasiteExtraPanel==='function')g.renderParasiteExtraPanel(h);
    if(typeof g.renderWalterParasitePanel==='function')g.renderWalterParasitePanel(h);
    if(typeof g.renderGhostExtraPanel==='function')g.renderGhostExtraPanel(h);
  }
  g.refreshExtraClassPanels=refresh;
  if(g.addEventListener)g.addEventListener('DOMContentLoaded',function(){
    setTimeout(refresh,250);
    setInterval(refresh,1200);
  });
})(window);
