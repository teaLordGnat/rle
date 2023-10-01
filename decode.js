// Декодирование файла, сжатого при помощи алгоритма RLE

let fs = require('fs')

// Считываем файл
fs.readFile(process.argv[2], (error, data) => {

    // Обработка ошибки
    if (error) {
        console.error('Decoding failed: ' + error);
        return;
    }

    // Получаем строку с данными
    data = data.toString()
    result = ''
    // считываем символы поочередно из исходной строки
    for (i = 0; i < data.length;) {
        let ch = data[i]
        // Если символ #, то значит, что мы обнаружили закодированную строку
        if (ch == '#') {
            // Разкодировываем строку
            result += data[i + 2].repeat(data[i + 1].charCodeAt(0))
            i += 3
        }
        // В ином случае просто добавляем полученный символ к результату
        else {
            result += ch
            i += 1
        }
    }

    // Записываем результат в файл
    fs.writeFile(process.argv[3], result, (error) => {
        if (error) {
            console.error('What??? We got some error: ' + error)
        }
    })
})
