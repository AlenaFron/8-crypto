/**
 * Шифратор: переворачивает строку и меняет местами первый и последний символы
 */
function crypto(password) {
    if (!password) return '';
    
    // Превращаем строку в массив символов
    let chars = password.split('');
    
    // Алгоритм 1: Разворачиваем массив
    chars.reverse();
    
    // Алгоритм 2: Меняем местами первый и последний элементы
    if (chars.length > 1) {
        let first = chars[0];
        chars[0] = chars[chars.length - 1];
        chars[chars.length - 1] = first;
    }
    
    // Возвращаем строку
    return chars.join('');
}

/**
 * Проверка: дешифрует пароль, выполняя действия в обратном порядке, и сравнивает
 */
function check(encryptedPassword, originalPassword) {
    if (!encryptedPassword || !originalPassword) return false;
    
    let chars = encryptedPassword.split('');
    
    // Обратный алгоритм 2: Снова меняем первый и последний (действие зеркально само себе)
    if (chars.length > 1) {
        let first = chars[0];
        chars[0] = chars[chars.length - 1];
        chars[chars.length - 1] = first;
    }
    
    // Обратный алгоритм 1: Снова разворачиваем (reverse также зеркален)
    chars.reverse();
    
    const decrypted = chars.join('');
    
    // Сравниваем результат с оригиналом
    return decrypted === originalPassword;
}

// Тесты
const encrypted = crypto('password');
console.log('Зашифрованный:', encrypted); // "drowssap" -> "prowssad" (зависит от логики)
console.log('Проверка (верно):', check(encrypted, 'password')); // true
console.log('Проверка (ошибка):', check(encrypted, 'wrong'));    // false