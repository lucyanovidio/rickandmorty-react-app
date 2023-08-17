export async function getApiData(setStateFunction, apiGetFunction, param) {
 setStateFunction(await apiGetFunction(param));
}

export function showCharPage(e) {
    const idString = e.target.parentNode.id || e.target.id;
    const idStringIntoArray = idString.split("");
    const id = idStringIntoArray.slice(1).join("");

    window.location.assign(`/character/${id}`);
}

export function returnFavorites() {
    if (localStorage.getItem("favorites")) {
        return JSON.parse(localStorage.getItem("favorites"));
    }

    return localStorage.getItem("favorites");
}

export function Menu() {
    function switchMode() {
        if (document.body.classList.contains("light")) {
            document.body.classList.remove("light");
            localStorage.setItem("mode", "dark");
            return;
        }
        document.body.classList.add("light");
        localStorage.setItem("mode", "light");
    }

    function openMenu() {
        document.body.classList.toggle("menu-expanded");
    }
    
    function closeMenu() {
        document.body.classList.remove("menu-expanded");
    }

    return {
        switchMode,
        openMenu,
        closeMenu
    }
}