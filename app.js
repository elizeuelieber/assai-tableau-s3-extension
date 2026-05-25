tableau.extensions.initializeAsync().then(() => {

    const dashboard = tableau.extensions.dashboardContent.dashboard;

    const sheet = dashboard.worksheets[0];

    sheet.getSummaryDataAsync().then(data => {

        montarMapa(data);
    });
});

function montarMapa(data) {

    // Dimensão da imagem (IMPORTANTE)
    const width = 1000;
    const height = 600;

    // Criar mapa
    const map = L.map('map', {
        crs: L.CRS.Simple, // isso permite usar imagem
        minZoom: -2
    });

    const bounds = [[0,0], [height, width]];

    // 👇 SUA IMAGEM (S3)
    const imageUrl = "https://meu-bucket.s3.amazonaws.com/mapa.jpg";

    L.imageOverlay(imageUrl, bounds).addTo(map);

    map.fitBounds(bounds);

    // Adicionar pontos do Tableau
    data.data.forEach(row => {

        const x = row[0].value;
        const y = row[1].value;
        const nome = row[2].value;

        L.circleMarker([y, x], {
            radius: 6,
            color: 'red'
        })
        .addTo(map)
        .bindPopup(nome);
    });
}