document.addEventListener('DOMContentLoaded', () => {
  // On page load, display all countries by default
  fetchAllCountries();
});

function fetchAllCountries() {
  fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(data => displayCountryInfo(data))
    .catch(error => console.error(error));

  // Set the default value for the region filter to 'all'
  document.getElementById('regionFilter').value = 'all';
}

function search() {
  const searchInput = document.getElementById('searchInput').value;

  if (!searchInput) {
    alert('Please enter a country name');
    return;
  }

  const regionFilter = document.getElementById('regionFilter');
  const selectedRegion = regionFilter.value;

  fetch(`https://restcountries.com/v3.1/name/${searchInput}`)
    .then(response => response.json())
    .then(data => {
      // Filter the data based on the selected region
      const filteredData = selectedRegion === 'all'
        ? data
        : data.filter(country => country.region === selectedRegion);

      displayCountryInfo(filteredData);

      if (filteredData.length === 0) {
        alert(`No results found for ${searchInput} in the filtered region`);
      }
    })
    .catch(error => console.error(error));
}

function filterByRegion() {
  const regionFilter = document.getElementById('regionFilter');
  const selectedRegion = regionFilter.value;

  if (selectedRegion === 'all') {
    fetchAllCountries();
  } else {
    fetch(`https://restcountries.com/v3.1/region/${selectedRegion}`)
      .then(response => response.json())
      .then(data => displayCountryInfo(data))
      .catch(error => console.error(error));
  }
}

function displayCountryInfo(data) {
  const countryCardsContainer = document.getElementById('countryCards');
  countryCardsContainer.innerHTML = '';

  if (data.length === 0) {
    countryCardsContainer.innerHTML = '<p>No results found</p>';
    return;
  }

  data.forEach(country => {
    const flag = country.flags.png || country.flags.svg || '';

    const html = `
      <div class="country-card">
        <h2>${country.name.common}</h2>
        <img src="${flag}" alt="Flag">
        <p>Region: ${country.region}</p>
        <p>Population: ${country.population}</p>
        <p>Capital: ${country.capital}</p>
      </div>
    `;

    countryCardsContainer.innerHTML += html;
  });
}
