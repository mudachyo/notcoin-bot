// ==UserScript==
// @name         Auto-Click NOTCOIN
// @namespace    Violentmonkey Scripts
// @match       https://clicker.joincommunity.xyz/clicker*
// @version     1.0
// @author      mudachyo
// @description 09.01.2024, 01:15:41
// ==/UserScript==

(function() {
    'use strict';

    setTimeout(click, 3000);

    async function click() {
        let globalscore = 1000;
        let countclicks = 34;
        let cc = document.querySelectorAll('div[class^="_notcoin"]');
        let scoreElement = document.querySelector('div[class^="_scoreCurrent"]');
        let score = parseInt(scoreElement.textContent);

        try {
            let imrocket = document.querySelectorAll('img[class^="_root"]');
            imrocket[0][Object.keys(imrocket[0])[1]].onClick();
        } catch (error) {}

        for (let step = 0; step < countclicks; step++) {
            score = parseInt(scoreElement.textContent);

            if (score > globalscore) {
                try {
                    await new Promise((resolve) => {
                        cc[0][Object.keys(cc[0])[1]].onTouchStart('');
                        setTimeout(resolve, 100);
                    });
                } catch (error) {}
            } else {
                break;
            }
        }
    }

    setInterval(click, 500);
})();
