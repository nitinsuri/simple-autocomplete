const search = document.querySelector("#city-lookup");
const searchList = document.querySelector("#suggestion-list");

// search au.json to fetch the data and filter

const searchCities = async searchText => {
    const res = await fetch('../data/cities.json');
    const cities = await res.json();

    if(searchText.length === 0) {
        matches = [];
        searchList.classList.add("hidden");
    } else {
        //Get matches for the searched term
        let matches = cities.filter(city => {
            let cityname = city.city,
                citystate = city.admin;

            searchText = searchText.toLowerCase();
            cityname = cityname.toLowerCase();
            citystate = citystate.toLowerCase();
            if(cityname.indexOf(searchText) > -1){
                return city;
            } else {
                searchList.innerHTML = `<li class="no-match-found">No matches found</li>`
            }
            // const regex = new RegExp(`^${searchText}`, 'gi');
            // return city.city.match(regex);
        });
        outputHTML(matches,searchText);
    }
}

const outputHTML = (matches,searchText) => {
    searchList.classList.remove("hidden");
    if(matches.length > 0){
        const html = matches.map(function(city){
            const regex = new RegExp(`${searchText}`, 'gi');
            let cityname = city.city //.replace(regex, `<span>${searchText}</span>`);
            return `<li><a href="#">${cityname}, ${city.admin}, <em>${city.iso2}</em><br>(Population: ${city.population})</a></li>`
        }).join('');
        searchList.innerHTML = html;
        bindLinkEvent();
    }
}

function bindLinkEvent(){
    document.querySelectorAll("#suggestion-list a").forEach(item => {
        item.addEventListener("click",function(e){
            e.preventDefault();
        });
    });
}

search.addEventListener("input",() => searchCities(search.value));