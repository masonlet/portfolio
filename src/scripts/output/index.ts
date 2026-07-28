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

//Listeners
if(document.getElementById("home-page")) {
  const aboutBtn  = document.getElementById("about");
  if (!aboutBtn)  throw new Error("Required about button not found");

  const skillsBtn = document.getElementById("skills");
  if (!skillsBtn) throw new Error("Required skills button not found");

  aboutBtn.addEventListener ("click", () => printContent("about"));
  skillsBtn.addEventListener("click", () => printContent("skills"));

  if (!window.location.hash) history.replaceState(null, '', "#about");
  printContent(parseHash());
}
