document.addEventListener("DOMContentLoaded", () => {
  ymaps.ready(init);
  const myModalAlternative = new bootstrap.Modal("#modalMap");
  const addressInput = document.getElementById("address");
  function init() {
    let myMap;
    ymaps.geolocation.get().then(function(res) {
      const bounds = res.geoObjects.get(0).properties.get("boundedBy");
      const mapState = ymaps.util.bounds.getCenterAndZoom(
        bounds,
        [5e3, 3e3]
      );
      myMap = new ymaps.Map("map", mapState);
      initGetAdressClick(myMap);
    }, function(e) {
      myMap = new ymaps.Map("map", {
        center: [56.32434, 43.98527],
        zoom: 17
      });
      initGetAdressClick(myMap);
    });
  }
  function initGetAdressClick(myMap) {
    myMap.events.add("click", function(e) {
      console.log(e.get("coords"));
      ymaps.geocode(e.get("coords"), {
        results: 1
      }).then(function(res) {
        const firstGeoObject = res.geoObjects.get(0), bounds = firstGeoObject.properties.get("boundedBy");
        firstGeoObject.options.set("preset", "islands#darkBlueDotIconWithCaption");
        firstGeoObject.properties.set("iconCaption", firstGeoObject.getAddressLine());
        myMap.geoObjects.add(firstGeoObject);
        myMap.setBounds(bounds, {
          checkZoomRange: true
        });
        addressInput.value = firstGeoObject.getAddressLine();
        addressInput.parentElement.classList.add("fill");
      });
      myModalAlternative.hide();
    });
  }
});
