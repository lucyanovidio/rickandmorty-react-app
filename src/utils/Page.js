export function Page({
  counter,
  setCounter,
  totalPages,
  getApiData,
  setInfo,
  getPageInfo,
}) {
  function init() {
    if (!localStorage.getItem("mode")) {
      localStorage.setItem("mode", "dark");
    }

    if (!localStorage.getItem("favorites")) {
      localStorage.setItem("favorites", "");
    }
  }

  function next() {
    if (counter === totalPages) {
      return;
    }

    const newCounter = counter + 1;
    
    setCounter(newCounter);
    getApiData(setInfo, getPageInfo, newCounter);
  }

  function previous() {
    if (counter === 1) {
      return;
    }
    
    const newCounter = counter - 1;
    
    setCounter(newCounter);
    getApiData(setInfo, getPageInfo, newCounter);
  }

  function goTo(e) {
    setCounter(Number(e.target.textContent));
    getApiData(setInfo, getPageInfo, Number(e.target.textContent));
  }

  return {
    init,
    next,
    previous,
    goTo,
  };
}
