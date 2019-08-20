// ==UserScript==
// @name         Jstris TGM Sounds
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  adds tgm sounds for jstris
// @author       NueSB
// @match        https://*.jstris.jezevec10.com/*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';
  window.addEventListener('load', function() {
      /*
    Game["prototype"]["moveCurrentBlock"] = function(_0xb09ex34, _0xb09ex35, _0xb09ex36) {
      if (!_0xb09ex35) {
        this["finesse"]++
      };
      _0xb09ex34 *= this["blockSets"][this["activeBlock"]["set"]]["step"];
      if (!this["checkIntersection"](this["activeBlock"]["pos"]["x"] + _0xb09ex34, this["activeBlock"]["pos"]["y"], null)) {
        this["activeBlock"]["pos"]["x"] = this["activeBlock"]["pos"]["x"] + _0xb09ex34;
        this["lastAction"] = _0xb09ex36;
        this["updateGhostPiece"](true);
        this["redraw"]();
        this["playSound"]("move")
        return true
      };
      return false
    };*/

    let pieceSounds = {};
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
    function playSound(s) {
      if (!s.paused && s.currentTime > 0) {
        s.currentTime = 0;
      } else s.play();
    }

    function initSounds(dest, srclist) {
      for (let i in srclist) {
        dest[i] = document.createElement("audio");
        dest[i].src = srclist[i];
        dest[i].volume = 0.1;
      }
    }

    function TGMSound(id) {
      if (pieceSounds[id] === undefined)
      {
          playSound(pieceSounds[id % 7]);
          return;
      }
      playSound(pieceSounds[id]);
    }
    initSounds(pieceSounds, srcs);

    Game["prototype"]["updateQueueBox"] = function() {
      if (!this["ISGAME"] && (this["v"]["redrawBlocked"] || !this["v"]["QueueHoldEnabled"])) {
        return
      };
      this["v"]["clearQueueCanvas"]();
      TGMSound(this.queue[0].id);
      if (Math.floor(Math.random() * 3) === 3) playSound(pieceSounds[7]);
      let _0xb09ex106 = 0;
      for (var _0xb09exc = 0; _0xb09exc < this["showPreviews"]; _0xb09exc++) {
        if (_0xb09exc >= this["queue"]["length"]) {
          break
        };
        var _0xb09exdd = this["queue"][_0xb09exc];
        var _0xb09ex2d = this["blockSets"][_0xb09exdd["set"]]["previewAs"],
          _0xb09ex2e = _0xb09ex2d["blocks"][_0xb09exdd["id"]]["blocks"][0],
          _0xb09ex107 = _0xb09ex2d["blocks"][_0xb09exdd["id"]]["color"],
          _0xb09ex108 = (!_0xb09ex2d["equidist"]) ? _0xb09ex2d["blocks"][_0xb09exdd["id"]]["yp"] : [0, 3],
          _0xb09ex2f = _0xb09ex2e["length"],
          _0xb09ex109 = (_0xb09ex2d["blocks"][_0xb09exdd["id"]]["xp"]) ? _0xb09ex2d["blocks"][_0xb09exdd["id"]]["xp"] : [0, _0xb09ex2f - 1];
        for (var _0xb09ex10 = _0xb09ex108[0]; _0xb09ex10 <= _0xb09ex108[1]; _0xb09ex10++) {
          for (var _0xb09ex11 = _0xb09ex109[0]; _0xb09ex11 <= _0xb09ex109[1]; _0xb09ex11++) {
            if (_0xb09ex2e[_0xb09ex10][_0xb09ex11] === 1) {
              this["v"]["drawBlockOnCanvas"](_0xb09ex11 - _0xb09ex109[0], _0xb09ex10 - _0xb09ex108[0] + _0xb09ex106, _0xb09ex107, this["v"].QUEUE)
            }
          }
        };
        if (_0xb09ex2d["equidist"]) {
          _0xb09ex106 += 3
        } else {
          _0xb09ex106 += _0xb09ex108[1] - _0xb09ex108[0] + 2
        }
      }
    };
  })();
})();
