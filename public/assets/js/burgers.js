$(() => {
  $('.devourUndevour').on('click', function(event) {
    let toggleDevoured = {
      devoured: Math.abs($(this).data('devoured') - 1)
    };
    $.ajax(`/api/update-burger/${$(this).data('id')}`, {
      type: 'PUT',
      data: toggleDevoured
    }).then(
      () => {
        console.log(`Updated devoured state to ${toggleDevoured}`);
        location.reload();
      }
    );
  });

  $('.burgerForm').on('submit', (event) => {
    event.preventDefault();
    let burger_name = $('#burger_name').val().trim();
    if (burger_name !== '') {
      $.ajax('/api/new-burger', {
        type: 'POST',
        data: {
          burger_name: burger_name,
          devoured: $('[name=devoured]:checked').val()
        }
      }).then(
        () => {
          console.log(`created new burger: ${burger_name}`);
          location.reload();
        }
      );
    }
  });

  $(".deleteBurger").on("click", function(event) {
    let id = $(this).data("id");
    $.ajax("/api/delete-burger/" + id, {
      type: "DELETE"
    }).then(
      () => {
        console.log("deleted burger", id);
        location.reload();
      }
    );
  });
});
