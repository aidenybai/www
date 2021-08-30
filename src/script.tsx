import { createElement, patch, className } from 'million';

const text = `hiyo! my name is aiden

`
  .trim()
  .split(/\s+/gim);
let numberOfWordsTyped = 0;
let charactersTyped = 0;

const el = createElement(<div className="content"></div>);

const createWord = (
  word: string,
  typed: boolean,
  cursor: boolean,
  charactersTyped: number
) => {
  if (typed) {
    return <span className="word typed">{word}</span>;
  } else {
    let cursorLock = false;
    return (
      <span className="word">
        {word.split('').map((char: string, i: number) => {
          const charTyped = i < charactersTyped;
          const charCursor = !charTyped && !cursorLock;
          if (charCursor) cursorLock = true;
          return (
            <span
              // key={i}
              className={className({
                typed: charTyped && cursor,
                cursor: charCursor && cursor,
              })}
            >
              {char}
            </span>
          );
        })}
      </span>
    );
  }
};

const paintWords = () => {
  let cursorLock = false;
  patch(
    el,
    <div className="content">
      <span className="word counter">{numberOfWordsTyped}</span>
      {text.map((word: string, i: number) => {
        const typed = i < numberOfWordsTyped;
        const needsCursor = !typed && !cursorLock;
        if (needsCursor) cursorLock = true;

        return createWord(word, typed, needsCursor, charactersTyped);
      })}
      {numberOfWordsTyped === text.length - 1 &&
      charactersTyped === text[numberOfWordsTyped].length ? (
        <span className="cursor cursor-end"></span>
      ) : (
        ''
      )}
    </div>
  );
};

paintWords();

document.body.appendChild(el);

const check = () => {
  if (charactersTyped >= text[numberOfWordsTyped].length) {
    if (numberOfWordsTyped >= text.length - 1) {
      numberOfWordsTyped = text.length - 1;
      charactersTyped = text[numberOfWordsTyped].length;
    } else {
      numberOfWordsTyped++;
      charactersTyped = 0;
    }
  }

  if (charactersTyped < 0) {
    if (numberOfWordsTyped < 1) {
      numberOfWordsTyped = 0;
      charactersTyped = 0;
    } else {
      numberOfWordsTyped--;
      charactersTyped = text[numberOfWordsTyped].length - 1;
    }
  }
};

document.addEventListener('keydown', (event: KeyboardEvent) => {
  check();
  if (
    event.key.toLowerCase() ===
    (text[numberOfWordsTyped][charactersTyped] || '').toLowerCase()
  ) {
    charactersTyped++;
  }
  if (event.key === 'Backspace') {
    charactersTyped--;
  }
  check();
  paintWords();
});
