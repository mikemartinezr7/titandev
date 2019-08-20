$(function() {
    let imageUrl = '';
    // Configure Cloudinary
    // with credentials available on
    // your Cloudinary account dashboard
    //man
    $.cloudinary.config({ cloud_name: 'lua-cenfotec', api_key: '618723112489319' });

    // Upload button
    let uploadButton = $('#btnChooseImage');

    // Upload button event
    uploadButton.on('click', function(e) {
        // Initiate upload
        cloudinary.openUploadWidget({ cloud_name: 'lua-cenfotec', upload_preset: 'proyecto', tags: ['cgal'] },
            function(error, result) {
                if (error) console.log(error);
                // If NO error, log image data to console
                let id = result[0].public_id;
                console.log(id);
                imageUrl = 'https://res.cloudinary.com/lua-cenfotec/image/upload/' + id;
                document.querySelector('#image_preview').src = imageUrl;
                console.log(imageUrl);
            });
    });
})

function processImage(id) {
    let options = {
        client_hints: true,
    };
    return $.cloudinary.url(id, options);
}