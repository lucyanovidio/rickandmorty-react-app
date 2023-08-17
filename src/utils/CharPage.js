export function CharPage({
    favorites, 
    id
}) {
    function goBack() {
        window.history.back();
    }

    function handleFavoriting(e) {
        let btn;
    
        if (e.target.parentNode.tagName === "BUTTON") {
          btn = e.target.parentNode;
        } else if (e.target.parentNode.tagName === "svg") {
          btn = e.target.parentNode.parentNode;
        } else {
          btn = e.target;
        }
    
        // Se o id não está no array de favoritos, é porque, ao clicar, eu quero adicionar. Então, se temos isso, e também que já tem 10 personagens na lista, impedimos a adição.
        if (!favorites.includes(id) && favorites.length === 10) {
            alert("Número máximo de favoritos atingido.");
            return;
        }
    
        btn.classList.toggle("favorited");
    
        console.log(favorites);
    
        if (!favorites.includes(id)) {
          const newFavorites = [...favorites, id];
          localStorage.setItem("favorites", JSON.stringify(newFavorites));
    
          console.log(localStorage.getItem("favorites"));
        } else if (favorites.includes(id)) {
          const newFavorites = favorites.filter((favId) => favId !== id);
          localStorage.setItem("favorites", JSON.stringify(newFavorites));
    
          console.log(localStorage.getItem("favorites"));
        }
    }

    return {
        goBack,
        handleFavoriting
    }
}