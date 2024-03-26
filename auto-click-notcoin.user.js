// ==UserScript==
// @name         Auto-Click NOTCOIN
// @namespace    Violentmonkey Scripts
// @match        https://clicker.joincommunity.xyz/clicker*
// @version      1.2
// @author       mudachyo
// @description  26.03.2024, 21:40:01
// @downloadURL  https://github.com/mudachyo/notcoin-bot/raw/main/auto-click-notcoin.user.js
// @updateURL    https://github.com/mudachyo/notcoin-bot/raw/main/auto-click-notcoin.user.js
// @homepage     https://github.com/mudachyo/notcoin-bot
// @icon         https://cdn.joincommunity.xyz/clicker/moneta-small.png
// ==/UserScript==

(function() {
    'use strict';

    setTimeout(click, 3000); // Задержка перед началом клика. НЕ РЕКОМЕНДУЕТСЯ ТРОГАТЬ! // Delay before click start IT IS NOT RECOMMENDED TO TOUCH!

    async function click() {
        const globalScore = 1000; // Минимальное кол-во энергии для клика // Minimum amount of energy for a click
        const countclicks = 34; // Количество кликов // Number of clicks
        const coinElements = document.querySelectorAll('div[class^="_notcoin"]');
        const scoreElement = document.querySelector('div[class^="_scoreCurrent"]');
        let score = parseInt(scoreElement.textContent);

        try {
            // Попытка нажать на ракету, если она есть // Attempt to click on the rocket, if there is one
            const rocketElements = document.querySelectorAll('img[class^="_root"]');
            rocketElements[0][Object.keys(rocketElements[0])[1]].onClick();
        } catch (error) {}

        for (let step = 0; step < countclicks; step++) {
            score = parseInt(scoreElement.textContent);

            if (score > globalScore) {
                try {
                    // Клик на монету // Click on the coin
                    await new Promise((resolve) => {
                        coinElements[0][Object.keys(coinElements[0])[1]].onTouchStart('');
                        setTimeout(resolve, 100);
                    });
                } catch (error) {}
            } else {
                break;
            }
        }
    }

    setInterval(click, 500); // Повторять клик каждые 500 миллисекунд // Repeat the click every 500 milliseconds
})();
