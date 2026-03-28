const fs = require('fs');
let content = fs.readFileSync('prisma/seed.ts', 'utf8');

// Regex to find step objects
// We look for objects containing stepNumber
const stepRegex = /\{\s*stepNumber:\s*(\d+),\s*description:\s*'([^']*)'(?:,\s*commands:\s*'[^']*')?(?:,\s*expectedResult:\s*'([^']*)')?(?:,\s*question:\s*'[^']*')?,\s*order:\s*\d+\s*,?\s*\}/g;

// Wait, standard regex is hard for nested structures.
// Let's do a simpler approach: splitting by `stepNumber:` and injecting `question:` right before `order:` if missing.
const lines = content.split('\n');
let insideStep = false;
let currentExpectedResult = '';
let hasQuestion = false;
let stepStartIdx = -1;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('stepNumber:')) {
    insideStep = true;
    hasQuestion = false;
    currentExpectedResult = '';
    stepStartIdx = i;
  }
  
  if (insideStep && lines[i].includes('expectedResult:')) {
    const match = lines[i].match(/expectedResult:\s*'(.*?)'/);
    if (match) currentExpectedResult = match[1];
  }
  
  if (insideStep && lines[i].includes('question:')) {
    hasQuestion = true;
  }
  
  if (insideStep && lines[i].includes('order:')) {
    if (!hasQuestion) {
      // Inject question based on expected Result
      let generatedQuestion = "What specific information or results did you observe?";
      if (currentExpectedResult.includes("live, moving graphs")) {
        generatedQuestion = "What specific metrics (e.g., CPU, Memory) were shown in the activity monitor, and what were their current utilization percentages?";
      } else if (currentExpectedResult.includes("system UI shell")) {
        generatedQuestion = "What happened to your taskbar/desktop icons when you restarted the UI shell process?";
      } else if (currentExpectedResult.includes("ICMP echo request/replies")) {
        generatedQuestion = "Did the ping successfully return replies, and what was the average round-trip time in ms?";
      } else if (currentExpectedResult.includes("NAT")) {
        generatedQuestion = "What IP address was assigned to your smartphone by the hotspot DHCP?";
      } else if (currentExpectedResult.includes("DNS failure")) {
        generatedQuestion = "What exact error message did the ping command return when DNS failed?";
      } else if (currentExpectedResult.includes("Nginx serves back")) {
        generatedQuestion = "What exact text was displayed in your web browser when hitting the Nginx server IP?";
      } else if (currentExpectedResult.includes("top")) {
        generatedQuestion = "What was the total memory consumption shown in the 'top' output while the server was idle?";
      } else if (currentExpectedResult.includes("Access Denied")) {
        generatedQuestion = "What exact error message was presented when attempting to open the TopSecret folder?";
      } else if (currentExpectedResult.includes("firewall immediately drops")) {
        generatedQuestion = "How exactly did the browser react (e.g., timed out, immediate connection refused) when the firewall blocked port 80?";
      } else {
        generatedQuestion = "Based on the expected result (" + currentExpectedResult.substring(0, 30) + "...), what exact system output or behavior did you witness to confirm completion?";
      }
      lines.splice(i, 0, `                  question: '${generatedQuestion.replace(/'/g, "\\'")}',`);
      i++; // adjust index
    }
    insideStep = false;
  }
}

fs.writeFileSync('prisma/seed.ts', lines.join('\n'));
