
(() => {
    'use strict';

    function countUniqueWords(wordList) {
        const uniqueWordList = new Set(wordList); // Set contains only unique values
        const uniqueWordAmount = uniqueWordList.size;
        const uniqueWordsPercentage = Math.round(100 * uniqueWordAmount / wordList.length);

        return {
            uniqueWordsPercentage,
            uniqueWordAmount,
        };
    }

    const splitParasRe = /\n+/;
    const splitSentencesRe = /[.?!\n]+/;
    const processingWordsRe = /(\w)[-_'](\w)/gi;
    const processingDigitsRe = /(\d)[,.](\d)/gi;
    const splitWordsRe = /[\s\n]+/;

    function round(num) {
        return parseFloat(num.toFixed(1));
    }

    function calculateStats(text) {
        const wordStats = {
            avgSentenceLength: 0,
            avgWordLength: 0,
            sentenceAmount: 0,
            wordAmount: 0,
            paragraphAmount: 0,
        };

        const trimmedText = text.trim();
        const processingTrimmedText = trimmedText
            .replace(processingWordsRe, '$10$2')
            .replace(processingDigitsRe, '$10$2');
        const wordList = processingTrimmedText.split(splitWordsRe);
        const joinedWords = wordList.join('');

        wordStats.charactersAmount = trimmedText.length;
        wordStats.charactersAmountWithoutSpaces = joinedWords.length;

        if (trimmedText.length > 0) {
            wordStats.paragraphAmount = trimmedText.split(splitParasRe).length;
        }

        if (processingTrimmedText.length > 0) {
            wordStats.sentenceAmount = processingTrimmedText.split(splitSentencesRe).length;
            wordStats.wordAmount = wordList.length;
        }

        if (wordStats.sentenceAmount !== 0) {
            wordStats.avgSentenceLength = round(wordStats.wordAmount / wordStats.sentenceAmount);
        }

        if (wordStats.wordAmount !== 0) {
            const avgWordLength = joinedWords.length / wordStats.wordAmount;
            wordStats.avgWordLength = round(avgWordLength);
        }

        Object.assign(
            wordStats,
            countUniqueWords(wordList)
        );

        return wordStats;
    }

    window.calculateStats = calculateStats;
})();