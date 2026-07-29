import { content, type SectionKey             } from "./data";
import { parseHash, syncURL                   } from "./router";
import { renderSkills, updateSectionHighlight } from "./view";

function printContent(section: SectionKey): void {
  const outputDiv = document.getElementById("output");
  if (!outputDiv) {
    console.error("Output div not found");
    return;
  }

  updateSectionHighlight(section);
  syncURL(section);

  if (section === "skills") {
    renderSkills(outputDiv);
    return;
  }

  const sectionContent = content[section];
  if (!sectionContent) {
    console.error(`Content not found for ${section}`);
    return;
  }

  outputDiv.innerHTML = sectionContent;
}

if(document.getElementById("home-page")) {
  window.addEventListener("hashchange", () => printContent(parseHash()));
  if (!window.location.hash) history.replaceState(null, '', "#about");
  printContent(parseHash());
}
