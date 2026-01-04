// ===============================
// CONFIG
// ===============================
const OPENAI_API_KEY = "";
const MODEL = "gpt-4o-mini";

// ===============================
// MAIN FUNCTION
// ===============================
async function generatePlan() {
  const goal = document.getElementById("goal").value;
  const hours = document.getElementById("hours").value;
  const days = document.getElementById("days").value;

  const output = document.getElementById("output");
  const calendar = document.getElementById("calendarGrid");

  if (!goal || !hours || !days) {
    output.innerHTML = "<strong>Please fill all fields.</strong>";
    return;
  }

  // Update dashboard
  document.getElementById("focusText").innerText = goal;
  document.getElementById("hoursText").innerText = hours + " hrs/day";
  document.getElementById("daysText").innerText = days + " days";

  output.innerHTML = "<em>Generating your personalized study plan...</em>";

  // Prompt
  const prompt = `
You are an expert study planner for hackathon students.
Create a ${days}-day study plan for the goal: "${goal}".
User can study ${hours} hours per day.

Rules:
- Break down day by day
- Be concise but practical
- Use headings and bullet points
- Focus on learning + practice
`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + OPENAI_API_KEY
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: "You are a helpful AI study planner." },
          { role: "user", content: prompt }
        ],
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error("API request failed");
    }

    const data = await response.json();
    const text = data.choices[0].message.content;

    // Format output nicely
    output.innerHTML = text
      .replace(/### (.*)/g, "<h3>$1</h3>")
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/- (.*)/g, "<li>$1</li>")
      .replace(/\n/g, "<br>");

    // Generate calendar
    calendar.innerHTML = "";
    for (let i = 1; i <= days; i++) {
      const dayBox = document.createElement("div");
      dayBox.innerText = "Day " + i;
      calendar.appendChild(dayBox);
    }

  } catch (error) {
    console.error(error);
    output.innerHTML = `
      <strong>Failed to generate plan.</strong><br>
      Please check your API key or try again.
    `;
  }
}
