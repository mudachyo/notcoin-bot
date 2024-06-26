// ==UserScript==
// @name         Auto-Click NOTCOIN
// @namespace    Violentmonkey Scripts
// @match        https://clicker.joincommunity.xyz/clicker*
// @version      2.2
// @author       mudachyo
// @description  30.03.2024, 22:25:34
// @downloadURL  https://github.com/mudachyo/notcoin-bot/raw/main/auto-click-notcoin.user.js
// @updateURL    https://github.com/mudachyo/notcoin-bot/raw/main/auto-click-notcoin.user.js
// @homepage     https://github.com/mudachyo/notcoin-bot
// @icon         https://cdn.joincommunity.xyz/clicker/moneta-small.png
// ==/UserScript==

(function() {
    'use strict';

    // Configuration options
    const minimumEnergyForClick = 900; // Minimum energy required to perform a click on the coin
    const min_click_count = 30; // Minimum number of clicks to perform in each auto-click cycle
    const max_click_count = 100; // Maximum number of clicks to perform in each auto-click cycle
    const clickInterval = 500; // Time interval (in milliseconds) between auto-click cycles

    // Log startup message with configuration details, applying style to each line
    console.log("%c[NotCoin Auto-Click]", "background: #a87e00; color: #fff; padding: 5px;");
    console.log("%cScript attempting to start with the following settings:", "background: #a87e00; color: #fff; padding: 5px;");
    console.log(`%c- Minimum energy for click: ${minimumEnergyForClick}`, "background: #a87e00; color: #fff; padding: 5px;");
    console.log(`%c- Minimum clicks per cycle: ${min_click_count}`, "background: #a87e00; color: #fff; padding: 5px;");
    console.log(`%c- Maximum clicks per cycle: ${max_click_count}`, "background: #a87e00; color: #fff; padding: 5px;");
    console.log(`%c- Click interval: ${clickInterval} milliseconds`, "background: #a87e00; color: #fff; padding: 5px;");

    // Function to click on the coin element
    async function clickCoin() {
        try {
            const coinElement = document.querySelector('div[class^="_notcoin"]');
            if (coinElement) {
                await new Promise((resolve) => {
                    coinElement[Object.keys(coinElement)[1]].onTouchStart('');
                    setTimeout(resolve, 100);
                });
            }
        } catch (error) {}
    }

    // Function to click on the rocket element, if it exists
    async function clickRocket() {
        const rocketElement = document.querySelector('img[class^="_root"]');
        if (rocketElement) {
            try {
                rocketElement[Object.keys(rocketElement)[1]].onClick();
            } catch (error) {
                console.error("%c[NotCoin Auto-Click]", "background: #a87e00; color: #fff; padding: 5px;", 'Error clicking rocket:', error);
            }
        }
    }

    // Main function to perform the auto-clicking
    async function autoClick() {
        const scoreElement = document.querySelector('div[class^="_scoreCurrent"]');
        let currentScore = parseInt(scoreElement.textContent);

        // Click on the rocket first, if available
        await clickRocket();

        // Generate a random number of clicks between min and max
        const numberOfClicks = Math.floor(Math.random() * (max_click_count - min_click_count + 1)) + min_click_count;

        // Log the start of the auto-click cycle

        // Click on the coin repeatedly until the energy is depleted or the click count is reached
        for (let i = 0; i < numberOfClicks; i++) {
            if (currentScore > minimumEnergyForClick) {
                await clickCoin();
                currentScore = parseInt(scoreElement.textContent);
                console.log("%c[NotCoin Auto-Click]", "background: #a87e00; color: #fff; padding: 5px;", `Made a click on the coin.`);
            } else {
                break;
            }
        }
    }

    // Repeat the auto-clicking process every clickInterval milliseconds
    setInterval(autoClick, clickInterval);
})();