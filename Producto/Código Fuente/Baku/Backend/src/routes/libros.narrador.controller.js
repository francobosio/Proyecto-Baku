import PdfParse from "pdf-parse";

export const getLibroNarrador = async (req, res) => {
    
    console.log("Empieza narrador!!")

    //DESCARGA DEL LIBRO
    const url2 = req.params.archivoTexto;

    const array = []

    function render_page(pageData) {
        let render_options = {
            //replaces all occurrences of whitespace with standard spaces (0x20). The default value is `false`.
            normalizeWhitespace: false,
            //do not attempt to combine same line TextItem's. The default value is `false`.
            disableCombineTextItems: false,
        }
      
        //console.log(pageData.pageNumber)
      
        return pageData.getTextContent(render_options)
        .then(function(textContent) {
            let lastY, text = '';
            for (let item of textContent.items) {
                if (lastY == item.transform[5] || !lastY){
                    text += item.str;
                }  
                else{
                    text += '\n' + item.str;
                }    
                lastY = item.transform[5];
            }
            array.push(text)
            return text;
        })
    }
      
    let options = {
        pagerender: render_page,
    }

    //Me parece que con libroFound.archivoTexto nos ahorramos este paso...
    const pdfFile = url2;

    PdfParse(pdfFile, options).then(function (data) {
        let dataText = data.text;
        //Separo en palabras el texto del pdf
        let arrayData = data.text.split(/\t|\n|\s/);

        let arrayText = arrayData.join(' ')

        const arrayLimpio = []
        array.forEach(function (elemento, indice, array) {
            
            //Separo en palabras el texto del pdf
            let arrayData = elemento.split(/\t|\n|\s/);

            let arrayText = arrayData.join(' ')
            arrayLimpio.push(arrayText);
        });

        return res.json({
            dataText,
            arrayData,
            arrayText,
            array,
            arrayLimpio
        })

    });
}
