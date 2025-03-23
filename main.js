
document.addEventListener('DOMContentLoaded', function () {
  const categoryButtons = document.querySelectorAll('.category');
  const agentCards = document.querySelectorAll('.agent-card');
  const agentDetails = document.querySelectorAll('.agent-details');


  categoryButtons.forEach((button) => {
    button.addEventListener('click', function () {
      categoryButtons.forEach((btn) =>
        btn.classList.remove('category-selected')
      );
      this.classList.add('category-selected');

      const selectedCategory = this.textContent.trim().toLowerCase();

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
    });
  });

  fetch('agents.json')
    .then(response => response.json())
    .then(data => {
      const agents = data.agents;

      function showAgentDetails(agentId) {
        document.querySelector('.agent-details-container').innerHTML = '';
        document.querySelector('.agent-details-image').innerHTML = '';

        const agent = agents.find(a => a.id === agentId);
        if (agent) {
          const agentDetailHtml = `
            <div class="agent-details active">
              <h2>${agent.name} - ${agent.role}</h2>
              <p>${agent.description}</p>
              <h3>SPECIAL ABILITIES</h3>
              <ul>
                ${agent.abilities.map(ability => `
                  <li>
                    <img src="${ability.image}" alt="${ability.name}" width="50">
                    ${ability.name}
                  </li>`).join('')}
              </ul>
            </div>
          `;
          document.querySelector('.agent-details-container').innerHTML = agentDetailHtml;

          const agentImageHtml = `<img src="${agent.image}" alt="${agent.name}" width="100%">`;
          document.querySelector('.agent-details-image').innerHTML = agentImageHtml;
        }
      }
      agentCards.forEach(card => {
        card.addEventListener('click', function () {
          const agentId = this.dataset.agentId;
          showAgentDetails(agentId);
        });
      });
    });
});
