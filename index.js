function generatePlan() {
  const goal = document.getElementById("goal").value;
  const hours = document.getElementById("hours").value;
  const days = document.getElementById("days").value;
  const output = document.getElementById("output");

  if (!goal || !hours || !days) {
    alert("Please fill all fields");
    return;
  }

  // Temporary mock plan (works without AI)
  let plan = `Study Cognito Plan\n\n`;
  plan += `Hacker Goal: ${goal}\n`;
  plan += `Hours per day: ${hours}\n`;
  plan += `Duration: ${days} days\n\n`;

  for (let i = 1; i <= days; i++) {
    plan += `Day ${i}: Learn fundamentals + practice for ${hours} hours\n`;
  }

  plan += `\n( AI-powered personalization coming next )`;

  output.innerText = plan;
}
