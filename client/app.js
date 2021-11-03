// import Swal from 'sweetalert2'

$('#chirp-btn').click(e => {
    e.preventDefault()
    const username = $('#username').val();
    const text = $('#text').val();
    console.log({ username, text })

    $.ajax({
        type: 'POST',
        url: '/api/chirps',
        data: { username, text }
    })
        .then(response => {
            console.log(response)
            getAndDisplayChirps()
        })

    $('#username').val('');
    $('#text').val('');
})

getAndDisplayChirps()

function getAndDisplayChirps() {
    $.ajax({
        type: 'GET',
        url: '/api/chirps'
    })
        .then(chirps => {
            $('#chirp-holder').empty()

            for (const id in chirps) {
                if (id === "nextid") return;
                console.log(chirps[id])

                const deleteBtn = $('<button>X</button>').click(() => {
                    $.ajax({
                        type: 'DELETE',
                        url: `/api/chirps/${id}`,
                        success: getAndDisplayChirps()
                    })
                        // .then(response => {
                        //     console.log(response)
                        //     getAndDisplayChirps()
                        // })
                })
                    // The edit button attempt with Sweet Alert 2, may come back and fix later
                // const editBtn = $('<button>Edit Chirp</button>').click(() => {
                //     Swal.fire({
                //         title: 'Edit Chirp',
                //         html: `<input type="text" id="username" class="swal2-input" placeholder="Username">
                //         <input type="text" id="text" class="swal2-input" placeholder="Text">`,
                //         confirmButtonText: 'Update Chirp',
                //         focusConfirm: false,
                //         preConfirm: () => {
                //           const username = Swal.getPopup().querySelector('#username').value
                //           const text = Swal.getPopup().querySelector('#text').value
                //           if (!username || !text) {
                //             Swal.showValidationMessage(`Please enter new chirp`)
                //           }
                //           return { username : username, text: text }
                //         }
                //       }).then(() => {
                //           $.ajax({
                //               type: 'PUT',
                //               url: `/api/chirps/${id}`,
                //               data: { username, text}
                //           })
                //           .then(response => {
                //               console.log(response);
                //               getAndDisplayChirps()
                //           })
                          
                // })
                // })

                $(`
                <li class="list-group-item">
                    <div class="card-body">
                    <div class="card-title">${chirps[id].username}</div>
                    <div class="card-text fs-3">${chirps[id].text}</div>
                    </div>
                </li>
            `)
                    .appendTo('#chirp-holder')
                    .append(deleteBtn)
                    // .append(editBtn) To keep things moving smoothly, I've just removed the edit button for now
            }
        })
}

