const CPS_INCREMENT = 1;
const CPS_INTERVAL = 1000;
const HEAD_SIZE = 50;
const EYE_SIZE = 7.5;
const X_POS = 150;
const Y_POS = 62.5;

document.addEventListener("DOMContentLoaded", () => {
  let characters = document.getElementById("characters");
  let characterCount = Number(characters.innerHTML);
  let wordCount = document.getElementById("wordCount");
  let autoCost = Number(document.getElementById("autoCost").innerHTML)
  let wordCost = Number(document.getElementById("wordCost").innerHTML)
  let cps = 0;
  let cpsCount = document.getElementById("cps");
  let cpsInterval = setInterval(cpsFunction, CPS_INTERVAL);

  let lastLetter = document.getElementById("curLetter");

  let upgrade = 1;

  
  //draw face features (eyes, head, and smile)
  drawFeatures();

  const cells = document.querySelectorAll('#wordtable td'); //array list 
  const closeInstructions = document.getElementById("closeInstructions");
  const openInstructions = document.getElementById("openInstructions");

  closeInstructions.addEventListener('click', function () {
    toggle_instruction_visibility("instructionsPosition");
  })

  openInstructions.addEventListener('click', function () {
    toggle_instruction_visibility("instructionsPosition");
  })

  function toggle_instruction_visibility(id) {
    var e = document.getElementById(id);
    if (e.style.display == 'block')
      e.style.display = 'none';
    else
      e.style.display = 'block';

  }




  const words = [
    'ability', 'able', 'about', 'above', 'accept', 'according', 'account', 'across', 'act', 'action',
    'activity', 'actually', 'add', 'address', 'administration', 'admit', 'adult', 'affect', 'after', 'again',
    'against', 'age', 'agency', 'agent', 'ago', 'agree', 'agreement', 'ahead', 'air', 'all', 'allow',
    'almost', 'alone', 'along', 'already', 'also', 'although', 'always', 'American', 'among', 'amount',
    'analysis', 'and', 'animal', 'another', 'answer', 'any', 'anyone', 'anything', 'appear', 'apply',
    'approach', 'area', 'argue', 'arm', 'around', 'arrive', 'art', 'article', 'artist', 'as', 'ask',
    'assume', 'at', 'attack', 'attention', 'attorney', 'audience', 'author', 'authority', 'available',
    'avoid', 'away', 'baby', 'back', 'bad', 'bag', 'ball', 'bank', 'bar', 'base', 'be', 'beat', 'beautiful',
    'because', 'become', 'bed', 'before', 'begin', 'behavior', 'behind', 'believe', 'benefit', 'best',
    'better', 'between', 'beyond', 'big', 'bill', 'billion', 'bit', 'black', 'blood', 'blue', 'board',
    'body', 'book', 'born', 'both', 'box', 'boy', 'break', 'bring', 'brother', 'budget', 'build', 'building',
    'business', 'but', 'buy', 'by', 'call', 'camera', 'campaign', 'can', 'cancer', 'candidate', 'capital',
    'car', 'card', 'care', 'career', 'carry', 'case', 'catch', 'cause', 'cell', 'center', 'central',
    'century', 'certain', 'certainly', 'chair', 'challenge', 'chance', 'change', 'character', 'charge',
    'check', 'child', 'choice', 'choose', 'church', 'citizen', 'city', 'civil', 'claim', 'class', 'clear',
    'clearly', 'close', 'coach', 'cold', 'collection', 'college', 'color', 'come', 'commercial', 'common',
    'community', 'company', 'compare', 'computer', 'concern', 'condition', 'conference', 'Congress',
    'consider', 'consumer', 'contain', 'continue', 'control', 'cost', 'could', 'country', 'couple', 'course',
    'court', 'cover', 'create', 'crime', 'cultural', 'culture', 'cup', 'current', 'customer', 'cut', 'dark',
    'data', 'daughter', 'day', 'dead', 'deal', 'death', 'debate', 'decade', 'decide', 'decision', 'deep',
    'defense', 'degree', 'Democrat', 'democratic', 'describe', 'design', 'despite', 'detail', 'determine',
    'develop', 'development', 'die', 'difference', 'different', 'difficult', 'dinner', 'direction',
    'director', 'discover', 'discuss', 'discussion', 'disease', 'do', 'doctor', 'dog', 'door', 'down', 'draw',
    'dream', 'drive', 'drop', 'drug', 'during', 'each', 'early', 'east', 'easy', 'eat', 'economic', 'economy',
    'edge', 'education', 'effect', 'effort', 'eight', 'either', 'election', 'else', 'employee', 'end',
    'energy', 'enjoy', 'enough', 'enter', 'entire', 'environment', 'environmental', 'especially', 'establish',
    'even', 'evening', 'event', 'ever', 'every', 'everybody', 'everyone', 'everything', 'evidence',
    'exactly', 'example', 'executive', 'exist', 'expect', 'experience', 'expert', 'explain', 'eye', 'face',
    'fact', 'factor', 'fail', 'fall', 'family', 'far', 'fast', 'father', 'fear', 'federal', 'feel', 'feeling',
    'few', 'field', 'fight', 'figure', 'fill', 'film', 'final', 'finally', 'financial', 'find', 'fine',
    'finger', 'finish', 'fire', 'firm', 'first', 'fish', 'five', 'floor', 'fly', 'focus', 'follow', 'food',
    'foot', 'for', 'force', 'foreign', 'forget', 'form', 'former', 'forward', 'four', 'free', 'friend',
    'from', 'front', 'full', 'fund', 'future', 'game', 'garden', 'gas', 'general', 'generation', 'get',
    'girl', 'give', 'glass', 'go', 'goal', 'good', 'government', 'great', 'green', 'ground', 'group', 'grow',
    'growth', 'guess', 'gun', 'guy', 'hair', 'half', 'hand', 'hang', 'happen', 'happy', 'hard', 'have', 'he',
    'head', 'health', 'hear', 'heart', 'heat', 'heavy', 'help', 'her', 'here', 'herself', 'high', 'him',
    'himself', 'his', 'history', 'hit', 'hold', 'home', 'hope', 'hospital', 'hot', 'hotel', 'hour', 'house',
    'how', 'however', 'huge', 'human', 'hundred', 'husband', 'I', 'idea', 'identify', 'if', 'image', 'imagine',
    'impact', 'important', 'improve', 'in', 'include', 'including', 'increase', 'indeed', 'indicate',
    'individual', 'industry', 'information', 'inside', 'instead', 'institution', 'interest', 'interesting',
    'international', 'interview', 'into', 'investment', 'involve', 'issue', 'it', 'item', 'its', 'itself',
    'job', 'join', 'just', 'keep', 'key', 'kid', 'kill', 'kind', 'kitchen', 'know', 'knowledge', 'land',
    'language', 'large', 'last', 'late', 'later', 'laugh', 'law', 'lawyer', 'lay', 'lead', 'leader', 'learn',
    'least', 'leave', 'left', 'leg', 'legal', 'less', 'let', 'letter', 'level', 'lie', 'life', 'light',
    'like', 'likely', 'line', 'list', 'listen', 'little', 'live', 'local', 'long', 'look', 'lose', 'loss',
    'lot', 'love', 'low', 'machine', 'magazine', 'main', 'maintain', 'major', 'majority', 'make', 'man',
    'manage', 'management', 'manager', 'many', 'market', 'marriage', 'material', 'matter', 'may', 'maybe',
    'me', 'mean', 'measure', 'media', 'medical', 'meet', 'meeting', 'member', 'memory', 'mention', 'message',
    'method', 'middle', 'might', 'military', 'million', 'mind', 'minute', 'miss', 'mission', 'model', 'modern',
    'moment', 'money', 'month', 'more', 'morning', 'most', 'mother', 'mouth', 'move', 'movement', 'movie',
    'Mr', 'Mrs', 'much', 'music', 'must', 'my', 'myself', 'name', 'nation', 'national', 'natural', 'nature',
    'near', 'nearly', 'necessary', 'need', 'network', 'never', 'new', 'news', 'newspaper', 'next', 'nice',
    'night', 'no', 'none', 'nor', 'north', 'not', 'note', 'nothing', 'notice', 'now', "n't", 'number', 'occur',
    'of', 'off', 'offer', 'office', 'officer', 'official', 'often', 'oh', 'oil', 'ok', 'old', 'on', 'once',
    'one', 'only', 'onto', 'open', 'operation', 'opportunity', 'option', 'or', 'order', 'organization',
    'other', 'others', 'our', 'out', 'outside', 'over', 'own', 'owner', 'page', 'pain', 'painting', 'paper',
    'parent', 'part', 'participant', 'particular', 'particularly', 'party', 'pass', 'past', 'patient',
    'pattern', 'pay', 'peace', 'people', 'per', 'performance', 'perhaps', 'period', 'person', 'personal',
    'perspective', 'phone', 'photo', 'physical', 'pick', 'place', 'plan', 'planning', 'play', 'player',
    'point', 'police', 'policy', 'political', 'pollution', 'poor', 'position', 'positive', 'possible',
    'potential', 'power', 'practice', 'prepare', 'present', 'president', 'pressure', 'pretty', 'prevent',
    'price', 'private', 'problem', 'process', 'produce', 'product', 'production', 'professional',
    'professor', 'program', 'project', 'property', 'protect', 'prove', 'provide', 'public', 'push', 'put',
    'quality', 'question', 'quick', 'quickly', 'race', 'radio', 'raise', 'range', 'rate', 'rather', 'reach',
    'read', 'ready', 'real', 'realize', 'reason', 'receive', 'recent', 'recently', 'recognize', 'record',
    'red', 'reduce', 'refuse', 'region', 'relate', 'relationship', 'religious', 'remember', 'remove',
    'report', 'represent', 'Republican', 'require', 'research', 'resource', 'respond', 'response',
    'responsibility', 'rest', 'result', 'return', 'reveal', 'rich', 'right', 'rise', 'risk', 'road', 'rock',
    'role', 'room', 'rule', 'run', 'safe', 'same', 'save', 'say', 'scene', 'school', 'scientific', 'score',
    'sea', 'season', 'second', 'section', 'security', 'see', 'seek', 'seem', 'self', 'sell', 'sense', 'sentence',
    'series', 'serious', 'serve', 'service', 'set', 'seven', 'sex', 'she', 'short', 'shot', 'should', 'shoulder',
    'show', 'side', 'sign', 'significant', 'similar', 'simple', 'simply', 'since', 'single', 'situation', 'size',
    'skin', 'small', 'society', 'solution', 'sort', 'sound', 'south', 'space', 'special', 'specific',
    'speech', 'spend', 'sport', 'spring', 'stability', 'stage', 'stand', 'standard', 'star', 'state', 'statement',
    'station', 'stay', 'step', 'still', 'stock', 'stop', 'store', 'strategy', 'street', 'strong', 'structure',
    'study', 'stuff', 'style', 'subject', 'success', 'such', 'suggest', 'sudden', 'summer', 'support',
    'surface', 'system', 'table', 'take', 'talk', 'target', 'task', 'tax', 'teach', 'team', 'technology',
    'television', 'tell', 'term', 'test', 'than', 'thank', 'that', 'the', 'their', 'them', 'themselves', 'then',
    'there', 'therefore', 'these', 'they', 'thing', 'think', 'this', 'those', 'though', 'thought',
    'three', 'through', 'throughout', 'throw', 'thus', 'time', 'to', 'together', 'too', 'top', 'total',
    'tough', 'toward', 'town', 'trade', 'traditional', 'training', 'travel', 'treatment', 'trial', 'try', 'turn',
    'tv', 'two', 'type', 'under', 'understand', 'unit', 'up', 'upon', 'urban', 'us', 'use', 'usually',
    'vacation', 'value', 'various', 'very', 'victim', 'video', 'view', 'village', 'violence', 'visit',
    'vote', 'wait', 'walk', 'wall', 'want', 'war', 'watch', 'water', 'way', 'we', 'weapon', 'wear',
    'week', 'weight', 'well', 'west', 'western', 'what', 'whatever', 'when', 'whenever', 'where',
    'wherever', 'whether', 'which', 'while', 'whom', 'whose', 'why', 'wide', 'wife', 'will', 'win',
    'wish', 'with', 'within', 'without', 'woman', 'wonder', 'word', 'work', 'worker', 'world',
    'would', 'write', 'writer', 'wrong', 'year', 'yellow', 'yes', 'you', 'young', 'your', 'yourself', 'youth'
  ];
  const shortWords = words.filter(word => word.length <= 4);
  const longWords = words.filter(word => word.length > 4);

  //everything loaded, Start Program
  upgradeCells(upgrade);
  fillCells();

  function toggleVisibility(element, tf) {
    if (tf) {
      element.style.visibility = 'visible';
    } else {
      element.style.visibility = 'hidden';
    }
  }

  function fillCells() {

    cells.forEach(cell => {
        const randomWord = words[Math.floor(Math.random() * words.length)]; // Select a random word
        cell.textContent = randomWord; // Set the cell's text content to the random word
    });
  }

  function fillCell(cell) {
    const randomWord = words[Math.floor(Math.random() * words.length)]; // Select a random word
    cell.textContent = randomWord; // Set the cell's text content to the random word
  }


  function upgradeCells(upgrade) {

    switch (upgrade) {
      case 1:
        console.log("Upgrade 1");
        for (let i = 0; i < 9; i++) {
          if (i != 4) {
            toggleVisibility(cells[i], false);
          } else {
            toggleVisibility(cells[i], true);
          }
        }
        break;
      case 2:
        toggleVisibility(cells[3], true);
        toggleVisibility(cells[5], true);
        toggleVisibility(cells[4], false);
        console.log("Upgrade 2");
        break;
      case 3:
        toggleVisibility(cells[4], true);
        console.log("Handling state 3");
        break;
      case 4:
        toggleVisibility(cells[3], false);
        toggleVisibility(cells[5], false);
        toggleVisibility(cells[4], false);

        toggleVisibility(cells[0], true);
        toggleVisibility(cells[2], true);
        toggleVisibility(cells[6], true);
        toggleVisibility(cells[8], true);
      
        console.log("Handling state 4");
        break;
      case 5:
        toggleVisibility(cells[4], true);

        console.log("Handling state 5");
        break;
      case 6:
        toggleVisibility(cells[4], false);
        toggleVisibility(cells[1], true);
        toggleVisibility(cells[7], true);


        console.log("Handling state 6");
        break;
      case 7:
        toggleVisibility(cells[4], true);

        console.log("Handling state 7");
        break;
      case 8:
        toggleVisibility(cells[4], false);
        toggleVisibility(cells[3], true);
        toggleVisibility(cells[5], true);

        console.log("Handling state 8");
        break;
      case 9:
        toggleVisibility(cells[4], true);

        console.log("Handling state 9");
        break;
      default:
        console.log("State not recognized");
        break;
    }
  }


  function checkIfUpgraded(cell) {
    if (cell.style.visibility === 'visible') {
      return true
    }
    return false

  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * (max + 1));
  }

  function getRandomWordsShort(numWords) {
    const listWords = new Array(numWords);

    for (let i = 0; i < numWords; i++) {
      const randInt = getRandomInt(shortWords.length);
      listWords[i] = shortWords[randInt];
    }
    return listWords;
  }
  function getRandomWordsLong(numWords) {
    const listWords = new Array(numWords);

    for (let i = 0; i < numWords; i++) {
      const randInt = getRandomInt(shortWords.length);
      listWords[i] = longWords[randInt];
    }
    return listWords;
  }

  // Keystroke listener, Main function for driving the code


  document.addEventListener('keypress', function (e) {
    const char = e.key.toLowerCase();
    lastLetter.textContent = char; // Update the display for the last letter pressed

    cells.forEach(cell => {
      if (checkIfUpgraded(cell)) {
        let word = cell.textContent;
        let updatedHTML = '';

        let complete = true;
        for (let i = 0; i < word.length; i++) {
          if(word[i].class != "match"){
            console.log("Unknown Letter detected, scanning");
            if (word[i].toLowerCase() === char) {
              console.log("New Match");
              updatedHTML += `<span class="match">${word[i]}</span>`; // Change matching character to green
            } else if (word[i] !== ' ') {
              updatedHTML += `<span>${word[i]}</span>`;
              complete = complete && word[i].style && word[i].style.color === 'green'; // Check if already turned green
            } else {
              console.log("Letter is not in any of these words");
              updatedHTML += word[i]; // Keep spaces and non-letter characters
            }
          }
          else{
            console.log(char, " is already green");
          }
        }

        cell.innerHTML = updatedHTML;

        // If the entire word is green, refill the cell
        if (complete) {
          fillCell(cell); // Replace with a new word
        }
      }
    });
  });

  function drawFeatures() {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");

    //Draw the head
    context.fillStyle = "yellow";
    //outline around head
    context.strokeStyle = "black";
    context.lineWidth = 5;
    context.beginPath();

    context.arc(X_POS, Y_POS, HEAD_SIZE, 0, 360);
    context.fill();
    context.stroke();
    //Draw the eyes
    context.fillStyle = "black";

    context.beginPath();
    context.arc(X_POS - 15, Y_POS - 15, EYE_SIZE, 0, 360);
    context.fill();
    context.beginPath();
    context.arc(X_POS + 15, Y_POS - 15, EYE_SIZE, 0, 360);
    context.fill();

    context.strokeStyle = "green";
    context.beginPath();
    context.lineWidth = 2.5;
    context.arc(X_POS, Y_POS+5, 25, 0.35, 2.8);
    context.stroke();
  }



  //Upgrades and Buttons

  document.getElementById("wordcount").addEventListener('click', function(){
  
    if(characterCount < wordCost){
      alert("You do not have enough characters for this upgrade")
    } else {
      characterCount -= wordCost;
      upgrade++;
      setCharacterCounts();
      upgradeCells(upgrade)
      console.log(upgrade)
    }

    if(upgrade >= 9){
      console.log("Disabling button")
      document.getElementById("wordcount").style.pointerEvents = "none";
      document.getElementById("wordcount").style.opacity = "0.5"; 
    }
  })

  document.getElementById("auto").addEventListener('click', function(){
    
    if(characterCount < autoCost){
      alert("You do not have enough characters for this upgrade")
    } else {
      characterCount -= autoCost;
      cps += CPS_INCREMENT;
      setCharacterCounts();
    }
  })

  function cpsFunction() {
    characterCount += cps;
    setCharacterCounts();
  }

  function setCharacterCounts(){
    characters.innerHTML = String(characterCount);
    cpsCount.innerHTML = String(cps);
    wordCount.innerHTML = String(upgrade)
  }

});