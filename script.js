// Кодирование при помощи алгоритма сжатия данных RLE

let fs = require('fs')

// Читаем файл для сжатия
fs.readFile(process.argv[2], (error, data) => {

    // Обработка ошибки
    if (error) {
        console.error(error)
        return
    }

    // Получаем строку с данными
    data = data.toString()
    result = ''
    // Считываем посимвольно полученную строку
    for (i = 0, n = 1; i < data.length;) {
        let ch = data[i]
        // Считаем кол-во повторяющихся символов подряд
        while (ch == data[i + n]) n++

        // Проверяем, есть ли смысл кодировать данную подстроку
        if (n >= 4 || ch == '#') {
            // Разделяем подстроку в длину максимум по 255 символов
            for (let cursor = n; cursor > 0; cursor -= 255) {
                result += '#' + String.fromCharCode(Math.min(cursor, 255)) + ch
            }
        }
        // В ином же случае просто сохраняем исходный вариант
        else result += ch.repeat(n)

        i += n
        n = 1
    }

    // Записываем сжатую информацию в файл из командной строки
    fs.writeFile(process.argv[3], result, (error) => {
        if (error) console.error("What??? We got some error: " + error)
    })
})
