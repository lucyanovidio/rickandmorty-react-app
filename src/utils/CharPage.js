export function CharPage({
    favorites, 
    id
}) {
    function goBack() {
        window.history.back();
    }

    function handleFavoriting(e) {
        let btn;

        switch (e.target.parentNode.tagName) {
          case ("BUTTON"):
            btn = e.target.parentNode;
            break;
          case ("svg"):
            btn = e.target.parentNode.parentNode;
            break;
          default:
            btn = e.target;
        }
    
        if (!favorites.includes(id) && favorites.length === 10) {
            alert("Número máximo de favoritos atingido.");
            return;
        }
    
        btn.classList.toggle("favorited");
    
        if (!favorites.includes(id)) {
          const newFavorites = [...favorites, id];
          return localStorage.setItem("favorites", JSON.stringify(newFavorites));
        } 
        
        const newFavorites = favorites.filter((favId) => favId !== id);
        localStorage.setItem("favorites", JSON.stringify(newFavorites));
    }

    async function createTranslation({
      name,
      status,
      species,
      gender,
      origin,
      location,
      translate
    }) {
      const translation = {
        name: translate(name),
        status: translate(status),
        species: translate(species),
        gender: translate(gender),
        location: translate(location),
        origin: translate(origin)
      }
  
      const translatedData = await Promise.all(Object.values(translation));
      const [translatedName, translatedStatus, translatedSpecies, translatedGender, translatedLocation, translatedOrigin] = translatedData;
  
      return {
        name: translatedName,
        status: translatedStatus,
        species: translatedSpecies,
        gender: translatedGender,
        location: translatedLocation,
        origin: translatedOrigin
      };
    }

    return {
        goBack,
        handleFavoriting,
        createTranslation
    }
}