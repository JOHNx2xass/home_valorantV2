document.addEventListener('DOMContentLoaded', function () {
  // Select all category buttons and agent cards
  const categoryButtons = document.querySelectorAll('.category');
  const agentCards = document.querySelectorAll('.agent-card');

  // Add click event listeners to category buttons
  categoryButtons.forEach((button) => {
    button.addEventListener('click', function () {
      // Remove the 'category-selected' class from all buttons
      categoryButtons.forEach((btn) =>
        btn.classList.remove('category-selected')
      );
      // Add the 'category-selected' class to the clicked button
      this.classList.add('category-selected');

      // Get the selected category
      const selectedCategory = this.textContent.trim().toLowerCase();

      // Show or hide agent cards based on the selected category
      agentCards.forEach((card) => {
        const cardCategory = card.dataset.category.toLowerCase();

        if (
          selectedCategory === 'all category' ||
          (selectedCategory === 'duelists' && cardCategory === 'duelist') ||
          (selectedCategory === 'controllers' &&
            cardCategory === 'controller') ||
          (selectedCategory === 'initiators' && cardCategory === 'initiator') ||
          (selectedCategory === 'sentinels' && cardCategory === 'sentinel')
        ) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });

      // Category description
      const categoryDescriptions = {
        duelists: "Duelists are self-sufficient fraggers who their team expects, through abilities and skills, to get high frags and seek out engagements first.",
        controllers: "Controllers are experts in slicing up dangerous territory to set their team up for success.",
        initiators: "Initiators challenge angles by setting up their team to enter contested ground and push defenders away.",
        sentinels: "Sentinels are defensive experts who can lock down areas and protect their teammates from flanks."
      };

      const categoryInfo = categoryDescriptions[selectedCategory] || "Explore all agents and their unique abilities.";
      document.querySelector('.agent-details-container').innerHTML = `
        <div class="agent-details active">
          <h2>${this.textContent.trim()}</h2>
          <p>${categoryInfo}</p>
        </div>
      `;
    });
  });

  // Fetch agent data from the JSON file
  fetch('agents.json')
    .then(response => response.json())
    .then(data => {
      const agents = data.agents;

      // Function to display agent details
      function showAgentDetails(agentId) {
        // Clear the agent details and image containers
        document.querySelector('.agent-details-container').innerHTML = '';
        document.querySelector('.agent-details-image').innerHTML = '';

        // Find the selected agent by ID
        const agent = agents.find(a => a.id === agentId);
        if (agent) {
          // Define role images
          const roleImages = {
            Duelist: "Valorant_Assets/Class/Property 1=Duelist.png",
            Controller: "Valorant_Assets/Class/Property 1=Controller.png",
            Initiator: "Valorant_Assets/Class/Property 1=Initiator.png",
            Sentinel: "Valorant_Assets/Class/Property 1=Sentinel.png"
          };

          // Generate HTML for the agent details
          const agentDetailHtml = `
            <div class="agent-details active">
              <h2>
                ${agent.name} - 
                <img src="${roleImages[agent.role]}" alt="${agent.role}" width="30" height="30">
                ${agent.role}
              </h2>
              <p>${agent.description}</p>
              <h3>SPECIAL ABILITIES</h3>
              <ul>
                ${agent.abilities.map(ability => `
                  <li>
                    <img src="${ability.image}" width="50" data-ability-info="${ability.name}">
                    <span class="ability-name">${ability.name}</span>
                  </li>`).join('')}
              </ul>
              <div class="ability-info"></div>
            </div>
          `;
          document.querySelector('.agent-details-container').innerHTML = agentDetailHtml;

          // Generate HTML for the agent image
          const agentImageHtml = `<img src="${agent.image}" alt="${agent.name}" width="100%">`;
          document.querySelector('.agent-details-image').innerHTML = agentImageHtml;

          // Add click event to toggle ability names and transparency
          const abilityImages = document.querySelectorAll('.agent-details ul li img');
          const abilityInfo = document.querySelector('.ability-info');

          abilityImages.forEach(img => {
            img.addEventListener('click', function () {
              const isTransparent = this.classList.contains('transparent');

              // Reset all abilities
              abilityImages.forEach(image => image.classList.remove('transparent'));
              abilityInfo.classList.remove('active');

              if (!isTransparent) {
                // Make other abilities transparent
                abilityImages.forEach(image => {
                  if (image !== this) {
                    image.classList.add('transparent');
                  }
                });

                // Show ability information
                abilityInfo.textContent = this.dataset.abilityInfo;
                abilityInfo.classList.add('active');
              }
            });
          });
        }
      }

      // Add click event listeners to agent cards
      agentCards.forEach(card => {
        card.addEventListener('click', function () {
          const agentId = this.dataset.agentId;
          showAgentDetails(agentId);
        });
      });
    });
});
