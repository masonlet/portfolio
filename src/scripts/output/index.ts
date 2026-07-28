import { content, type SectionKey             } from "./data";
import { parseHash, syncURL                   } from "./router";
import { state                                } from "./state";
import { renderSkills, updateSectionHighlight } from "./view";
import { typeContent                          } from "./typing";

async function printContent(section: SectionKey): Promise<void> {
  const outputDiv = document.getElementById("output");
  if (!outputDiv) {
    console.error("Output div not found");
    return;
  }

  if (state.shouldContinueTyping(section)) return;

  state.cancelTyping();
  updateSectionHighlight(section);
  syncURL(section);

  if (section === "skills") {
    renderSkills(outputDiv);
    return;
  }

  if (state.getCurrentSection() !== section) state.saveProgress(section, 0);
  
  const sectionContent = content[section];
  if (!sectionContent) {
    console.error(`Content not found for ${section}`);
    return;
  }

  state.startTyping(section);
  outputDiv.innerHTML = '';
  await typeContent(section, sectionContent, outputDiv);
}

//Listeners
if(document.getElementById("home-page")) {
  const aboutBtn  = document.getElementById("about");
  if (!aboutBtn)  throw new Error("Required about button not found");

  const skillsBtn = document.getElementById("skills");
  if (!skillsBtn) throw new Error("Required skills button not found");

  aboutBtn.addEventListener ("click", () => printContent("about"));
  skillsBtn.addEventListener("click", () => printContent("skills"));
  window.addEventListener("pagehide", () => state.flush());

  if (!window.location.hash) history.replaceState(null, '', "#about");
  void printContent(parseHash());
}
