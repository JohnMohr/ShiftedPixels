//   MATERIALIZE
//Materialize Auto Initialize
M.AutoInit();
//picture pop
$(document).ready(function(){
  $('materialboxed').materialbox();
});

//  PEXEL
//Pexel API
$(document).ready(function(){
  var api_key = "563492ad6f91700001000001bb5052fb7c7742528f8fb1620097f617"
  var image = ''

  $("#photoForm").submit(function (event) {
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

$("#form").on('submit', function (event) {
    event.preventDefault()
    console.log("clicked")
    const inputText = $("#blogPost").val()
    console.log(inputText);

    $.ajax({
      method: 'POST',
      url: "/blog",
      data: {text: inputText}

    }).then(response  => {
      console.log(response);
      window.location.reload()
    }).catch(err => console.log(err))

  })

  $(".delete").on('click', function (event) {
    event.preventDefault()
    const blogId = $(this).attr("id")
    console.log(blogId)

    $.ajax({
      method: 'DELETE',
      url: `/blog/${blogId}`
    }).then(response =>{
      console.log(response);
      window.location.reload()
    }).catch(err => console.log(err))
  })


  // Don't actually want update functionality for the SHOUTOUT wall. Only Create/Delete. Still wanted to show it could be an option.
  // $(".update").on('click', function (event) {
  //   event.preventDefault()
  //   const blogId = $(this).attr("id")
  //   console.log(blogId)

  //   $.ajax({
  //     method: 'PUT',
  //     url: `/blog/${blogId}`
  //   }).then(response =>{
  //     console.log(response);
  //     window.location.reload()
  //   }).catch(err => console.log(err))
  // })

  