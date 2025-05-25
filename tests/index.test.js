
const fs = require('fs');
const path = require('path');

// 1) Load the HTML into JSDOM _before_ requiring your app code
document.body.innerHTML = fs.readFileSync(
  path.resolve(__dirname, '../index.html'),
  'utf-8'
);

// 2) Now require your module so its getElementById/addEventListener calls find real elements
const { displayWordData, displayError } = require('../index.js');
const results = document.getElementById('results');

describe('Wordly SPA DOM Manipulation', () => {
  beforeEach(() => {
    results.innerHTML = '';
  });

  test('displayError shows error message', () => {
    displayError('Test error');
    expect(results.querySelector('.error').textContent).toBe('Test error');
  });

  test('displayWordData renders word entry', () => {
    const sampleEntry = {
      word: 'test',
      phonetics: [{ text: '/tɛst/', audio: '' }],
      meanings: [
        {
          partOfSpeech: 'noun',
          definitions: [
            { definition: 'A procedure intended to establish quality.', example: 'A spelling test.' }
          ],
          synonyms: ['trial']
        }
      ],
      sourceUrls: ['https://example.com']
    };

    displayWordData(sampleEntry);
    expect(results.querySelector('.result-word').textContent).toContain('test');
    expect(results.querySelector('.part-of-speech').textContent).toBe('noun');
    expect(results.querySelectorAll('.definition li').length).toBe(1);
    expect(results.querySelector('.synonyms').textContent).toContain('trial');
  });
});