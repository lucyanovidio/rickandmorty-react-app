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
          return;
        } 
        
        const newFavorites = favorites.filter((favId) => favId !== id);
        localStorage.setItem("favorites", JSON.stringify(newFavorites));
    
        console.log(localStorage.getItem("favorites"));
    }

    return {
        goBack,
        handleFavoriting
    }
}