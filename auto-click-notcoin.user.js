// ==UserScript==
// @name         Auto-Click NOTCOIN
// @namespace    Violentmonkey Scripts
// @match        https://clicker.joincommunity.xyz/clicker*
// @version      1.1
// @author       mudachyo
// @description  18.03.2024, 04:40:59
// ==/UserScript==

(function() {
    'use strict';

    // Задержка перед началом клика
    setTimeout(click, 3000);

    async function click() {
        const globalScore = 1000; // Минимальное кол-во энергии для клика
        const countclicks = 34; // Количество кликов
        const coinElements = document.querySelectorAll('div[class^="_notcoin"]');
        const scoreElement = document.querySelector('div[class^="_scoreCurrent"]');
        let score = parseInt(scoreElement.textContent);

        try {
            // Попытка нажать на ракету, если она есть
            const rocketElements = document.querySelectorAll('img[class^="_root"]');
            rocketElements[0][Object.keys(rocketElements[0])[1]].onClick();
        } catch (error) {}

        for (let step = 0; step < countclicks; step++) {
            score = parseInt(scoreElement.textContent);

            if (score > globalScore) {
                try {
                    // Клик на монету
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

    // Повторять клик каждые 500 миллисекунд
    setInterval(click, 500);
})();
