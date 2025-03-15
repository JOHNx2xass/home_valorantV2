// Wait for the DOM to be fully loaded before executing JavaScript
document.addEventListener('DOMContentLoaded', function () {
  // Select all category buttons
  const categoryButtons = document.querySelectorAll('.category');
  // Select all agent cards
  const agentCards = document.querySelectorAll('.agent-card');
  // Select all agent details sections
  const agentDetails = document.querySelectorAll('.agent-details');

  // Add click event to each category button
  categoryButtons.forEach((button) => {
    button.addEventListener('click', function () {
      // Remove "category-selected" class from all category buttons
      categoryButtons.forEach((btn) =>
        btn.classList.remove('category-selected')
      );
      // Add "category-selected" class to the clicked category
      this.classList.add('category-selected');

      // Get the selected category, trimming any extra spaces
      const selectedCategory = this.textContent.trim().toLowerCase();

      // Filter agent cards based on the selected category
      agentCards.forEach((card) => {
        const cardCategory = card.dataset.category.toLowerCase();

        // Show agents based on the selected category
        if (
          selectedCategory === 'all category' ||
          (selectedCategory === 'duelists' && cardCategory === 'duelist') ||
          (selectedCategory === 'controllers' &&
            cardCategory === 'controller') ||
          (selectedCategory === 'initiators' && cardCategory === 'initiator') ||
          (selectedCategory === 'sentinels' && cardCategory === 'sentinel')
        ) {
          card.style.display = 'block'; // Show the card
        } else {
          card.style.display = 'none'; // Hide the card
        }
      });
    });
  });

  // Fetch agent details from JSON file
  fetch('agents.json')
    .then(response => response.json())
    .then(data => {
      const agents = data.agents;

      // Function to show agent details
      function showAgentDetails(agentId) {
        // Hide all agent details by default
        document.querySelector('.agent-details-container').innerHTML = '';

        // Find the agent details from the JSON data
        const agent = agents.find(a => a.id === agentId);
        if (agent) {
          // Create agent details HTML
          const agentDetailHtml = `
            <div class="agent-details active">
              <h2>${agent.name} - ${agent.role}</h2>
              <p>${agent.description}</p>
              <ul>
                ${agent.abilities.map(ability => `<li>${ability}</li>`).join('')}
              </ul>
            </div>
          `;

          // Insert the agent details into the DOM
          document.querySelector('.agent-details-container').innerHTML = agentDetailHtml;
        }
      }

      // Add click event to each agent card for showing details
      agentCards.forEach(card => {
        card.addEventListener('click', function () {
          // Get the agent ID from the clicked card
          const agentId = this.querySelector('h3').textContent.toLowerCase();
          showAgentDetails(agentId);
        });
      });
    });
});
