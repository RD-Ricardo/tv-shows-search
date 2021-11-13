const inputFilme = document.getElementById('query');
const ul = document.getElementById('shows');

const handleSearch = async (event) => {
  
  event.preventDefault();

  const response = await fetch(`https://api.tvmaze.com/search/shows?q=${inputFilme.value}`);

  if(response.ok)
  {
      const result = await response.json();

      if(result.length == 0)
      {
        const message = document.querySelector('#message');
        message.innerHTML = 'Não foi possivel encontrar filmes com este nome';
        return;
      }

      inputFilme.value = '';
      ul.innerHTML = '';
      criarFilmes(result)   
  }
};

const criarFilmes = (filmes) => { 

  filmes.forEach(i => {

    const imagem = i.show?.image?.medium || '';

    ul.insertAdjacentHTML("beforeend", `

        <li>
          
          <div>
            <img src=" ${imagem}" />  
            ${i.show.name}
          </div>
        </li>
    `);
  });

}

document.addEventListener('DOMContentLoaded', () => {
  document
    .querySelector('#search-form')
    .addEventListener('submit', handleSearch);
});
