import { Viewer } from '@photo-sphere-viewer/core';

let viewer = new Viewer({
    container: document.querySelector('#viewer'),
    panorama: 'Assets/Images/R0010143.jpg',
    caption: 'Capo Noli <b>&copy; Alberto Arri</b>',
    defaultPitch: -0.3,
    defaultYaw: 2.5,
    defaultZoomLvl: 50,
    fisheye: true,
    minFov: 30,
    maxFov: 150,
    navbar:[
        'zoom',
        'caption',
        {
            id: 'button_modal',
            content: `Upload 
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-upload" viewBox="0 0 16 16">
                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
                    <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z"/>
                </svg>`,
            title: 'Modal toggler',
            className: 'custom-button',
            onClick: (viewer) => {
                $('#exampleModal').modal('show')
            },   
        },
        'fullscreen',
    ],
});

function createViewer(imageSrc){
    if (viewer) {
        viewer.destroy();
    }

    viewer = new Viewer({
        container: document.querySelector('#viewer'),
        panorama: imageSrc,
        defaultZoomLvl: 50,
        fisheye: true,
        caption: '',
        minFov: 30,
        maxFov: 150,
        navbar:[
            'zoom',
            {
                content: `Screenshot 
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-camera2" viewBox="0 0 16 16">
                        <path d="M5 8c0-1.657 2.343-3 4-3V4a4 4 0 0 0-4 4"/>
                        <path d="M12.318 3h2.015C15.253 3 16 3.746 16 4.667v6.666c0 .92-.746 1.667-1.667 1.667h-2.015A5.97 5.97 0 0 1 9 14a5.97 5.97 0 0 1-3.318-1H1.667C.747 13 0 12.254 0 11.333V4.667C0 3.747.746 3 1.667 3H2a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1h.682A5.97 5.97 0 0 1 9 2c1.227 0 2.367.368 3.318 1M2 4.5a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0M14 8A5 5 0 1 0 4 8a5 5 0 0 0 10 0"/>
                    </svg>`,
                onClick(viewer) {
                    viewer.addEventListener('render', () => {
                        const link = document.createElement('a');
                        link.download = 'screenshot.png';
                        link.href = viewer.renderer.renderer.domElement.toDataURL();
                        link.click();
                    }, { once: true });
                    viewer.needsUpdate();
                },
            },
            'caption',
            {
                id: 'button_modal',
                content: `Upload 
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-upload" viewBox="0 0 16 16">
                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
                        <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z"/>
                    </svg>`,
                title: 'Modal toggler',
                className: 'custom-button',
                onClick: (viewer) => {
                    $('#exampleModal').modal('show')
                },   
            },
            'fullscreen',
        ],
    });
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('fileInput').addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file && file.type === 'image/jpeg') {
            const fileURL = URL.createObjectURL(file);
            createViewer(fileURL);
            $('#exampleModal').modal('hide')
        }
    });
});