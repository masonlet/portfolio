import { state           } from "./outputState";
import { type SectionKey } from "./outputData";

const TYPING_SPEED: number = 20;

export async function typeContent(
  section:     SectionKey,
  textContent: string,
  outputDiv:   HTMLElement
): Promise<void> {
  let index: number = state.getTypingIndex(section);

  if (index > 0) outputDiv.innerHTML = textContent.substring(0, index);

  while(index < textContent.length && state.shouldContinueTyping(section)) {
    if (textContent[index] === '<') {
      const tagEnd = textContent.indexOf('>', index);
      if (tagEnd === -1) break;
      index = tagEnd + 1;
    } else {
      index++;
    }

    outputDiv.innerHTML = textContent.substring(0, index);
    state.saveProgress(section, index);
    await new Promise(resolve => setTimeout(resolve, TYPING_SPEED));
  }

  if (state.shouldContinueTyping(section)) {
    state.saveProgress(section, index);
    state.flush();
  }
}

