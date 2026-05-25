tableau.extensions.initializeAsync().then(() => {

    const dashboard = tableau.extensions.dashboardContent.dashboard;
    const sheet = dashboard.worksheets[0];

    // carrega na inicialização
    carregarImagem(sheet);

    // recarrega quando mudar filtro
    sheet.addEventListener(tableau.TableauEventType.FilterChanged, () => {
        carregarImagem(sheet);
    });
});

function carregarImagem(sheet) {

    sheet.getSummaryDataAsync().then(data => {

        if (data.data.length === 0) return;

        // pega primeira linha (ajuste conforme necessário)
        const imageName = data.data[0][0].value;

        // monta URL do S3
        const url = `https://meu-bucket.s3.amazonaws.com/imagens/${imageName}`;

        document.getElementById("image").src = url;
    });
}