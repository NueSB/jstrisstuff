// ==UserScript==
// @name         Jstris TGM Sounds
// @namespace    http://tampermonkey.net/
// @version      1.4
// @description  adds tgm sounds for jstris
// @author       NueSB
// @match        https://*.jstris.jezevec10.com/*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';
  window.addEventListener('load', function() {

    Game['pieceSounds'] = {};
    let srcs = {
      0: "https://cdn.discordapp.com/attachments/235512056588140546/557815203677470730/SEB_mino7.wav",
      1: "https://cdn.discordapp.com/attachments/235512056588140546/557815184010379264/SEB_mino1.wav",
      2: "https://cdn.discordapp.com/attachments/235512056588140546/557815201324335104/SEB_mino6.wav",
      3: "https://cdn.discordapp.com/attachments/235512056588140546/557815194756317184/SEB_mino3.wav",
      4: "https://cdn.discordapp.com/attachments/235512056588140546/557815192033951745/SEB_mino2.wav",
      5: "https://cdn.discordapp.com/attachments/235512056588140546/557815199294291971/SEB_mino5.wav",
      6: "https://cdn.discordapp.com/attachments/235512056588140546/557815196920578058/SEB_mino4.wav",
      7: "https://cdn.discordapp.com/attachments/235512056588140546/558050338188558336/ITEM01.wav"
    };

    Game['playTGMSound'] = function(s) {
      if (!s.paused && s.currentTime > 0) {
        s.currentTime = 0;
      } else s.play();
    }

    Game['initTGMSounds'] = function(dest, srclist) {
      for (let i in srclist) {
        dest[i] = document.createElement("audio");
        dest[i].src = srclist[i];
        dest[i].volume = 0.1;
      }
    }

    Game['TGMSound'] = function(id) {
      if (Game['pieceSounds'][id] === undefined)
      {
          Game['playTGMSound'](Game['pieceSounds'][id % 7]);
          return;
      }
      Game['playTGMSound'](Game['pieceSounds'][id]);
    }

    Game['initTGMSounds'](Game['pieceSounds'], srcs);
    if(typeof trim != "function"){var trim=a=>{a=a.slice(0,-1);a=a.substr(a.indexOf("{")+1);return a}}

    let updateBox = trim(Game['prototype']['updateQueueBox'].toString());
    let tgcode = `Game['TGMSound'](this.queue[0].id);`
    Game['prototype']['updateQueueBox'] = new Function(tgcode + updateBox);
  });
})();
