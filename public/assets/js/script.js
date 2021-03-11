//   MATERIALIZE
//Materialize Auto Initialize
M.AutoInit();
//picture pop
$(document).ready(function(){
  $('materialboxed').materialbox();
});

//  SIDENAV
document.addEventListener('DOMContentLoaded', function() {
    const elems = document.querySelectorAll('.sidenav');
    const instances = M.Sidenav.init(elems, options);
  });
  // UNCOMMENT FOR DROPDOWN MENUS ON SIDENAV
//    const collapsibleElem = document.querySelector('.collapsible');
//    const collapsibleInstance = M.Collapsible.init(collapsibleElem, options);

//  HANDLEBARS
app.set("view engine", "hbs");
app.engine('hbs', exphbs({
  extname: 'hbs',
  defaultLayout: 'main',
  layoutsDir: __dirname + 'views/layouts',
  partialsDir: __dirname + 'views/partials',

}));

//  PEXEL
//Pexel API
$(document).ready(function(){
  var api_key = "563492ad6f91700001000001bb5052fb7c7742528f8fb1620097f617"
  var image = ''

  $("#form").submit(function (event) {
    event.preventDefault()
    var search = $("#search").val()

    imageSearch()
  })

  function imageSearch() {
    $.ajax({
      method: 'GET',
      beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", api_key);
      },
      url:"https://api.pexels.com/v1/search?query=" + search + "&per_page=15&page=1",
      success: function (data) {
        console.log(data)
        data.photos.forEach(photo => {
            image = `
            <img src="${photo.src.original}" width="200" height="200"/>

            `
            $("#images").append(image)
        });

      },
      error: function (error) {
        console.log(error)
      }
    })
  }

})

