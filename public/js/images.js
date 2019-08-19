$(function() {
    let imageUrl = '';
    // Configure Cloudinary
    // with credentials available on
    // your Cloudinary account dashboard
    //man
    $.cloudinary.config({ cloud_name: 'gio-cenfotec', api_key: '678848427629266' });

    // Upload button
    let uploadButton = $('#btnChooseImage');

    // Upload button event
    uploadButton.on('click', function(e) {
        // Initiate upload
        cloudinary.openUploadWidget({ cloud_name: 'gio-cenfotec', upload_preset: 'titandev-proyecto', tags: ['cgal'] },
            function(error, result) {
                if (error) console.log(error);
                // If NO error, log image data to console
                let id = result[0].public_id;
                console.log(id);
                imageUrl = 'https://res.cloudinary.com/gio-cenfotec/image/upload/' + id;
                document.querySelector('#image_preview').src = imageUrl;
                console.log(imageUrl);
            });
    });
})