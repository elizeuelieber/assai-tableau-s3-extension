tableau.extensions.initializeAsync().then(() => {

    const dashboard = tableau.extensions.dashboardContent.dashboard;
    const sheet = dashboard.worksheets[0];

    sheet.addEventListener(tableau.TableauEventType.MarkSelectionChanged, () => {
        carregarImagem(sheet);
    });

    carregarImagem(sheet);
});

function carregarImagem(sheet) {

    sheet.getSelectedMarksAsync().then(marks => {

        if (!marks.data || marks.data.length === 0) {
            console.log("Nada selecionado");
            return;
        }

        const imageUrl = marks.data[0][0].value;

        document.getElementById("image").src = imageUrl;
    });
}
