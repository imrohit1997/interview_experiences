import re
import os

filepath = r"e:\AntiGravityWorkspace\interview_experiences\deloitte.html"

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Increment existing question numbers
def increment_match(match):
    num = int(match.group(1))
    return f'<div class="question">{num + 2}.'

content = re.sub(r'<div class="question">(\d+)\.', increment_match, content)

# The content to insert
new_questions = """    <h2>Introduction & Day-to-Day Activities (09:06:48)</h2>
    <div class="question">1. Can you introduce yourself and describe your day-to-day activities (tech stack, project structure, team size, etc.)?</div>
    <div class="answer">
        <p><strong>How to Answer (Framework):</strong></p>
        <ul>
            <li><strong>Introduction:</strong> Briefly talk about your current role and overall experience.</li>
            <li><strong>Tech Stack:</strong> Mention the core technologies you use daily (e.g., Java 8+, Spring Boot, Microservices, SQL/NoSQL databases, Kafka, Docker/Kubernetes).</li>
            <li><strong>Project Structure:</strong> Explain the architecture briefly, such as a microservices-based architecture communicating via REST or message brokers.</li>
            <li><strong>Team Size & Agile:</strong> Talk about your team size (e.g., 8-10 members including developers, QA, Scrum Master, Product Owner) and your Agile ceremonies (daily stand-up, sprint planning, retrospective).</li>
            <li><strong>Day-to-Day:</strong> Mention picking up Jira tickets, participating in stand-ups, writing code and unit tests (JUnit/Mockito), peer code reviews (PRs), and deploying via CI/CD pipelines.</li>
        </ul>
    </div>

    <h2>Java 8 Coding (09:10:39)</h2>
    <div class="question">2. Write Java 8 code to get the first non-repeating character from a string (e.g., "swiss").</div>
    <div class="answer">
        <p>Using Java 8 Streams, you can collect the character counts into a <code>LinkedHashMap</code> (to preserve insertion order) and then find the first character with a count of 1.</p>
        <pre><code>import java.util.LinkedHashMap;
import java.util.function.Function;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        String input = "swiss";

        Character firstNonRepeating = input.chars()
            .mapToObj(c -&gt; (char) c)
            .collect(Collectors.groupingBy(
                Function.identity(), 
                LinkedHashMap::new, 
                Collectors.counting()
            ))
            .entrySet().stream()
            .filter(entry -&gt; entry.getValue() == 1L)
            .map(entry -&gt; entry.getKey())
            .findFirst()
            .orElse(null);

        System.out.println("First non-repeating character: " + firstNonRepeating); // Output: w
    }
}</code></pre>
    </div>

"""

# Insert before the first <h2>
content = content.replace("    <h2>Design Patterns", new_questions + "    <h2>Design Patterns")

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated deloitte.html")
