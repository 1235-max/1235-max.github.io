// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const contentInput = document.getElementById('contentInput');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const clearBtn = document.getElementById('clearBtn');
    const sampleBtn = document.getElementById('sampleBtn');
    const resultsContainer = document.getElementById('resultsContainer');
    const progressIndicator = document.getElementById('progressIndicator');

    // Sample text for demonstration
    const sampleText = `Artificial intelligence (AI) has transformed numerous industries over the past decade. From healthcare to finance, transportation to entertainment, AI technologies are reshaping how businesses operate and how people interact with technology.

Machine learning, a subset of AI, enables systems to learn from data and improve without explicit programming. Deep learning, particularly neural networks with multiple layers, has driven recent breakthroughs in image recognition, natural language processing, and game playing.

The ethical implications of AI advancement remain significant concerns. Issues like algorithmic bias, privacy concerns, potential job displacement, and the long-term impacts of increasingly autonomous systems require careful consideration from technologists, policymakers, and society at large.

Despite these challenges, AI continues to offer tremendous potential benefits. Personalized medicine, more efficient resource allocation, enhanced educational tools, and solutions to complex global problems like climate change all stand to benefit from responsible AI development.

As we move forward, a balance between innovation and ethical governance will be crucial to ensuring that artificial intelligence remains a positive force in human progress.`;

    // Load sample text on page load
    contentInput.value = sampleText;
    contentInput.removeAttribute('readonly');

    // Button event listeners
    analyzeBtn.addEventListener('click', analyzeContent);
    clearBtn.addEventListener('click', clearContent);
    sampleBtn.addEventListener('click', loadSample);

    // Function to analyze content
    function analyzeContent() {
        if (contentInput.value.trim() === '') {
            alert('Please enter or load some content first!');
            return;
        }

        // Clear previous results
        resultsContainer.innerHTML = '';
        
        // Show analysis in progress
        simulateProgress();
        
        // Get the text to analyze
        const text = contentInput.value;
        
        // Perform analysis (with setTimeout to show the progress animation)
        setTimeout(() => {
            // Generate all analysis results
            generateReadabilityAnalysis(text);
            generateKeywordAnalysis(text);
            generateSentimentAnalysis(text);
            generateStatisticalAnalysis(text);
            generateToneAnalysis(text);
            generateStructureAnalysis(text);
        }, 500);
    }

    // Function to clear content
    function clearContent() {
        contentInput.value = '';
        resultsContainer.innerHTML = '';
        progressIndicator.style.width = '0%';
    }

    // Function to load sample text
    function loadSample() {
        contentInput.value = sampleText;
    }

    // Simulate progress bar animation
    function simulateProgress() {
        let width = 0;
        const interval = setInterval(() => {
            if (width >= 100) {
                clearInterval(interval);
            } else {
                width += 2;
                progressIndicator.style.width = width + '%';
            }
        }, 20);
    }

    // Function to create analysis card
    function createAnalysisCard(title, content) {
        const card = document.createElement('div');
        card.className = 'analysis-card';
        
        const cardTitle = document.createElement('h3');
        cardTitle.className = 'card-title';
        cardTitle.textContent = title;
        
        const dataContainer = document.createElement('div');
        dataContainer.className = 'data-container';
        dataContainer.innerHTML = content;
        
        card.appendChild(cardTitle);
        card.appendChild(dataContainer);
        
        resultsContainer.appendChild(card);
    }

    // Generate readability analysis
    function generateReadabilityAnalysis(text) {
        // Calculate readability metrics
        const words = text.match(/\b\w+\b/g) || [];
        const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
        const avgWordsPerSentence = (words.length / sentences.length).toFixed(1);
        
        // Calculate average word length
        let totalChars = 0;
        words.forEach(word => {
            totalChars += word.length;
        });
        const avgWordLength = (totalChars / words.length).toFixed(1);
        
        // Calculate approximate reading time (average reading speed: 200-250 words per minute)
        const readingTimeMinutes = (words.length / 225).toFixed(1);
        
        // Calculate rough readability score (simplified Flesch-Kincaid)
        let readabilityScore = 90.0 - (1.015 * avgWordsPerSentence) - (8.5 * (totalChars / words.length / 10));
        readabilityScore = Math.max(0, Math.min(100, readabilityScore)); // Clamp between 0-100
        
        let readabilityLevel;
        if (readabilityScore >= 90) readabilityLevel = "Very Easy";
        else if (readabilityScore >= 80) readabilityLevel = "Easy";
        else if (readabilityScore >= 70) readabilityLevel = "Fairly Easy";
        else if (readabilityScore >= 60) readabilityLevel = "Standard";
        else if (readabilityScore >= 50) readabilityLevel = "Fairly Difficult";
        else if (readabilityScore >= 30) readabilityLevel = "Difficult";
        else readabilityLevel = "Very Difficult";
        
        const content = `
            <div class="stat-item"><span>Reading Level:</span> <span>${readabilityLevel}</span></div>
            <div class="stat-item"><span>Reading Time:</span> <span>${readingTimeMinutes} min</span></div>
            <div class="stat-item"><span>Words per Sentence:</span> <span>${avgWordsPerSentence}</span></div>
            <div class="stat-item"><span>Average Word Length:</span> <span>${avgWordLength} chars</span></div>
            <div class="stat-item"><span>Readability Score:</span> <span>${readabilityScore.toFixed(1)}/100</span></div>
        `;
        
        createAnalysisCard('Readability Analysis', content);
    }

    // Generate keyword analysis
    function generateKeywordAnalysis(text) {
        // Process text to find keywords
        const words = text.toLowerCase().match(/\b\w{3,}\b/g) || [];
        const stopWords = ["the", "and", "that", "have", "for", "not", "with", "this", "from", "are", "were", "has", "been", "their", "these", "those"];
        
        // Count word frequency, excluding stop words
        const wordCount = {};
        words.forEach(word => {
            if (!stopWords.includes(word)) {
                wordCount[word] = (wordCount[word] || 0) + 1;
            }
        });
        
        // Sort by frequency
        const sortedWords = Object.entries(wordCount)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10);
        
        let content = '';
        sortedWords.forEach(([word, count]) => {
            const percentage = ((count / words.length) * 100).toFixed(1);
            content += `<div class="stat-item"><span>${word}</span> <span>${count} (${percentage}%)</span></div>`;
        });
        
        createAnalysisCard('Keyword Analysis', content);
    }

    // Generate sentiment analysis
    function generateSentimentAnalysis(text) {
        // Simple sentiment analysis
        const positiveWords = ["advancement", "transformed", "reshaping", "improvement", "breakthroughs", "benefits", "positive", "tremendous", "enhanced", "efficient", "responsible", "progress"];
        const negativeWords = ["concerns", "challenges", "bias", "displacement", "issues", "problems"];
        
        // Count sentiment words
        let positiveCount = 0;
        let negativeCount = 0;
        
        const words = text.toLowerCase().match(/\b\w+\b/g) || [];
        words.forEach(word => {
            if (positiveWords.includes(word)) positiveCount++;
            if (negativeWords.includes(word)) negativeCount++;
        });
        
        // Calculate sentiment score (-100 to 100)
        const totalSentimentWords = positiveCount + negativeCount;
        let sentimentScore = 0;
        if (totalSentimentWords > 0) {
            sentimentScore = Math.round(((positiveCount - negativeCount) / totalSentimentWords) * 100);
        }
        
        let sentimentCategory;
        if (sentimentScore >= 60) sentimentCategory = "Very Positive";
        else if (sentimentScore >= 20) sentimentCategory = "Positive";
        else if (sentimentScore > -20) sentimentCategory = "Neutral";
        else if (sentimentScore > -60) sentimentCategory = "Negative";
        else sentimentCategory = "Very Negative";
        
        const content = `
            <div class="stat-item"><span>Overall Sentiment:</span> <span>${sentimentCategory}</span></div>
            <div class="stat-item"><span>Sentiment Score:</span> <span>${sentimentScore}</span></div>
            <div class="stat-item"><span>Positive Words:</span> <span>${positiveCount}</span></div>
            <div class="stat-item"><span>Negative Words:</span> <span>${negativeCount}</span></div>
        `;
        
        createAnalysisCard('Sentiment Analysis', content);
    }

    // Generate statistical analysis
    function generateStatisticalAnalysis(text) {
        const characterCount = text.length;
        const charactersNoSpaces = text.replace(/\s/g, '').length;
        const words = text.match(/\b\w+\b/g) || [];
        const wordCount = words.length;
        const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
        const sentenceCount = sentences.length;
        const paragraphs = text.split(/\n\s*\n/).filter(paragraph => paragraph.trim().length > 0);
        const paragraphCount = paragraphs.length;
        
        const content = `
            <div class="stat-item"><span>Characters:</span> <span>${characterCount}</span></div>
            <div class="stat-item"><span>Characters (no spaces):</span> <span>${charactersNoSpaces}</span></div>
            <div class="stat-item"><span>Words:</span> <span>${wordCount}</span></div>
            <div class="stat-item"><span>Sentences:</span> <span>${sentenceCount}</span></div>
            <div class="stat-item"><span>Paragraphs:</span> <span>${paragraphCount}</span></div>
        `;
        
        createAnalysisCard('Statistical Analysis', content);
    }

    // Generate tone analysis
    function generateToneAnalysis(text) {
        // Simplified tone detection
        const formalWords = ["furthermore", "consequently", "therefore", "additionally", "however", "nevertheless", "significant", "implications", "consideration", "ethical"];
        const casualWords = ["like", "just", "pretty", "kind of", "sort of", "basically", "actually", "really", "stuff", "things"];
        const technicalWords = ["algorithm", "neural", "networks", "technological", "systems", "autonomous", "programming", "implementation"];
        const persuasiveWords = ["must", "should", "need", "crucial", "essential", "important", "necessary", "significant", "critical"];
        
        const words = text.toLowerCase().match(/\b\w+\b/g) || [];
        let formalCount = 0, casualCount = 0, technicalCount = 0, persuasiveCount = 0;
        
        words.forEach(word => {
            if (formalWords.includes(word)) formalCount++;
            if (casualWords.includes(word)) casualCount++;
            if (technicalWords.includes(word)) technicalCount++;
            if (persuasiveWords.includes(word)) persuasiveCount++;
        });
        
        // Calculate tone percentages
        const totalToneWords = formalCount + casualCount + technicalCount + persuasiveCount;
        const formalPercent = totalToneWords > 0 ? Math.round((formalCount / totalToneWords) * 100) : 0;
        const casualPercent = totalToneWords > 0 ? Math.round((casualCount / totalToneWords) * 100) : 0;
        const technicalPercent = totalToneWords > 0 ? Math.round((technicalCount / totalToneWords) * 100) : 0;
        const persuasivePercent = totalToneWords > 0 ? Math.round((persuasiveCount / totalToneWords) * 100) : 0;
        
        // Determine dominant tone
        let dominantTone = "Neutral";
        let maxCount = 0;
        
        if (formalCount > maxCount) {
            maxCount = formalCount;
            dominantTone = "Formal";
        }
        if (casualCount > maxCount) {
            maxCount = casualCount;
            dominantTone = "Casual";
        }
        if (technicalCount > maxCount) {
            maxCount = technicalCount;
            dominantTone = "Technical";
        }
        if (persuasiveCount > maxCount) {
            dominantTone = "Persuasive";
        }
        
        const content = `
            <div class="stat-item"><span>Dominant Tone:</span> <span>${dominantTone}</span></div>
            <div class="stat-item"><span>Formal:</span> <span>${formalPercent}%</span></div>
            <div class="stat-item"><span>Technical:</span> <span>${technicalPercent}%</span></div>
            <div class="stat-item"><span>Persuasive:</span> <span>${persuasivePercent}%</span></div>
            <div class="stat-item"><span>Casual:</span> <span>${casualPercent}%</span></div>
        `;
        
        createAnalysisCard('Tone Analysis', content);
    }

    // Generate structure analysis
    function generateStructureAnalysis(text) {
        const paragraphs = text.split(/\n\s*\n/).filter(paragraph => paragraph.trim().length > 0);
        const paragraphCount = paragraphs.length;
        
        // Analyze paragraph lengths
        let shortParagraphs = 0;  // < 50 words
        let mediumParagraphs = 0; // 50-100 words
        let longParagraphs = 0;   // > 100 words
        
        let paragraphLengths = [];
        paragraphs.forEach(paragraph => {
            const wordCount = (paragraph.match(/\b\w+\b/g) || []).length;
            paragraphLengths.push(wordCount);
            
            if (wordCount < 50) shortParagraphs++;
            else if (wordCount <= 100) mediumParagraphs++;
            else longParagraphs++;
        });
        
        // Calculate average paragraph length
        const totalWords = paragraphLengths.reduce((sum, length) => sum + length, 0);
        const avgParagraphLength = paragraphCount > 0 ? Math.round(totalWords / paragraphCount) : 0;
        
        // Check for introduction and conclusion
        const hasIntro = paragraphCount > 0 && paragraphLengths[0] < 100;
        const hasConclusion = paragraphCount > 1 && paragraphLengths[paragraphLengths.length - 1] < 100;
        
        const content = `
            <div class="stat-item"><span>Total Paragraphs:</span> <span>${paragraphCount}</span></div>
            <div class="stat-item"><span>Avg Paragraph Length:</span> <span>${avgParagraphLength} words</span></div>
            <div class="stat-item"><span>Short Paragraphs:</span> <span>${shortParagraphs}</span></div>
            <div class="stat-item"><span>Medium Paragraphs:</span> <span>${mediumParagraphs}</span></div>
            <div class="stat-item"><span>Long Paragraphs:</span> <span>${longParagraphs}</span></div>
            <div class="stat-item"><span>Has Introduction:</span> <span>${hasIntro ? 'Yes' : 'No'}</span></div>
            <div class="stat-item"><span>Has Conclusion:</span> <span>${hasConclusion ? 'Yes' : 'No'}</span></div>
        `;
        
        createAnalysisCard('Structure Analysis', content);
    }
});