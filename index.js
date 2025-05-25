const form = document.getElementById('search-form');
const input = document.getElementById('word-input');
const results = document.getElementById('results');

form.addEventListener('submit', async event => {
  event.preventDefault();
  const word = input.value.trim();
  if (!word) return;
  results.innerHTML = '<p>Loading&hellip;</p>';

  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    if (!response.ok) {
      throw new Error(response.status === 404 ? 'Word not found' : 'Server error');
    }
    const data = await response.json();
    displayWordData(data[0]);
  } catch (err) {
    displayError(err.message);
  }
});

function displayWordData(entry) {
  const { word, phonetics, meanings, sourceUrls } = entry;
  const phon = phonetics.find(p => p.text)?.text || '';
  const audioUrl = phonetics.find(p => p.audio)?.audio || '';

  let html = `
    <div class="result-word">${word} <span class="phonetic">${phon}</span></div>
  `;

  if (audioUrl) {
    html += `<audio controls src="${audioUrl}">Your browser does not support audio.</audio>`;
  }

  meanings.forEach(meaning => {
    html += `
      <div class="part-of-speech">${meaning.partOfSpeech}</div>
      <ul class="definition">
        ${meaning.definitions.map(d => `<li>${d.definition}${d.example ? `<br><em>“${d.example}”</em>` : ''}</li>`).join('')}
      </ul>
    `;
    if (meaning.synonyms.length) {
      html += `<div class="synonyms"><strong>Synonyms:</strong> ${meaning.synonyms.join(', ')}</div>`;
    }
  });

  html += `<div class="source"><small>Source: <a href="${sourceUrls[0]}" target="_blank">${sourceUrls[0]}</a></small></div>`;

  results.innerHTML = html;
}

function displayError(message) {
  results.innerHTML = `<p class="error">${message}</p>`;
}

// Export for testing
if (typeof module !== 'undefined') {
  module.exports = { displayWordData, displayError };
}